import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './api'

type CartProduct = Pick<Product, 'id' | 'name' | 'slug' | 'priceCents' | 'stock' | 'productType'>
type CartItem = CartProduct & { quantity: number }

type CartStore = {
  items: CartItem[]
  add: (product: CartProduct) => void
  decrement: (productId: number) => void
  remove: (productId: number) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      add: (product) => set((state) => {
        const current = state.items.find((item) => item.id === product.id)
        if (current) {
          return {
            items: state.items.map((item) => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item),
          }
        }
        return {
          items: [...state.items, { id: product.id, name: product.name, slug: product.slug, priceCents: product.priceCents, stock: product.stock, productType: product.productType, quantity: 1 }],
        }
      }),
      decrement: (productId) => set((state) => ({
        items: state.items.flatMap((item) => item.id !== productId ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []),
      })),
      remove: (productId) => set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
    }),
    { name: 'triade-arte-cart' }
  )
)

export function cartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.priceCents * item.quantity, 0)
}

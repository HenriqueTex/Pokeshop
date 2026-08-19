import { Navigate, Route, Routes } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { CatalogPage } from './pages/CatalogPage'
import { CollectionPage } from './pages/CollectionPage'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import { SplashPage } from './pages/SplashPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/catalogo" element={<CatalogPage />} />
      <Route path="/colecoes/:slug" element={<CollectionPage />} />
      <Route path="/produtos/:slug" element={<ProductPage />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

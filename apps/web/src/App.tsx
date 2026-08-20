import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ShopHeader } from './components/ShopHeader'
import { ShopFooter } from './components/ShopFooter'
import { CartPage } from './pages/CartPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminPage } from './pages/AdminPage'
import { CatalogPage } from './pages/CatalogPage'
import { CollectionPage } from './pages/CollectionPage'
import { CollectionsPage } from './pages/CollectionsPage'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import { SplashPage } from './pages/SplashPage'

function StorefrontLayout() {
  return (
    <div className="storefront-shell">
      <ShopHeader />
      <Outlet />
      <ShopFooter />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route element={<StorefrontLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/colecoes" element={<CollectionsPage />} />
        <Route path="/colecoes/:slug" element={<CollectionPage />} />
        <Route path="/produtos/:slug" element={<ProductPage />} />
        <Route path="/carrinho" element={<CartPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

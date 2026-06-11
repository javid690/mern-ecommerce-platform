import React from 'react'
import ProductPage from './pages/ProductPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CheckoutPage from './pages/CheckoutPage'
import ProtectedRoute from './components/ProtectedRoute'
import MyOrdersPage from './pages/MyOrdersPage'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProductPage />} path='/' />
        <Route element={<CartPage />} path='/pages/cartpage' />
        <Route element={<LoginPage />} path='/pages/loginpage' />
        <Route element={<RegisterPage />} path='/pages/registerpage' />
        <Route element={<MyOrdersPage />} path='/pages/myorders' />
        <Route
          path="/pages/checkoutpage"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
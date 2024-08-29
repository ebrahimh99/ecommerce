
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import './App.css'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Categories from './components/Categories/Categories'
import Brand from './components/Brand/Brand'
import Layout from './components/Layout/Layout'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/authContext'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Cart from './components/Cart/Cart'
import Home from './components/Home/Home'
import WishList from './components/WishList/WishList'
import CartContextProvider from './Context/CartContext'
import WishlistContextProvider from './Context/wishlistContext'

import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import Forget from './components/Forget/Forget'
import ResetCode from './components/ResetCode/ResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'





function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "/brand", element: <ProtectedRoute><Brand /></ProtectedRoute> },
        { path: "/categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "/productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "/wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "/payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "/allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },







        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/forget", element: <Forget /> },
        { path: "/resetcode", element: <ResetCode /> },
        { path: "/resetpassword", element: <ResetPassword /> },


        { path: "*", element: <NotFoundPage /> },



      ]
    }
  ])

  const x = new QueryClient()
  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <Toaster />
            <RouterProvider router={myRouter} />
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>





  )
}

export default App




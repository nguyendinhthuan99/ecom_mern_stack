import './App.css'
import React from 'react'
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom'

import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Success from './pages/Success'
import Register from './pages/Register'
import ProductList from './pages/ProductList'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector(state => state.user.currentUser)

  return (
    <Router>
      <Routes>
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products' element={<ProductList />}>
          <Route path=':category' element={<ProductList />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
        <Route path='/login' element={
          user ? <Navigate replace to='/' /> : <Login />
        } />
        <Route path='/register' element={
          user ? <Navigate replace to='/' /> : <Register />
        } />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

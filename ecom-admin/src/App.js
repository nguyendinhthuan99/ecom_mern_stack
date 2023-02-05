import "./App.css"
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom"

import Home from "./pages/home/Home"
import User from "./pages/user/User"
import Login from "./pages/login/Login"
import Product from "./pages/product/Product"
import NewUser from "./pages/newUser/NewUser"
import Topbar from "./components/topbar/Topbar"
import UserList from "./pages/userList/UserList"
import Sidebar from "./components/sidebar/Sidebar"
import NewProduct from "./pages/newProduct/NewProduct"
import ProductList from "./pages/productList/ProductList"

function App() {
  const isAdmin = localStorage.getItem('persist:root') ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)?.currentUser?.accessToken : false
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          { isAdmin &&
            (<>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
              </div>
            </>)
          }
        </Switch>
    </Router>
  )
}

export default App

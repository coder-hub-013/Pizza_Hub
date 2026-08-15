import {ToastContainer} from 'react-toastify'
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import PublicRoute from './components/layouts/PublicRoute';
import HomePage from './components/pages/user_page/home_page/HomePage';
import Register from './components/pages/auth_page/Register';
import Login from './components/pages/auth_page/Login';
import ProtectedRoute from './components/layouts/ProtectedRoute';
import Checkout from './components/pages/user_page/checkoutPage/Checkout';
import UserOrders from './components/pages/user_page/order/UserOrders';
import UserOrderDetails from './components/pages/user_page/order/UserOrderDetails';
import ForgotPassword from './components/pages/auth_page/ForgotPassword';
import ResetPassword from './components/pages/auth_page/ResetPassword';
import EmailVerified from './components/pages/auth_page/EmailVerified';
import Menu from './components/pages/user_page/menu/Menu';
import PizzaDetails from './components/pages/user_page/pizzaDetails/PizzaDetails';
import CustomPizza from './components/pages/user_page/custom_pizza_page/CustomPizza';
import MainCustomPizzaPage from './components/pages/user_page/custom_pizza_page/MainCustomPizzaPage';
import Cart from './components/pages/user_page/cart/Cart';
import AdminRoute from './components/layouts/AdminRoute';
import ManageInventory from './components/pages/admin_page/manageInventory/ManageInventory';
import ManagePizza from './components/pages/admin_page/managePizza/ManagePizza';
import AddPizza from './components/pages/admin_page/addPizza/AddPizza';
import AddInventory from './components/pages/admin_page/addInventory/AddInventory';
import AdminOrderProvider from './components/context/adminOrderContext/AdminOrderProvider';
import Dashboard from './components/pages/admin_page/dashboard/Dashboard';
import Orders from './components/pages/admin_page/order/Orders';
import OrderDetails from './components/pages/admin_page/order/OrderDetails';


function App() {
    return (
        <>
          <div>

              <ToastContainer 

                    position="top-center"
                    autoClose={3000}
                    theme="colored"
                    newestOnTop={true}
                    pauseOnHover={false}
                    closeButton={false}
                    rtl={false}
                    limit={3}
              />

                <Router>
                    <Routes>
                        <Route element={<PublicRoute />}>
                      
                            <Route path='/' element={<HomePage />}></Route>
                            <Route path='/register' element={<Register />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                            <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
                            <Route path="/email-verified" element={<EmailVerified />}></Route>

                            <Route path="/menu" element={<Menu />}></Route>
                            <Route path="/pizza/:id" element={<PizzaDetails />}></Route>
                            <Route path="/custom-pizza" element={<CustomPizza />}></Route>
                            <Route path="/start-building" element={<MainCustomPizzaPage />}></Route>
                            <Route path="/cart" element={<Cart />}></Route>

                            <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
                                <Route path="/checkout" element={<Checkout />}></Route>
                                <Route path="/my-orders" element={<UserOrders />}></Route>
                                <Route path="/my-orders/:id" element={<UserOrderDetails />}></Route>
                            </Route>
                      </Route>


                      

                        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                            <Route element={<AdminRoute />}>
                                <Route path="/admin/inventory" element={<ManageInventory />}></Route>
                                <Route path="/admin/inventory/pizza" element={<ManagePizza />}></Route>
                                <Route path="/admin/pizza/add" element={<AddPizza />}></Route>
                                <Route path="admin/inventory/add" element={<AddInventory />}></Route>

                                <Route element={<AdminOrderProvider><Outlet /></AdminOrderProvider>}>
                                    <Route path="/admin/dashboard" element={<Dashboard />}></Route>
                                    <Route path="/admin/orders" element={<Orders />}></Route>
                                    <Route path="/admin/orders/:id" element={<OrderDetails />}></Route>
                                </Route>

                            </Route>
                        </Route>

                    </Routes>
                </Router>

          </div>
        </>
    )
}
export default App;
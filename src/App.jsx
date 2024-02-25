/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import { useEffect } from "react"
import { Suspense, lazy } from "react"
import { Route, Routes, useLocation, Outlet, Navigate } from "react-router-dom"

import Logo from "./assets/logo.png"
import { Freeze } from "./components";
import { Footer, MobileSideBar } from "./layouts"
import { getUserDetails } from "./redux/slices/authSlice";
import { useSelector } from "react-redux";

import "react-loading-skeleton/dist/skeleton.css";
import "./styles/global.css";
import "./styles/utils.css";
import "./styles/main.css";
import "./styles/components.css";
import "./styles/reset.css";
import "./styles/layout.css";
import "./styles/forms.css";
import "./styles/pages/home.css";
import "./styles/pages/cart.css";
import "./styles/pages/orders.css";
import "./styles/pages/profile.css";

const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Product/Product"));
const Login = lazy(() => import("./pages/Login/Login"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Address = lazy(() => import("./pages/Profile/Address"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Register = lazy(() => import("./pages/Register/Register"));
const Search = lazy(() => import("./pages/Search/Search"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const AddressForm = lazy(() => import("./pages/Profile/AddressForm"));
const CheckOut = lazy(() => import("./pages/CheckOut/CheckOut"))
const VourchersPage = lazy(() => import("./pages/Profile/Vourchers"))



function App() {
  const mobileSideOpen = useSelector((state) => state.appUi.MobileSideOpen)

  const toggleSideBar = () => {

  }

  const childern = <div>
    <div>
      <img src={Logo} alt=""
        style={{ width: "200px" }} />
    </div>
  </div>

  const isAuthenticated = getUserDetails()[1]

  return (
    <Suspense fallback={<Freeze children={childern} />}>
      <main id="app-container" onClick={toggleSideBar}>

        <MobileSideBar active={mobileSideOpen} />

        <ScrollToTop />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<p>Path not resolved</p>} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<CheckOut />} />

            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/address" element={<Address />} />
              <Route path="/profile/address/form/:action" element={<AddressForm />} />
              <Route path="/profile/orders" element={<Orders />} />
              <Route path="/profile/vourchers" element={<VourchersPage />} />
            </Route>

          </Routes>
        </div>
        <Footer />
      </main>
    </Suspense>

  )
}

export default App


function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}



function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to={"/"} />
  return <Outlet />
}
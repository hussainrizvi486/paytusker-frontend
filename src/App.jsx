/* eslint-disable react/no-children-prop */
import { useEffect } from "react"
import { Suspense, lazy } from "react"
import { Route, Routes, useLocation, Outlet, Navigate } from "react-router-dom"

import Logo from "./assets/logo.png"
import { Freeze } from "./components";
import { Footer, MobileSideBar } from "./layouts"
import { useDispatch, useSelector } from "react-redux";

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

import { useGetCartDetailsQuery } from "./api";
import { closeMobileSideBar } from "./redux/slices/appUiSlice";
import { updateCart } from "./redux/slices/cartSlice";

const Home = lazy(() => import("./pages/Home/Home"));
const Product = lazy(() => import("./pages/Product/Product"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Address = lazy(() => import("./pages/Profile/Address"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const AddressForm = lazy(() => import("./pages/Profile/AddressForm"));
const Register = lazy(() => import("./pages/Register/Register"));
const Search = lazy(() => import("./pages/Search/Search"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const CheckOut = lazy(() => import("./pages/CheckOut/CheckOut"))
const VourchersPage = lazy(() => import("./pages/Profile/Vourchers"))
const ReviewsPage = lazy(() => import("./pages/Profile/Reviews"))
const PrivacyPolicyPage = lazy(() => import("./pages/CustomerSupport/PrivacyPolicy"))
const FAQsPage = lazy(() => import("./pages/CustomerSupport/FAQsPage"))


function App() {
  const dispatch = useDispatch();
  const mobileSideOpen = useSelector((state) => state.appUi.MobileSideOpen);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartData = useGetCartDetailsQuery();


  useEffect(() => { }, [isAuthenticated])
  useEffect(() => { if (cartData.data) { dispatch(updateCart(cartData.data)) } }, [cartData.data, dispatch])

  const LoadingChildren = () => {
    return (<div>
      <div>
        <img src={Logo} alt=""
          style={{ width: "200px" }} />
      </div>
    </div>)
  }

  return (
    <Suspense fallback={<Freeze children={<LoadingChildren />} />}>
      <main id="app-container" >
        <MobileSideBar active={mobileSideOpen} />
        <ScrollToTop />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="*" element={<p>Path not resolved</p>} />

            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/address" element={<Address />} />
              <Route path="/profile/address/form/:action" element={<AddressForm />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/profile/orders" element={<Orders />} />
              <Route path="/profile/vourchers" element={<VourchersPage />} />
              <Route path="/profile/reviews/:action" element={<ReviewsPage />} />
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
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => { dispatch(closeMobileSideBar()); window.scrollTo(0, 0) }, [pathname, dispatch])
  return null
}



function ProtectedRoute({ isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to={"/login"} />
  return <Outlet />
}
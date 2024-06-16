import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Freeze } from "./components";
import { Footer, Header, MobileSideBar } from "./layouts";
import Logo from "./assets/logo.png";

import "react-loading-skeleton/dist/skeleton.css";
import "./styles/main.css";
// import "./styles/global.css";
// import "./styles/components.css";
// import "./styles/layout.css";
// import "./styles/forms.css";
// import "./styles/pages/home.css";
// import "./styles/pages/cart.css";
// import "./styles/pages/orders.css";
// import "./styles/pages/profile.css";
// import "./styles/utils.css";

import { useGetCartDetailsQuery } from "./api";
import { closeMobileSideBar } from "./redux/slices/appUiSlice";
import { updateCart } from "./redux/slices/cartSlice";
import { LogOut } from "./redux/slices/authSlice";

const Home = lazy(() => import("./pages/home/Home"));
const Product = lazy(() => import("./pages/product/Product"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Address = lazy(() => import("./pages/profile/Address"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const AddressForm = lazy(() => import("./pages/profile/AddressForm"));
const Register = lazy(() => import("./pages/auth/Register"));
const Search = lazy(() => import("./pages/search/Search"));
const OrdersListPage = lazy(() => import("./pages/orders/Orders"));
const OrdersDetailPage = lazy(() => import("./pages/orders/Details"));
const VourchersPage = lazy(() => import("./pages/profile/Vourchers"));
const ReviewsPage = lazy(() => import("./pages/profile/Reviews"));
const FAQsPage = lazy(() => import("./pages/CustomerSupport/FAQsPage"));
const SellerOrdersListingPage = lazy(() => import("./pages/seller/orders/ListOrders"));


const SellerProductUploadPage = lazy(() => import("./pages/seller/products/UploadProduct"))


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
    <Suspense fallback={<><Freeze><LoadingChildren /></Freeze></>}>
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
            {/* <Route path="/privacy" element={<PrivacyPolicyPage />} /> */}
            <Route path="/faqs" element={<FAQsPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/logout" element={<LogOutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<p>Path not resolved</p>} />

            <Route path="/seller/product/upload" element={<SellerProductUploadPage />} />
            <Route path="/seller/order/list" element={<SellerOrdersListingPage />} />

            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/address" element={<Address />} />
              <Route path="/profile/address/form/:action" element={<AddressForm />} />
              <Route path="/profile/orders/:status" element={<OrdersListPage />} />
              <Route path="/profile/orders/details/:id" element={<OrdersDetailPage />} />
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

function LogOutPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LogOut())
    window.location.href = "/"
  }, [dispatch])
  return <></>
}


let CachedPrivacyPolicy = null
export const PrivacyPolicy = () => {
  const [data, setData] = useState(CachedPrivacyPolicy)
  const getPrivacyPolicy = async () => {
    const req = await axios.get("https://crm.paytusker.us/api/method/paytusker.apis.get_privacy_policy")
    if (req.status === 200 && req.data) {
      setData(req.data.privacy_policy)
      CachedPrivacyPolicy = req.data.privacy_policy;
    }
  }
  useEffect(() => { if (!CachedPrivacyPolicy) { getPrivacyPolicy() } }, [])
  return (
    <>
      <Header />
      <main dangerouslySetInnerHTML={{ __html: data || "" }}></main>
    </>
  )
}


export const AboutUs = () => {
  return <>
    <Header />
    <br />
    <br />
    <main>
      <div className="ql-editor read-mode">
        <div>
          <h1 className="text-lg">About Us</h1>
          <br />
        </div>
        <p><span style={{ fontSize: '14px', }}>Paytusker LLC is the owner of the online marketplace known as “Paytusker.com”. Paytusker is an online platform for owners to sell their products online to a worldwide audience. Sellers can sell digital products and their intellectual property.</span></p>
        <p><br /></p>
        <p><br /></p>
        <p><span style={{ fontSize: '14px', }}>Paytusker is available on both standard desktop and mobile web browsers.</span></p>
        <p><span style={{ fontSize: '14px', }}>Paytusker is committed to the good user experience of our community, and will address any reports of product compliance and safety concerns. All vendors on the Paytusker marketplace are obligated to follow all applicable laws and regulations, as well as adhere to Paytusker’s Merchant Policies.</span></p>
        <p><br /></p>
        <p><br /></p>
        <p><span style={{ fontSize: '14px', }}>Paytusker is not the manufacturer, intellectual property owner, seller, distributor, or importer of 3rd-party vendor products traded on Paytusker.com. Vendors on Paytusker are independently responsible for the conformity and safety of their products, as well as their regulatory compliance.</span></p>
        <p><br /></p>
        <p><span style={{ fontSize: '14px', }}>Contact us</span></p>
        <p><br /></p>
        <p><span style={{ fontSize: '14px', }}>Call us 24/7</span></p>
        <p><br /></p>
        <p><span style={{ fontSize: '14px', }}>+1(720) 9659214</span></p>
        <p><span style={{ fontSize: '14px', }}>Paytusker LLC P.O Box 102442 Denver, Co 80250</span></p>
        <p><a href="mailto:sales@paytusker.com" rel="noopener noreferrer" style={{ fontSize: '14px', }}>sales@paytusker.com</a></p>
      </div>


    </main>
  </>
}
import { useEffect, useRef, useState } from "react"
import { Menu, Search, ShoppingCart, User2 } from "lucide-react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { getUserDetails } from "../../redux/slices/authSlice"
import { ToggleMobileSideBar } from "../../redux/slices/appUiSlice"
import { useDispatch } from "react-redux"
import { API_URL } from "../../redux/store"
import axios from "axios"
import { useSelector } from "react-redux"
import { UpdateQuery, UpdateSearchProducts } from "../../redux/slices/searchProducts"
import toast from "react-hot-toast"
import { DropDown } from "../../components/Common/DropDown"


export const Header = () => {
    const isAuthenticated = getUserDetails()[1];
    const dispatch = useDispatch();
    const cartReduxState = useSelector((state) => state.cart.total_qty);
    const [cartCount, setCartCount] = useState(cartReduxState || 466);
    const ProfileDropDownOptions = [
        { "label": "My Profile", "url": "/profile" },
        { "label": "Logut", "url": "/logout" }

    ]

    useEffect(() => { setCartCount(cartReduxState) }, [cartReduxState])

    function ToggleSideBar() { dispatch(ToggleMobileSideBar()) }

    const searchProduct = async (query) => {
        dispatch(UpdateQuery(query));
        try {
            const req = await axios.get(`${API_URL}api/product/search`, {
                params: {
                    query: query
                }
            });
            if (req.status === 200) {
                const res = req.data?.results?.products;
                console.log()
                if (res && res?.length > 0) {
                    dispatch(UpdateSearchProducts({ products: res }));
                }
            }
        } catch (error) {
            toast.error("Error occurred while searching products.")
            console.error("Error occurred while searching products:", error);
        }
    };



    return (
        <header className="page-header header-main__nav">
            <div className="header-left__section">
                <div className="header-left__mobile-menu" onClick={() => ToggleSideBar()}>
                    <Menu strokeWidth={2.5} />
                </div>
                <div className="header-logo">
                    <Link to={"/"}>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
            </div>

            <div className="header-center__section">
                <div className="search-box__wrapper">
                    <HeaderSearchBox handleSearch={searchProduct} />
                </div>
            </div>

            <div className="header-right__section">
                <nav className="header-nav">
                    <Link className="header-nav__link nav-cart__link" to={"/cart"}>
                        {cartCount > 0 ? <span className="count">{cartCount}</span> : <></>}
                        <ShoppingCart />
                    </Link>
                    {isAuthenticated ?
                        <DropDown options={ProfileDropDownOptions}>
                            <span className="header-nav__link">
                                <User2 />
                            </span>
                        </DropDown>
                        :
                        <Link className="header-nav__link" to={"/login"}>
                            <User2 />
                        </Link>
                    }
                </nav>
            </div>
        </header >
    )
}


const HeaderSearchBox = ({ placeholder = "Type somthing here.", handleSearch = () => { } }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(window.location.search)
    let setSearchParams = useSearchParams()[1];
    const searchInpRef = useRef()

    const search = (e) => {
        e.preventDefault()
        const query = searchInpRef.current.value


        handleSearch(query)

        if (location.pathname != "/search") {
            navigate(`/search?query=${query}`)
        }
        else {
            setSearchParams((params) => {
                params.set("query", query)
                return params
            })
        }
    }
    return (
        <form className="header-search-box" onSubmit={(e) => search(e)}>
            <div className="search-box__input">
                <input type="text" placeholder={placeholder}
                    ref={searchInpRef}
                    defaultValue={params.get("query") || ""}
                />
                <button >
                    <Search />
                </button>
            </div>

            {/* <div className="search-results__container">
                <ul className="search-results__list">
                    <li>Lorem ipsum dolor sit.</li>
                    <li>Lorem ipsum Lorem, ipsum.</li>
                    <li>Lorem ipsum dolor sit. Lorem ipsum dolor sit.</li>
                    <li>Lorem ipsum </li>
                    <li>Lorem ipsum Lorem, ipsum.</li>
                    <li>Lorem ipsum dolor sit. Lorem ipsum dolor sit.</li>
                </ul>
            </div> */}
        </form>
    )
}
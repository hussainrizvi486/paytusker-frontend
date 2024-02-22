/* eslint-disable react/prop-types */
import { useRef } from "react"
import { AlignJustify, Search, ShoppingCart, User2 } from "lucide-react"
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { getUserDetails } from "../../redux/slices/authSlice"
import { ToggleMobileSideBar } from "../../redux/slices/appUislice"
import { useDispatch } from "react-redux"
import { API_URL } from "../../redux/store"
import axios from "axios"


export const Header = () => {
    
    const searchProduct = (query) => {
        axios.get(`${API_URL}api/product/search?`, {
            params: {
                "query": query
            }
        },)
    }


    const isAuthenticated = getUserDetails()[1]
    const dispatch = useDispatch()

    function ToggleSideBar() { dispatch(ToggleMobileSideBar()) }

    return (
        <header className="page-header header-main__nav">
            <div className="header-left__section">
                <div className="header-left__mobile-menu"
                    onClick={() => ToggleSideBar()}
                >
                    <AlignJustify
                    />

                </div>
                <div className="header-logo">
                    <Link to={"/"}>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
            </div>

            <div className="header-center__section">
                <div className="search-box__wrapper">
                    <HeaderSearchBox />

                </div>
            </div>

            <div className="header-right__section">
                <nav className="header-nav">

                    <Link className="header-nav__link" to={"/cart"}>
                        <ShoppingCart />
                    </Link>


                    {isAuthenticated ?
                        <Link className="header-nav__link" to={"/profile"}>
                            <User2 />
                        </Link> :
                        <Link className="header-nav__link" to={"/login"}>
                            <User2 />
                        </Link>
                    }


                </nav>
            </div>
        </header>
    )
}


const HeaderSearchBox = ({ placeholder = "Type somthing here." }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(window.location.search)
    let setSearchParams = useSearchParams()[1];
    const searchInpRef = useRef()

    const search = (e) => {
        e.preventDefault()
        const query = searchInpRef.current.value

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
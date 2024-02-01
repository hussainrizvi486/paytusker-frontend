import { useEffect, useRef, useState } from "react"
import { Freeze, } from "../../components"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useLoginUserMutation } from "../../features/api/api"
import toast from "react-hot-toast"
import { jwtDecode } from "jwt-decode"
import { Header } from "../../layouts"

const Login = () => {
    const userNameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const [FormMsg, setFormMsg] = useState({ message: "", type: "" })
    const [pageLoading, setPageLoading] = useState(false)
    const [UseLoginUser, { isError, isSuccess, isLoading, error }] = useLoginUserMutation()
    const dispatch = useDispatch();


    useEffect(() => {
        setPageLoading(isLoading)
        if (isSuccess) {
            setFormMsg({ message: "Login Success", "type": "success" })
            toast.success("Login Success")
        }

        if (isError) {
            setFormMsg({ "message": error.data?.detail, "type": "error" })
        }

    }, [isLoading, isSuccess, isError, error])

    const submitForm = async (e) => {
        e.preventDefault()
        const password = passwordRef.current.value
        const email = userNameRef.current.value

        const credentials = {
            "email": email,
            "password": password
        }

        const req = await UseLoginUser(credentials)
        if (req.data) {
            const data = await req.data
            const accessToken = data.access
            const user = jwtDecode(data.access)
            localStorage.setItem("authTokens", JSON.stringify(data))
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({
                type: "LogIn",
                payload: {
                    accessToken: accessToken,
                    user: user
                }
            })
            navigate("/")
        }

    }


    if (pageLoading) return <Freeze />
    return (
        <>
            <Header />
            <div>
                <form className='auth-form' onSubmit={submitForm}>
                    <div className="text-center auth-form__upper-text">
                        <h1>Login</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint. Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    </div>

                    <div className="auth-form__fields-container">

                        <div className="input-box">
                            <div className="input-box__label"></div>

                            <div className="input-box__input">
                                <input type="email" placeholder="Username or Email" ref={userNameRef} className="auth-input" />
                            </div>
                        </div>
                        <div className="input-box">
                            <div className="input-box__label"></div>

                            <div className="input-box__input">
                                <input type="password" placeholder="Password" ref={passwordRef} className="auth-input" />
                            </div>
                        </div>
                    </div>


                    <div className={`auth-form__msg-container auth-msg ${FormMsg?.type || ""}`}>
                        {FormMsg.message}
                    </div>
                    <div>
                        <div className="btn-container">
                            <button type="submit" className="auth-form__submit-btn 
                            btn btn-full btn-primary btn-sm">Login </button>
                        </div>
                        <div className="auth-form__optional-text" >
                            <Link to="/register">

                                Don&apos;t have an account ? Register Here
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Login
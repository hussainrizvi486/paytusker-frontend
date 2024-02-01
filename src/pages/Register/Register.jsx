import { Link } from "react-router-dom"
import { Header } from "../../layouts";
import axios from "axios"
import { API_URL } from "../../redux/store"
import toast from "react-hot-toast"
import { useState } from "react";
import { Freeze } from "../../components"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState(false)
    const submitForm = (e) => {
        e.preventDefault()
        console.log(e.target)
        const data = new FormData(e.target);
        const reqBody = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            username: data.get("username"),
            phone: data.get("phone"),
            email: data.get("email"),
            password: data.get("password"),
        }

        registerUser(reqBody)
    }
    const registerUser = async (payload) => {
        try {
            const req = await axios.post(`${API_URL}/api/register/`, payload)
            if (req.status === 200) {
                toast.success("User Created")
                setFormMsg(() => {
                    return { type: "success", message: "User Created" };
                });
                // navigate("/login")
            }
        } catch (error) {
            let errorMsg = ""
            console.log()
            if (error.message == "Network Error") { errorMsg = "Server is unresponsive." }
            if (error?.response?.data) { errorMsg = error?.response?.data }
            // success
            toast.error(errorMsg)
            setFormMsg(() => {
                return { type: "error", message: errorMsg };
            });

        }
    }
    const [FormMsg, setFormMsg] = useState({ message: "", status: "" })


    if (pageLoading) return <Freeze />
    return (
        <div>
            <Header />
            <div>
                <form className='auth-form register' onSubmit={submitForm}>
                    <div className="text-center auth-form__upper-text">
                        <h1>Register</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint. Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    </div>

                    <div className="auth-form__fields-container">

                        <div className="auth-form-col">
                            <div className="input-box">
                                <div className="input-box__label"></div>
                                <div className="input-box__input">
                                    <input type="text" placeholder="First Name" className="auth-input" required name="first_name" />
                                </div>
                            </div>

                            <div className="input-box">
                                <div className="input-box__label"></div>
                                <div className="input-box__input">
                                    <input type="text" placeholder="Last Name" className="auth-input" required name="last_name" />
                                </div>
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__label"></div>
                            <div className="input-box__input">
                                <input type="text" placeholder="Username" className="auth-input" required name="username" />
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__label"></div>
                            <div className="input-box__input">
                                <input type="text" placeholder="Email" className="auth-input" required name="email" />
                            </div>
                        </div>
                        <div className="input-box">
                            <div className="input-box__label"></div>
                            <div className="input-box__input">
                                <input type="text" placeholder="Phone" className="auth-input" required name="phone" />
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__label"></div>
                            <div className="input-box__input">
                                <input type="text" placeholder="Password" className="auth-input" required name="password" />
                            </div>
                        </div>
                    </div>


                    <div className={`auth-form__msg-container auth-msg ${FormMsg.type}`}>
                        {FormMsg.message}
                    </div>
                    <div>
                        <div className="btn-container">
                            <button type="submit" className="auth-form__submit-btn 
                    btn btn-full btn-primary btn-sm">Register </button>
                        </div>

                        <div className="auth-form__optional-text">
                            Already have an account?
                            <Link to={"/login"}>
                                Login
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register
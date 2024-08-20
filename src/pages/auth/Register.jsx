import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PhoneInput, {} from 'react-phone-input-2';

import { Header } from "../../layouts";
import { Button } from "../../components";
import { API_URL } from "../../redux/store";

import 'react-phone-input-2/lib/style.css'


const Register = () => {
    const navigate = useNavigate();
    const registerFormRef = useRef();
    const [pageLoading, setPageLoading] = useState(false);
    const [FormMsg, setFormMsg] = useState({ message: "", status: "" })

    const registerFormData = {};

    const submitForm = () => {
        const formData = new FormData(registerFormRef.current)
        registerFormRef.current.checkValidity()
        if (registerFormRef.current?.checkValidity()) {
            for (const [entry, value] of formData.entries()) {
                registerFormData[entry] = value;
            }
            registerUser(registerFormData)
        }
        else {
            registerFormRef.current?.reportValidity()
        }

    }

    const registerUser = async (payload) => {
        setPageLoading(true)
        setTimeout(() => {
            setPageLoading(false)

        }, 1000);
        try {
            const req = await axios.post(`${API_URL}api/user/register`, payload)
            if (req.status === 200) {
                toast.success("User Created")
                setFormMsg(() => {
                    return { type: "success", message: "User Created" };
                });
                navigate("/login")
            }
            setPageLoading(false)
        } catch (error) {
            let errorMsg = ""
            if (error.message == "Network Error") { errorMsg = "Server is unresponsive." }
            if (error?.response?.data) { errorMsg = error?.response?.data }
            setPageLoading(false)
            toast.error(errorMsg)
            setFormMsg(() => {
                return { type: "error", message: errorMsg };
            });
        }
    }


    return (
        <div>
            <Header />
            <div>
                <form className='auth-form register' onSubmit={submitForm}
                    ref={registerFormRef}
                >
                    <div className="text-center auth-form__upper-text">
                        <h1>Register</h1>
                        <p>Create your Paytukser Account.</p>
                    </div>

                    <div className="auth-form__fields-container">
                        <div className="auth-form-col">
                            <div className="input-box">
                                <div className="input-box__input">
                                    <input type="text" placeholder="First Name" className="auth-input" required name="first_name"
                                        onChange={(e) => registerFormData[e.target.name] = e.target.value}
                                        defaultValue={registerFormData["first_name"] || ""}
                                    />
                                </div>
                            </div>

                            <div className="input-box">
                                <div className="input-box__input">
                                    <input type="text" placeholder="Last Name" className="auth-input" required name="last_name"
                                        onChange={(e) => registerFormData[e.target.name] = e.target.value}
                                        defaultValue={registerFormData["last_name"] || ""}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__input">
                                <input type="text" placeholder="Username" className="auth-input" required name="username"
                                    onChange={(e) => registerFormData[e.target.name] = e.target.value}
                                    defaultValue={registerFormData["username"] || ""}
                                />
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__input">
                                <input type="email" placeholder="Email" className="auth-input" required name="email"
                                    onChange={(e) => registerFormData[e.target.name] = e.target.value}
                                    defaultValue={registerFormData["email"] || ""}
                                />
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__input">
                                <PhoneInput
                                    country={"us"}
                                    inputProps={{
                                        autoFocus: false, required: "required",
                                        name: "phone"
                                    }}
                                    // disableDropdown={true}
                                />
                            </div>
                        </div>

                        <div className="input-box">
                            <div className="input-box__input">
                                <input type="text" placeholder="Password" className="auth-input" required name="password"
                                    onChange={(e) => registerFormData[e.target.name] = e.target.value}
                                    defaultValue={registerFormData["password"] || ""}
                                />
                            </div>
                        </div>
                    </div>



                    <div className={`auth-form__msg-container auth-msg ${FormMsg.type}`}>
                        {FormMsg.message}
                    </div>

                    <div>
                        <div className="btn-container">
                            <Button
                                label="Register"
                                btnLoading={pageLoading}
                                className="btn btn-full btn-primary btn-sm"
                                onClick={submitForm}
                            />
                        </div>
                        <div className="auth-form__optional-text">
                            <span>Already have an account?</span> <Link to={"/login"}>Login</Link>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Register

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { serializeFormData } from "@utils";
import { useLoginUserMutation } from "@api";
import { Header } from "../../layouts";
import { LogIn } from "../../redux/slices/authSlice";
import { AuthForm } from "./form";
import axios from "axios";
import { API_URL } from "../../redux/store";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
    const URLParams = useSearchParams()[0]
    const [FormMsg, setFormMsg] = useState({ message: "", type: "" });
    const [pageLoading, setPageLoading] = useState(false);
    const [UseLoginUser, LoginUserResponse] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setPageLoading(LoginUserResponse.isLoading);
        if (LoginUserResponse.isSuccess) {
            setFormMsg({ message: "Login Success", type: "success" });
            toast.success("Login Success");
        }

        if (LoginUserResponse.isError) {
            const { message } = LoginUserResponse.error.data;
            setFormMsg({ message: message, type: "error" });
            toast.error(message);
        }
    }, [LoginUserResponse])


    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setPageLoading(true);
        const formData = serializeFormData(e.target);
        try {
            const request = await axios.post(API_URL + "api/user/password/forgot", formData)
            if (request.data && request.status == 200) {
                setFormMsg({ "message": "Password reset details have been sent to your email.", "type": "success" })
                toast.success("Password reset details have been sent to your email.");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
            else {
                toast("Something went wrong please try again later", { icon: "⚠️" });
            }
        } catch (error) {

            const data = error?.response?.data;
            if (typeof data === "object") {
                Object.keys(data).forEach((key) => {
                    toast.error(data[key][0]);
                })
            }
            else {
                toast.error("Internal server error!");
            }

        } finally {
            setPageLoading(false);
        }

    }

    const handleUserLogin = async (e) => {
        e.preventDefault();
        const reqBody = serializeFormData(e.target);
        const request = await UseLoginUser(reqBody);

        if (request.data) {
            const response = await request.data;
            dispatch(LogIn(response));
            URLParams.get("redirect_to") ?
                window.location.href = URLParams.get("redirect_to") :
                window.location.href = "/";
        }
    }
    useEffect(() => {
        setFormMsg({ message: "", type: "" });
    }, [URLParams])
    return (
        <>
            <Header />
            <div>
                {
                    //  Reset password request form 
                    URLParams.get("reset_password_request") ? <>
                        <Helmet >
                            <title>Paytusker Forgot Password</title>
                        </Helmet>

                        <AuthForm
                            title={"Password assistance"}
                            subPara={"Enter the email address associated with your Paytusker account."}
                            buttonLabel={"Continue"}
                            isLoading={pageLoading}
                            handleSubmit={handlePasswordReset}
                            fields={[
                                {
                                    "fieldname": "email",
                                    "label": "Email",
                                    "placeholder": "Enter your email",
                                    "fieldtype": "email",
                                    "hideLabel": true
                                }
                            ]}

                            BottomTag={<div className="auth-form__optional-text" ><Link to="/login">Back to Login</Link></div>}
                            FormMsg={FormMsg}
                        /> </> :
                        <>
                            {/* Login user form  */}
                            <Helmet >
                                <title>Paytusker Login</title>
                            </Helmet>

                            <AuthForm
                                title={"Login"}
                                subPara={"Let’s get into your account."}
                                buttonLabel={"Login"}
                                isLoading={pageLoading}
                                Tag={
                                    <div className="text-sm text-right hover-underline">
                                        <Link to={"/login?reset_password_request=true"}>
                                            Forgot password?
                                        </Link>
                                    </div>
                                }
                                FormMsg={FormMsg}
                                handleSubmit={handleUserLogin}
                                BottomTag={<div className="auth-form__optional-text" >
                                    <Link to="/register">
                                        Don&apos;t have an account ? Register Here
                                    </Link>
                                </div>}
                                fields={[
                                    {
                                        "fieldname": "email",
                                        "label": "Email",
                                        "placeholder": "Enter your email",
                                        "fieldtype": "email",
                                        "hideLabel": true
                                    },
                                    {
                                        "fieldname": "password",
                                        "label": "Password",
                                        "placeholder": "Enter your passowrd",
                                        "fieldtype": "password",
                                        "hideLabel": true
                                    }
                                ]}
                            />
                        </>

                }
            </div>
        </>
    )
}

export default LoginPage
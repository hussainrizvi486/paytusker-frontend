import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "@components";
import { serializeFormData, validatePassword } from "@utils";
import { AuthForm } from "./form";
import { Header } from "../../layouts";
import { API_URL } from "../../redux/store";

const PasswordReset = () => {
    const [pageLoading, setPageLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [formMsg, setFormMsg] = useState({ msg: "", type: "" });
    const URLParams = useSearchParams()[0];
    const token = URLParams.get("token");
    const uid = URLParams.get("uid");

    const handleInvalidToken = () => {
        toast.error("The link to reset your has expired.");
        return navigate("/");
    }


    const validateResetToken = async () => {
        setPageLoading(true);
        const parmas = { token: token, uid: uid }

        try {
            const request = await axios.get(API_URL + "api/token/password-reset/validate", {
                params: parmas
            });
            if (request.status === 200) return true;

            handleInvalidToken();
        } catch (error) {
            handleInvalidToken();
        }
        finally {
            setPageLoading(false);
        }
    }

    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault()
        setFormLoading(true);
        setFormMsg({ "message": "", "type": "" });
        let { new_password: password, confirm_password } = serializeFormData(e.target);

        const validationError = validatePassword(password, confirm_password);
        if (validationError) {
            setFormLoading(false);
            setFormMsg({ "message": validationError, "type": "error" });
            toast.error(validationError);
            return;
        }

        try {
            const request = await axios.post(`${API_URL}api/user/password/reset/validate/${uid}/${token}`, {
                "new_password": password,
            });
            if (request.status === 200) {
                const { data } = request;
                toast.success(data?.message || "Password reset successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (error) {
            console.warn(error);
            const data = error?.response?.data;
            if (typeof data === "object") {
                Object.keys(data).forEach((key) => {
                    toast.error(data[key][0]);
                })
            }
            else {
                toast.error("Internal server error!");
            }

            setFormLoading(false);
        }
        finally {
            setFormLoading(false);
        }
    }

    useEffect(() => {
        if (!token || !uid) {
            return navigate("/")
        }
        validateResetToken();
    }, [])

    return (
        <>
            <Header />
            {pageLoading ? <><LoadingComponent message={"Validating Request..."} /> </> :
                <AuthForm
                    fields={[
                        { fieldname: "new_password", label: "New Password", fieldtype: "text", hideLabel: true, mandatory: true },
                        { fieldname: "confirm_password", label: "Confirm Password", fieldtype: "text", hideLabel: true, mandatory: true },
                    ]}
                    handleSubmit={(e) => handlePasswordReset(e)}
                    subPara={"Your new password must be different to previously used passwords."}
                    title={"Set new password"}
                    FormMsg={formMsg}
                    isLoading={formLoading}
                    buttonLabel={"Update Password"}
                    BottomTag={<Link to="/login">  <div className="text-sm text-center hover-underline mt-4">Back to login</div></Link>}
                />}
        </>
    )
}

export default PasswordReset

const LoadingComponent = ({ message }) => {
    return (
        <div>
            <div className="flex gap-1 w-max mx-auto align-items-center mt-8 p-4 border-rounded-md" style={{ boxShadow: "0 0 10px #bcb7b7" }}>
                <div>
                    <Spinner className="md" />
                </div>
                <div className="">
                    {message || "Loading ...."}
                </div>

            </div>
        </div>
    )
}
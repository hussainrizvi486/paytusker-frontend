import { Button } from "@components";
import { RenderField } from "../../utils/Ui";


export const AuthForm = ({ title, subPara, buttonLabel, fields, Tag, FormMsg, BottomTag, handleSubmit, isLoading }) => {
    console.log(isLoading);
    return (
        <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="text-center auth-form__upper-text">
                <h1>{title}</h1>
                <p>{subPara || ""}</p>
            </div>
            <div className="auth-form__fields-container">
                {fields?.map((field, index) => (
                    <div key={index} className="input-box">
                        <div className="input-box__input">
                            <RenderField field={field} />
                        </div>
                    </div>
                ))}
            </div>
            {Tag}
            <div className={`auth-form__msg-container auth-msg ${FormMsg?.type || ""}`}>
                {FormMsg?.message || ""}
            </div>
            <div className="btn-container">
                <Button
                    className="auth-form__submit-btn  btn btn-full btn-primary btn-sm"
                    btnLoading={isLoading}
                    label={buttonLabel}
                    type="submit"
                />
            </div>
            {BottomTag}
        </form>
    )

}
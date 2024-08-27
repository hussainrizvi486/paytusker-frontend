import { Spinner } from "../Loaders/Spinner";

export const Button = ({ onClick = () => { }, btnLoading = false, className = "", type = "button", label = "Label" }) => {
    return (
        <button
            disabled={Boolean(btnLoading)}
            className={`btn ${className}`}
            onClick={(e) => onClick(e)}
            type={type}
        >
            <div className={`btn-label ${btnLoading ? "hidden" : ""}`}>
                {label}
            </div>
            <div className={`btn-loading__wrapper ${btnLoading ? "loading" : ""}`}>
                <Spinner className="sm" />
            </div>
        </button >
    )
}

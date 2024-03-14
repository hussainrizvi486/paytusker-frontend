import { Spinner } from "../Loaders/Spinner";

export const Button = ({ label, onClick, btnLoading = false, className = "" }) => {
    return (
        <button className={`btn ${className}`}
            onClick={(e) => onClick(e)}
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

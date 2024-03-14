
export const Spinner = ({ className = "" }) => {
    return (
        <div className="spinner-wrapper">
            <div className={`spinner ${className}`}></div>
        </div>
    )
}


export const FormInputFile = ({ className = "", name = "", onChange, multiple = false, accept = "", }) => {
    return (
        <div className={`input-file__wrapper ${className}`} onChange={(e) => onChange(e)}>
            <img src="https://cdn-icons-png.flaticon.com/512/401/401061.png" alt="" />
            <input type="file" name={name} accept={accept} multiple={multiple} />
        </div>
    )
}

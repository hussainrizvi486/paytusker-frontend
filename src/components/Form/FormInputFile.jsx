
export const FormInputFile = ({ onChange, multiple = false, accept = "", }) => {
    return (
        <div className="input-file__wrapper" onChange={(e) => onChange(e)}>
            <img src="https://cdn-icons-png.flaticon.com/512/401/401061.png" alt="" />
            <input type="file" name="review_images" accept={accept} multiple={multiple} />
        </div>
    )
}

export const FormInput = ({ data }) => {
    return (
        <div className="input-box" >
            <div className="input-box__label">{data?.label || ""}</div>
            <div className="input-box__input">
                <input placeholder={data?.label || ""} name={data?.fieldname || ""}
                    type={data.fieldtype}
                    required={data.mandatory}
                />
            </div>
        </div>
    )
}

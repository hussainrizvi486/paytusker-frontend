
export const FormSelect = ({ data }) => {
    return (
        <div className="input-box" >
            <div className="input-box__label">{data?.label}</div>
            <div className="input-box__input">
                <select name={data?.fieldname} >
                    {data?.options?.map((val, i) => (
                        <option key={i} value={val}>{val}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

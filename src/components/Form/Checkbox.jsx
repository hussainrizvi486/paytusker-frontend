import { useState } from "react"

export const Checkbox = ({ data }) => {
    const [check, setCheck] = useState(data.value)
    return (
        <div className="checkbox-wrapper">
            <div className="checkbox">
                <label>
                    <input type="checkbox" id={data.fieldname} name={data.fieldname}
                        defaultChecked={check}
                        defaultValue={check}
                        onChange={() => setCheck(!check)}
                    />
                    <span className="checkbox-material">
                        <span className="check"></span>
                    </span>
                </label>
            </div>

            <label htmlFor={data.fieldname}>{data.label}</label>
        </div>
    )
}

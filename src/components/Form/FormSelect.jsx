import { ChevronDown } from "lucide-react"

export const FormSelect = ({ data }) => {
    let mandatoryFlag = <></>
    if (data.mandatory) {
        mandatoryFlag = <span className="mandatory-flag">*</span>
    }
    return (
        <div className="input-box" >
            <div className="input-box__label">{data?.label} {mandatoryFlag}</div>
            <div className="input-box__input input-box__select">
                <select name={data?.fieldname} >
                    {data?.options?.map((val, i) => (
                        <option key={i} value={val}>{val}</option>
                    ))}

                </select>
                <ChevronDown className="input-box__select-icon" />
            </div>
        </div>
    )
}

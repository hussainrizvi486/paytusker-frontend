import { forwardRef } from "react"
import { ChevronDown } from "lucide-react"


export const FormSelect = forwardRef(function FormSelect({ data, onChange = () => { } }, ref) {
    let mandatoryFlag = <></>
    if (data?.mandatory) {
        mandatoryFlag = <span className="mandatory-flag">*</span>
    }
    return (
        <div className="input-box" >
            <div className="input-box__label">{data?.label} {mandatoryFlag}</div>
            <div className="input-box__input input-box__select">
                <select name={data?.fieldname} defaultValue={data?.value}
                    ref={ref}
                    onChange={(event) => onChange(event)}
                >
                    {data?.options?.map((val, i) => {
                        if (typeof val == "string") {
                            return <option key={i} value={val} > {val}</option>
                        }
                        else if (typeof val == 'object') {
                            return <option key={i} value={val.value}>{val.label}</option>
                        }
                    })}
                </select>
                <ChevronDown className="input-box__select-icon" />
            </div>
        </div >
    )
})
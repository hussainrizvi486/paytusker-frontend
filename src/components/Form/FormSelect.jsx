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
                    data-mandatory={data?.mandatory || false}
                    disabled={Boolean(data?.disabled)}
                    onChange={(event) => onChange(event)}
                >
                    {data?.options?.map((val, i) => {
                        if (val instanceof String) {
                            return <option key={i} value={val}>{val}</option>
                        }
                        else if (val instanceof Object) {
                            return <option key={i} disabled={val?.disabled || false} value={val[data.valueKey || "value"]}>{val[data.labelKey || "label"]}</option>
                        }
                    })}
                </select>
                <ChevronDown className="input-box__select-icon" />
            </div>
        </div >
    )
})
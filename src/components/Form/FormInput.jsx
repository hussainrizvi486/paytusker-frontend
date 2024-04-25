import { forwardRef } from 'react';

export const FormInput = forwardRef(function FormInput({ data, onChange = () => { } }, ref) {
    let mandatoryFlag = <></>
    if (data.mandatory) {
        mandatoryFlag = <span className="mandatory-flag">*</span>
    }
    return (
        <div className="input-box" >
            <div className="input-box__label">{data?.label || ""} {mandatoryFlag}</div>
            <div className="input-box__input">
                <input
                    onChange={(e) => onChange(e)}
                    ref={ref}
                    placeholder={data?.placeholder || data?.label} name={data?.fieldname || ""}
                    type={data?.fieldtype}
                    required={data?.mandatory}
                    defaultValue={data?.value || ""}
                />
            </div>
        </div>
    )
})

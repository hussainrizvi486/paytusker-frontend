import { forwardRef } from 'react';

export const FormInput = forwardRef(function FormInput({ data, onChange = () => { } }, ref) {

    const validateCurrencyInput = (event) => {
        // let value = parseFloat(event.target.value || 0).toFixed(2)
        // event.target.value = value
    }

    let mandatoryFlag = <></>
    if (data?.mandatory) {
        mandatoryFlag = <span className="mandatory-flag">*</span>
    }
    return (
        <div className="input-box" >
            <div className="input-box__label">{data?.label || ""} {mandatoryFlag}</div>
            <div className="input-box__input">
                {data?.fieldtype == "currency" ?

                    <input
                        onChange={(event) => {
                            validateCurrencyInput(event)
                            onChange(event)
                        }}
                        ref={ref}
                        placeholder={data?.placeholder || data?.label} name={data?.fieldname || ""}
                        type={data?.fieldtype || "text"}
                        required={data?.mandatory}
                        defaultValue={data?.value || ""}
                    />
                    :
                    <input
                        onChange={(e) => onChange(e)}
                        ref={ref}
                        placeholder={data?.placeholder || data?.label} name={data?.fieldname || ""}
                        type={data?.fieldtype || "text"}
                        required={data?.mandatory}
                        defaultValue={data?.value || ""}
                    />}
            </div>
        </div>
    )
})

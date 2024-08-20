import { forwardRef } from 'react';

export const Input = forwardRef(function Input({ data, onChange = () => { } }, ref) {
    const validateCurrencyInput = (event) => {
        let value = parseFloat(event.target.value);
        if (isNaN(value)) { value = 0 }
        event.target.value = value.toFixed(2);
    }

    let fieldtype = data?.fieldtype || "text";
    let mandatoryFlag = <></>;

    let inputParamsObject = {
        onChange: (event) => onChange(event),
        placeholder: data?.placeholder || data?.label,
        name: data?.fieldname || "",
        required: data?.mandatory,
        defaultValue: data?.value,
    }

    if (data?.mandatory) {
        mandatoryFlag = <span className="mandatory-flag">*</span>
    }

    if (fieldtype === "percent") {
        fieldtype = "number";
    }

    if (fieldtype == "currency") {
        inputParamsObject.onBlur = (event) => validateCurrencyInput(event);
        inputParamsObject.defaultValue = parseFloat(data?.value || 0) || 0.00;
    }

    inputParamsObject.type = fieldtype;
    return (
        <div className="input-box" >
            {!data?.hideLabel ? <div className="input-box__label">{data?.label || ""}  {mandatoryFlag}</div> : <></>}

            {/* <div className="input-box__label">{data?.label || ""} {mandatoryFlag}</div> */}
            <div className="input-box__input">
                <input {...inputParamsObject} ref={ref} />
            </div>
        </div>
    )
})


export const InputDate = ({ data, onChange = () => { } }) => {
    let inputParamsObject = {
        ...data,
        onChange: (event) => onChange(event),
        placeholder: data?.placeholder || data?.label,
        type: "date"
    }

    return (
        <div className="input-box" >
            {!data.hideLabel ? <div className="input-box__label">{data?.label || ""} </div> : <></>}
            <div className="input-box__input">
                <input {...inputParamsObject} />
            </div>
        </div>
    )
}

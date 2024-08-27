import { useEffect, useRef, useState } from "react";


export const Autocomplete = ({ setValue = () => { }, label = "", placeholder = "", fieldname = "", results = null, mandatory = true, defaultValue = null, readonly = false }) => {
    let inputRef = useRef();
    let inputValueRef = useRef();
    let mandatoryFlag = <></>;

    const [inputQuery, setInputQuery] = useState(defaultValue || "");
    const [showResults, setShowResults] = useState(results);
    const [displayResults, setDisplayResults] = useState(false);
    const inputWrapperRef = useRef();

    if (mandatory) {
        mandatoryFlag = <span className="mandatory-flag">*</span>
    }

    const filterSearchResults = (query = "") => {
        let filterResults = [];
        if (query && results) {
            filterResults = results.filter((val) => {
                if (typeof val === "object") {
                    if (val.option?.toLowerCase().includes(String(query).toLowerCase())) {
                        return val
                    }
                }
                else if (typeof val === "string" && val.toLowerCase().includes(String(query).toLowerCase())) {
                    return val
                }
            }) || []
        }

        else {
            filterResults = results;
        }
        filterResults = filterResults.sort();
        setShowResults(filterResults);
    }

    const handleBlur = () => {
        const currentValue = inputRef.current.value;

        if (inputQuery) {
            const filterValue = results?.find((val) => {
                if (typeof val === 'object' && val.option === currentValue) {
                    return true;
                }
                if (typeof val === 'string' && val === currentValue) {
                    return true;
                }
                return false;
            });

            if (filterValue) {
                if (typeof filterValue === "object") {
                    inputValueRef.current.value = filterValue.value;
                    setInputQuery(currentValue);
                    setValue(filterValue.value);
                    setShowResults([]);
                }
                else if (typeof filterValue === "string") {
                    inputValueRef.current.value = filterValue;
                    setInputQuery(currentValue);
                    setValue(filterValue);
                    setShowResults([]);
                }
            }
            else {
                inputValueRef.current.value = "";
                inputRef.current.value = "";
                setInputQuery("");
                setValue("");
            }
        }
    }

    const hanleSetValue = (val = "") => {
        let value, label;
        if (val instanceof Object) {
            value = val.value;
            label = val.option;
        }

        else { value = label = val; }

        inputRef.current.value = label;
        inputValueRef.current.value = value;

        setInputQuery(label);
        setValue(value);
        setShowResults([]);
    }

    const handleChange = (e) => {
        setInputQuery(e.target.value);
        filterSearchResults(e.target.value);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!(inputWrapperRef.current && inputWrapperRef.current.contains(event.target))) {
                setDisplayResults(false)
            }
        }
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])

    useEffect(() => { setShowResults(results) }, [results])

    return (
        <div className="input-box__input input-box input-box--autocomplete">
            <div className="input-box__label">{label} {mandatoryFlag}</div>

            <input
                defaultValue={typeof defaultValue === "object" ? defaultValue.value : typeof defaultValue === "string" ? defaultValue : ""}
                type="text" placeholder="input value" ref={inputValueRef}
                name={fieldname}
                className="hide"
            />

            <div ref={inputWrapperRef}>
                <input type="text"
                    ref={inputRef}
                    onChange={(e) => handleChange(e)}
                    className="input"
                    onFocus={() => setDisplayResults(true)}
                    onBlur={() => handleBlur()}
                    placeholder={placeholder}
                    disabled={readonly}
                    defaultValue={typeof defaultValue === "object" ? defaultValue.option : typeof defaultValue === "string" ? defaultValue : ""}
                />

                {displayResults ? (
                    <div className="input-autocomplete__wrapper">
                        {showResults && showResults.length > 0 ? (
                            showResults.map((val, i) => (
                                val ?
                                    <div
                                        key={i}
                                        onClick={() => hanleSetValue(val)}
                                        className="input-autocomplete__option"
                                    >
                                        {val instanceof Object ? val.option : val}
                                    </div>
                                    : <></>
                            ))
                        ) : (
                            <div className="text-sm p-2 text-center">No results found</div>
                        )}
                    </div>
                ) : null}

            </div>
        </div >
    )
}
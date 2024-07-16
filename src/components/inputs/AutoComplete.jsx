import { useEffect, useRef, useState } from "react";


export const AutoComplete = ({ setValue = () => { }, label = "", placeholder = "", fieldname = "", results = null, mandatory = true, defaultValue = null }) => {
    let inputRef = useRef();
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
                if (val.toLowerCase().includes(String(query).toLowerCase())) {
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
        if (inputQuery && !results?.includes(inputQuery)) {
            inputRef.current.value = "";
        }
    }

    const hanleSetValue = (val) => {
        inputRef.current.value = val;
        setInputQuery(val);
        setValue(val);
        setShowResults([]);
    }

    const handleChange = (e) => {
        setInputQuery(e.target.value)
        filterSearchResults(e.target.value)
    }


    document.addEventListener("click", (event) => {
        if (!(inputWrapperRef.current && inputWrapperRef.current.contains(event.target))) {
            setDisplayResults(false)
        }
    });

    useEffect(() => { setShowResults(results) }, [results])


    return (
        <div className="input-box__input input-box input-box--autocomplete">
            <div className="input-box__label">{label} {mandatoryFlag}</div>
            <div ref={inputWrapperRef}>
                <input type="text"
                    ref={inputRef}
                    onChange={(e) => handleChange(e)}
                    className="input"
                    onFocus={() => setDisplayResults(true)}
                    onBlur={() => handleBlur()}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    name={fieldname}
                />

                {displayResults ?
                    <div className="input-autocomplete__wrapper">
                        {showResults && showResults?.length > 0 ? showResults.map((val, i) => (

                            <div
                                key={i}
                                onClick={() => hanleSetValue(val)}
                                className="input-autocomplete__option"
                            >
                                {val}
                            </div>
                        )) :
                            <div className="text-sm p-2 text-center">No results found {showResults?.length}</div>
                        }
                    </div> : <></>}
            </div>
        </div>
    )
}
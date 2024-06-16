import { useEffect, useRef, useState } from "react";
import { FormSelect, FormInput, Checkbox, FormInputFile } from "../../../components";
import { Header } from "../../../layouts";
import { Codepen, Flag, X } from "lucide-react";
import { configureStore } from "@reduxjs/toolkit";
// import { FormTextEditor } from "../../../components/form/FormTextEditor";


const UploadProduct = () => {
    const [productCategoriesList, setProductCategoriesList] = useState([]);
    const [productTemplatesList, setProductTemplatesList] = useState([]);
    const [showTemplateField, setShowTemplateField] = useState(false)

    const serializeProductFormData = (event) => {
        event.preventDefault();
    }

    // cover_image
    // product_name
    // item_type
    // description
    // category
    // template
    // stock
    // disabled
    // price
    // images

    return (
        <>
            <Header />
            <main>
                <form onSubmit={(event) => serializeProductFormData(event)}>

                    <div className="mb-4">
                        <FormInput
                            data={{
                                label: "Product Name",
                                fieldname: "product_name",
                                mandatory: true
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <FormInput
                            data={{
                                label: "Price",
                                fieldname: "item_price",
                                mandatory: true,
                                fieldtype: "currency"
                            }}
                        />
                    </div>


                    <div className="mb-4">
                        {/* <FormSelect
                        //     data={{
                        //         label: "Category",
                        //         options: productCategoriesList
                        //     }}
                        // /> */}


                        <InputAutoComplete
                            label="Category"
                        />
                    </div>

                    <div className="mb-4">
                        <FormSelect
                            data={{
                                label: "Item Type",
                                options: [
                                    { label: "Normal", value: "001" },
                                    { label: "Template", value: "002" },
                                    { label: "Variant", value: "003" },
                                ]
                            }}
                            onChange={(e) => setShowTemplateField(() => {
                                if (e.target.value == "003") {
                                    return true
                                }
                                return false
                            })}
                        />
                    </div>

                    {showTemplateField ?
                        <div className="mb-4">
                            <FormSelect
                                data={{
                                    label: "Template",
                                    options: productTemplatesList
                                }}
                            />
                        </div> : <></>}

                    <Checkbox
                        data={{
                            label: "Is Digital",
                            fieldname: "is_digital"
                        }} />

                    <Checkbox
                        data={{
                            label: "Disabled",
                            fieldname: "disabled"
                        }} />

                    <div className="mt-5">
                        <UploadProductMedia />
                    </div>
                </form>
            </main>
        </>
    )
}

export default UploadProduct;


const UploadProductMedia = () => {
    const handleChange = (event) => {
        setCurrentFiles(prev => ([...prev, ...event.target.files]))
    }

    const [currentFiles, setCurrentFiles] = useState([])
    useEffect(() => { console.log(currentFiles) }, [currentFiles])


    const removeImage = (i) => {
        setCurrentFiles((prev) => {
            let updated_files = [...prev]
            updated_files.splice(i, 1)
            return updated_files
        })
    }
    return (
        <>
            <div>
                <FormInputFile multiple={true} onChange={(event) => handleChange(event)}
                    accept="image/*"
                />
            </div>
            <div className="upload-media-grid">
                {
                    currentFiles.map((val, i) =>

                        <div key={i} className="upload-img__file-wrapper">
                            <button
                                onClick={(() => removeImage(i))}
                            >
                                <X strokeWidth={3} />
                            </button>
                            <img src={URL.createObjectURL(val)} alt="" />
                        </div>)
                }
            </div>
        </>
    )
}


const InputAutoComplete = ({ label = "", results = [] }) => {
    results = [
        "apple", "banana", "grape", "orange", "avocado",
        "mango", "peach", "apricot", "papaya", "kiwi",
        "strawberry", "raspberry", "blackberry", "blueberry", "plum",
        "cherry", "date", "fig", "melon", "pear",
        "pomegranate", "watermelon", "mandarin", "nectarine", "tangerine",
        "passionfruit", "guava", "lychee", "persimmon", "cantaloupe",
        "jackfruit", "dragonfruit", "starfruit", "cranberry", "gooseberry",
        "carambola", "breadfruit", "durian", "plantain", "soursop",
        "tamarind", "acerola", "ackee", "elderberry", "jabuticaba",
        "mulberry", "saskatoon", "honeycrisp", "clementine", "miraclefruit"
    ];
    const [showResults, setShowResults] = useState(results);
    const [displayResults, setDisplayResults] = useState(true)
    const [inputQuery, searchInputQuery] = useState("")
    const inputWrapperRef = useRef();
    let inputRef = useRef();

    const filterSearchResults = (query = "") => {
        let filterResults = []
        if (query) {
            filterResults = results.filter((val) => {
                if (val.toLowerCase().includes(String(query).toLowerCase())) {
                    return val
                }
            })
        }
        filterResults = filterResults.sort()
        setShowResults(filterResults)
    }

    const handleChangeInputChange = (event) => {
        searchInputQuery(event.target.value);
    }

    const setInputValue = (val) => {
        if (results.includes(val)) {
            inputRef.current.value = val;
            searchInputQuery(val);
            setShowResults([])
        }
        else {
            inputRef.current.value = "";
            searchInputQuery("");
        }
    }


    useEffect(() => { filterSearchResults(inputQuery) }, [inputQuery])

    document.addEventListener("click", (event) => {
        if (!(inputWrapperRef.current && inputWrapperRef.current.contains(event.target))) {
            setDisplayResults(false)
        }
    });

    return (
        <div className="input-box__input input-box">
            <div className="input-box__label">{label}</div>
            <div ref={inputWrapperRef}>
                <input type="text"
                    ref={inputRef}
                    onChange={(e) => handleChangeInputChange(e)}
                    // onk
                    // onKeyDown={e => { e.stopPropagation(); e.preventDefault() }}
                    className="input"
                    onFocus={() => setDisplayResults(true)}
                />

                {inputQuery && displayResults ?
                    <div className="input-autocomplete__wrapper">
                        {showResults?.length > 0 ? showResults.map((val, i) => (
                            <div
                                onClick={() => setInputValue(val)}
                                className="input-autocomplete__option"
                                key={i}>{val}</div>
                        )) : <div className="text-sm p-2 text-center"
                        >No results found</div>}
                    </div> : <></>
                }
            </div>

        </div>
    )
}
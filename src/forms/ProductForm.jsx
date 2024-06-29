import { useEffect, useState } from "react";
import { FormSelect, FormInput, Checkbox, FormInputFile, SingleFileInput, AutoComplete } from "../components";
import { X } from "lucide-react";
import { serializeFormData } from "../utils";
import axios from "axios";
import { API_URL } from "../redux/store";
import toast from "react-hot-toast";


let CachedCategoryList = null;
let CachedTemplateList = null;

export const ProductForm = ({ submitForm = () => { } }) => {
    const itemTypesObj = [
        { label: "Normal", value: "001" },
        { label: "Template", value: "002" },
        { label: "Variant", value: "003" },
    ];


    const [productCategoriesList, setProductCategoriesList] = useState(CachedCategoryList);
    const [productTemplatesList, setProductTemplatesList] = useState(CachedTemplateList);
    const [itemType, setItemType] = useState("001");

    const handleSubmitEvent = (event) => {
        event.preventDefault();
        const data = serializeFormData(event.target);

        const validationObject = {
            price: {
                validation: (val) => val > 0,
                error_msg: "Price should be greater than 0"
            },
            description: {
                validation: (val = "") => val.split(" ").length >= 50,
                error_msg: "Write at least 50 words in the description"
            },
            product_name: {
                validation: (val = "") => val.split(" ").length >= 5,
                error_msg: "Write at least 5 words in the Product name"
            },
        }


        for (const key of Object.keys(data)) {
            if (Object.keys(validationObject).includes(key)) {
                if (!validationObject[key].validation(data[key])) {
                    toast.error(validationObject[key].error_msg)
                    return;
                }
            }
        }

        submitForm(data);
    }

    const getListFieldsData = async () => {
        try {
            const templates = await axios.get(API_URL + "api/product/template/list")
            const categories = await axios.get(API_URL + "api/category/list")

            if (templates.data && categories.data) {
                CachedTemplateList = templates.data;
                CachedCategoryList = categories.data;
                setProductTemplatesList(CachedTemplateList);
                setProductCategoriesList(CachedCategoryList);
            }

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!CachedTemplateList || !CachedCategoryList) {
            getListFieldsData()
        }
    }, [])

    return (
        <>
            <form onSubmit={(event) => handleSubmitEvent(event)}>
                <div className="mb-4 text-lg font-bold">Product Information</div>
                <div className="mb-4">
                    <FormSelect
                        data={{
                            label: "Item Type",
                            options: itemTypesObj,
                            fieldname: "item_type"
                        }}
                        onChange={(e) => setItemType(e.target.value)}
                    />
                </div>

                {itemType === "003" ?
                    <div className="mb-4">
                        <AutoComplete label="Template"
                            fieldname="template"
                            results={productTemplatesList?.map(val => val.prodct_name)} />
                    </div> : <></>}

                <div className="mb-4">
                    <FormInput
                        data={{
                            label: "Product Name",
                            fieldname: "product_name",

                        }}
                    />
                </div>

                <div className="mb-4">
                    <AutoComplete fieldname="category" label="Category" results={productCategoriesList?.map(val => val.name)} />
                </div>

                {itemType != "002" ?
                    <>
                        <div className="mb-4">
                            <FormInput
                                data={{
                                    label: "Price",
                                    fieldname: "price",
                                    fieldtype: "currency",
                                    value: "0.00"
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <FormInput
                                data={{
                                    label: "Discount %",
                                    fieldname: "discount_percentage",
                                    fieldtype: "percent",
                                    value: "0.00"
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <FormInput data={{ label: "Current Stock", fieldtype: "number", fieldname: "current_stock", value: 1 }} />
                        </div>
                        <div className="mt-5">
                            <div className="form-row">
                                <div className="form-col">
                                    <Checkbox data={{ label: "Is Digital", fieldname: "is_digital" }} />
                                </div>
                                <div className="form-col">
                                    <Checkbox data={{ label: "Disabled", fieldname: "disabled" }} />
                                </div>
                            </div>
                        </div>

                        {/* <div className="mb-4 text-lg font-bold">Description</div> */}
                        <div className="mt-5" >
                            <div className="input-box__label">Description</div>
                            <textarea
                                rows={10}
                                placeholder="Describe the item you're selling"
                                name="description"
                            ></textarea>
                        </div>


                        <div className="mt-4">
                            <div className="font-bold text-lg">Product Medias</div>
                            <br />
                            <div className="mb-4">
                                <div className="label mb-2 text-sm">Thumbnail <span className="mandatory-flag">*</span></div>
                                <SingleFileInput
                                    name="thumbnail_image"
                                />
                            </div>
                            <div className="mt-5"><UploadProductMedia /></div>
                        </div>
                    </> : <></>}


                <div className="text-danger"></div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-primary">Upload</button>
                </div>
            </form>
        </>
    )
}


const UploadProductMedia = ({ defaultFiles = [] }) => {
    const [currentFiles, setCurrentFiles] = useState(defaultFiles);

    const handleChange = (event) => {
        setCurrentFiles(prev => ([...prev, ...event.target.files]))
    }

    const removeImage = (i) => {
        setCurrentFiles((prev) => {
            let updated_files = [...prev]
            updated_files.splice(i, 1)
            return updated_files
        })
    }

    useEffect(() => { console.log(currentFiles) }, [currentFiles])

    return (
        <>
            <div className="label">Other Images</div>
            <div className="upload-media-grid">
                <FormInputFile
                    className="border-none shadow-none upload-img__file-wrapper"
                    multiple={true} onChange={(event) => handleChange(event)}
                    accept="image/*"
                />

                {currentFiles.map((val, i) =>
                    <div key={i} className="upload-img__file-wrapper input-file__wrapper">
                        <button onClick={(() => removeImage(i))} >
                            <X strokeWidth={3} />
                        </button>
                        <img src={URL.createObjectURL(val)} alt="" />
                    </div>)}
            </div>
        </>
    )
}

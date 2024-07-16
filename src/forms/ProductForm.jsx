import { forwardRef, useEffect, useRef, useState } from "react";
import { FormSelect, FormInput, Checkbox, FormInputFile, SingleFileInput, AutoComplete } from "../components";
// import { Forklift, Kanban, Tally1, Tornado, Trash2, X } from "lucide-react";
import { serializeFormData } from "../utils";
import axios from "axios";
import { API_URL } from "../redux/store";
import toast from "react-hot-toast";
import { useImperativeHandle } from "react";
import { Trash2, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";


let CachedCategoryList = null;
let CachedTemplateList = null;

const validationObject = {
    net_price: {
        validation: (val) => val > 0,
        error_msg: "Price should be greater than 0"
    },
    description: {
        validation: (val = "") => val.split(" ").length >= 10,
        error_msg: "Write at least 10 words in the description"
    },
    product_name: {
        validation: (val = "") => val.split(" ").length >= 2 && val.length < 251,
        error_msg: "Write at least 2 words and less than 251 characters in the Product name"
    },
    cover_image: {
        validation: (val, type = "") => {
            if (type != "002") return val != null && val;
            return true;
        },
        error_msg: "Please set a thumbnail image"
    },
}

export const ProductForm = ({ productData, submitForm = () => { } }) => {
    const itemTypesObj = [
        { label: "Normal", value: "001" },
        { label: "Template", value: "002", disabled: false },
        { label: "Variant", value: "003", disabled: false },
    ];


    const variantTableRef = useRef();
    const navigate = useNavigate();
    const [URLparams] = useSearchParams();
    URLparams.keys().forEach((key) => console.log(key))

    const [productCategoriesList, setProductCategoriesList] = useState(CachedCategoryList);
    const [productTemplatesList, setProductTemplatesList] = useState(CachedTemplateList);
    const [productFiles, setProductFiles] = useState([]);
    const [itemType, setItemType] = useState(productData?.item_type || URLparams.get("item_type") || "001");
    const [errorMsg, setErrorMsg] = useState(null);



    const handleSubmitEvent = (event) => {
        event.preventDefault();
        const convertedFormData = new FormData();
        const data = serializeFormData(event.target);

        if (productData) { data["id"] = productData?.id; }
        if (!data.cover_image) { data["cover_image"] = productData?.cover_image; }
        delete data["other_images"];

        for (const key of Object.keys(data)) {
            if (Object.keys(validationObject).includes(key)) {
                const validated = validationObject[key].validation(data[key], itemType)

                if (!validated) {
                    setErrorMsg(validationObject[key].error_msg);
                    toast.error(validationObject[key].error_msg);
                    throw Error(validationObject[key].error_msg);
                }
                else { setErrorMsg(""); }
            }
            else if (!data[key]) {
                let msg = `Value required in ${key.replace("_", " ")} `;
                toast.error(msg);
                setErrorMsg(msg);
                throw Error(msg);
            }
            else { setErrorMsg(""); }
        }

        if (variantTableRef.current) { convertedFormData.append("variant_attributes", JSON.stringify(variantTableRef.current.getTableData())) }
        for (const key of Object.keys(data)) { convertedFormData.append(key, data[key]); }
        for (const file of productFiles) { convertedFormData.append("product_media", file); }


        submitForm(convertedFormData);
    }

    const getListFieldsData = async () => {
        try {
            const templates = await axios.get(API_URL + "api/product/template/list");
            const categories = await axios.get(API_URL + "api/category/list");
            if (templates.data && categories.data) {
                CachedTemplateList = templates.data;
                CachedCategoryList = categories.data;
                setProductTemplatesList(CachedTemplateList);
                setProductCategoriesList(CachedCategoryList);
            }
        } catch (error) { console.error(error); }
    }

    useEffect(() => {
        if (!CachedTemplateList || !CachedCategoryList) {
            getListFieldsData();
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
                            value: productData?.item_type,
                            fieldname: "item_type",
                            disabled: Boolean(productData),
                        }}
                        onChange={(e) => setItemType(e.target.value)}
                    />
                </div>


                {itemType === "003" ?
                    <div className="mb-4">
                        {/* <AutoComplete label="Template"
                            fieldname="template"
                            results={CachedTemplateList?.map(val => val.product_name)} /> */}

                        <FormSelect
                            data={{
                                fieldname: "template",
                                options: productTemplatesList,
                                mandatory: true,
                                labelKey: "product_name",
                                valueKey: "id",
                                label: "Template"
                            }}
                        />

                    </div> : <></>}

                <div className="mb-5" >
                    <div className="input-box__label">Product Name</div>
                    <textarea
                        rows={5}
                        placeholder="Example: GlowBright LED Lamp"
                        name="product_name"
                        defaultValue={productData?.product_name}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <AutoComplete
                        defaultValue={productData?.category_name}
                        fieldname="category" label="Category" results={productCategoriesList?.map(val => val.name)} />
                </div>

                {itemType != "002" ?
                    <>
                        <div className="mb-4">
                            <FormInput
                                data={{
                                    label: "Price",
                                    fieldname: "net_price",
                                    fieldtype: "currency",
                                    value: productData?.net_price
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <FormInput data={{ label: "Current Stock", fieldtype: "number", fieldname: "stock", value: productData?.stock || 1 }} />
                        </div>
                        <div className="mt-5">
                            <div className="form-row">
                                <div className="form-col">
                                    <Checkbox data={{ label: "Is Digital", fieldname: "is_digital", value: productData?.is_digital }} />
                                </div>
                                <div className="form-col">
                                    <Checkbox data={{ label: "Disabled", fieldname: "disabled", value: productData?.disabled }} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5" >
                            <div className="input-box__label">Description</div>
                            <textarea
                                rows={10}
                                placeholder="Describe the item you're selling"
                                name="description"
                                defaultValue={productData?.description || ""}
                            ></textarea>
                        </div>

                        {itemType == "003" ? <div className="mt-8 mb-8"><InputTable ref={variantTableRef}
                            fields={[
                                { fieldtype: "Data", fieldname: "attribute", label: "Attribute" },
                                { fieldtype: "Data", fieldname: "attribute_value", label: "Value" }
                            ]}
                            defaultValue={productData?.variants_attributes || []}
                        /></div> : <></>}

                        <div className="mt-4">
                            <div className="font-bold text-lg">Product Images</div>
                            <br />
                            <div className="mb-4">
                                <div className="label mb-2 text-sm">Thumbnail <span className="mandatory-flag">*</span></div>
                                <SingleFileInput
                                    name="cover_image"
                                    defaultValue={productData?.cover_image}
                                />
                            </div>
                            <div className="mt-5"><UploadProductMedia
                                setFiles={(files) => setProductFiles(files)}
                                defaultFiles={productData?.images}
                            /></div>
                        </div>
                    </> : <></>}

                <div className="text-danger text-sm my-2 mt-4 font-medium">
                    {errorMsg}
                </div>

                <div className="mt-5">
                    <div className="flex gap-1">
                        <button type="submit" className="btn btn-primary btn-sm">
                            {productData ? "Update" : "Upload"}
                        </button>
                        {productData?.item_type == "002" ? <button type="button" className="btn btn-success btn-sm"

                            onClick={() => {

                                let params = new URLSearchParams({
                                    "template": productData.id,
                                    "template_name": productData.product_name,
                                    "item_type": "003",
                                    "category": productData.category_id,
                                    "category_name": productData.category_name,
                                });

                                return navigate(`/seller/product/upload?` + params.toString());

                            }}
                        >Create Variant</button> : null}
                    </div>
                </div>
            </form >
        </>
    )
}


const UploadProductMedia = ({ defaultFiles = [], setFiles = () => { } }) => {
    const [currentFiles, setCurrentFiles] = useState(defaultFiles || {});

    const handleChange = (event) => {
        if (!event.target.files.length == 0) {
            console.log("No Files")
        }
        console.log(event.target.files)
        setCurrentFiles(prev => ([...prev, ...event.target.files]))
    }

    const removeImage = (i) => {
        setCurrentFiles((prev) => {
            let updated_files = [...prev]
            updated_files.splice(i, 1)
            return updated_files
        })
    }

    useEffect(() => { setFiles(currentFiles) }, [currentFiles])
    
    return (
        <>
            <div className="label">Other Images</div>
            <div className="upload-media-grid">
                <FormInputFile
                    className="border-none shadow-none upload-img__file-wrapper"
                    multiple={true} onChange={(event) => handleChange(event)}
                    accept="image/*"
                    name="other_images"
                />

                {currentFiles?.map((val, i) =>
                    <div key={i} className="upload-img__file-wrapper input-file__wrapper">
                        <button onClick={(() => removeImage(i))} >
                            <X strokeWidth={3} />
                        </button>
                        {
                            val instanceof File ? <img src={URL.createObjectURL(val)} alt="" /> : <img src={val} alt="" />
                        }
                    </div>)}
            </div>
        </>
    )
}


const InputTable = forwardRef(function InputTable({ defaultValue = [], fields = [] }, ref) {
    const [tableData, setTableData] = useState(defaultValue || []);
    const tableHeads = fields.map(field => field?.label);

    const initialRowObject = fields.reduce((acc, field) => {
        acc[field.fieldname] = "";
        return acc;
    }, {});

    const handleInputChange = (e, idx, fieldname) => {
        const newValue = e.target.value;
        setTableData(prev => {
            const updatedTableData = [...prev];
            updatedTableData[idx] = { ...updatedTableData[idx], [fieldname]: newValue };
            return updatedTableData;
        });
    };

    const handleRowRemove = (idx) => {
        setTableData(prev => {
            const updatedTableData = prev.slice();
            updatedTableData.splice(idx, 1);
            return updatedTableData;
        });
    };

    const addRow = () => {
        setTableData(prev => [...prev, initialRowObject]);
    };

    const renderField = (field, key, idx) => {
        tableData[idx][field.fieldname]
        return (
            <td key={key} >
                {field.fieldtype === "Data" && (
                    <FormInput data={{ value: tableData[idx][field.fieldname] || "" }}
                        onChange={(e) => handleInputChange(e, idx, field.fieldname)}
                    />)}
            </td>
        )
    }

    useImperativeHandle(ref, () => ({
        getTableData: () => tableData
    }));


    return (
        <>
            <div>
                <div className="font-medium mb-2 mt-6">Variant Attributes </div>
            </div>
            <table className="table w-100" >
                <thead>
                    <tr>
                        <th style={{ width: "3%" }}></th>
                        <th style={{ width: "2%" }}> Sr </th>
                        {tableHeads.map((label, i) => (
                            <th key={i} className="text-left" style={{ width: `${100 / tableHeads.length}%` }}>
                                {label} <span className="text-danger" >*</span>
                            </th>))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.length > 0 ? tableData.map((row, idx) => (
                        <tr key={idx} >
                            <td className="text-center p-1" >
                                <Trash2
                                    className="text-danger icon-md cursor-pointer"
                                    onClick={() => handleRowRemove(idx)}
                                />
                            </td>
                            <td className="text-center" >{idx + 1}</td>
                            {fields.map((field, fieldIdx) => renderField(field, fieldIdx, idx))}
                        </tr>
                    )) : (<tr><td colSpan={fields.length + 2} className="text-center">No Data</td></tr>)}
                </tbody>
            </table>
            <div className="mt-4" >
                <button className="btn btn-sm btn-primary" type="button" onClick={addRow} >
                    Add Row
                </button>
            </div>
        </>
    );
});

export default InputTable;
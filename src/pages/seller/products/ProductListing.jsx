import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Select, Input, InputDate } from "@components";
import { ScrollToTop, serializeFormData } from "@utils";


const renderField = (field, key) => {
    if (field?.type === "text") {
        return <Input
            key={key}
            data={{
                fieldtype: field.type,
                fieldname: field.name,
                label: field.label,
                placeholder: field.placeholder,
            }}
        />
    }
    else if (field?.type === "select") {
        return <Select
            key={key}
            data={{
                fieldtype: field.type,
                label: field.label,
                fieldname: field.name,
                placeholder: field.placeholder,
                options: field.options,
            }}
        />

    }

    else if (field?.type === "date") {
        return <InputDate
            key={key}
            data={field}
        />
    }

}

import { useGetSellerProductListingQuery } from "@api";
import noImage from "@src/assets/noImage.png";
import { ChevronDown, ChevronUp, Pen } from "lucide-react";


const listingFilterFields = [
    {
        "name": "search_query",
        "label": "Search product by name",
        "placeholder": "Enter product name",
        "type": "text"
    },
    {
        "name": "category",
        "label": "Category",
        "placeholder": "Select category",
        "type": "autocomplete"
    },
    {
        "name": "item_type",
        "label": "Item type",
        "placeholder": "Select item type",
        "type": "select",
        "options": ["", { "label": "Normal", "value": "001" }, { "label": "Variance", "value": "002" }]
    },
    {
        "name": "disabled",
        "label": "Status",
        "placeholder": "",
        "type": "select",
        "options": ["", { "label": "Enabled", "value": 0 }, { "label": "Disabled", "value": 1 }]
    },
    {
        "name": "is_digital",
        "label": "Digital Items",
        "placeholder": "",
        "type": "select",
        "options": ["", { "label": "Enabled", "value": 0 }, { "label": "Disabled", "value": 1 }]
    },
    {
        "name": "creation",
        "label": "Created on",
        "type": "date"
    }
]


const ProductListing = () => {
    const [queryPayload, setQueryPayload] = useState({});
    const [productsData, setProductsData] = useState(null);
    const listingAPI = useGetSellerProductListingQuery(queryPayload);
    const [paginationObject, setPaginationObject] = useState(null);

    useEffect(() => {
        if (listingAPI.data) {
            const { data } = listingAPI;
            const { results } = data;

            setExpandedRows([]);
            results.length > 0 ? setProductsData(results) : setProductsData(null);
            setPaginationObject({
                currentPage: data.current_page,
                pageCount: data.total_pages,
            })
            ScrollToTop();
        }

    }, [listingAPI])

    const handleFiltersSubmit = (e) => {
        e.preventDefault();
        let serializedData = serializeFormData(e.target)
        const filterObject = {}
        Object.keys(serializedData).forEach(key => {
            if (serializedData[key]) {
                filterObject[key] = serializedData[key]
            }
        })
        setQueryPayload({ "filters": JSON.stringify(filterObject) })
    }
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (index) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };
    return (
        <div>
            <div className="mb-4">
                <div className="flex justify-between align-items-center">
                    <div>
                        <h1 className="text-lg">My Products</h1>
                    </div>
                    <div>
                        <Link to={"/seller/product/upload"}>
                            <button className="btn btn-primary btn-sm">
                                Add new product
                            </button>
                        </Link>
                    </div>
                </div>

                <div>
                    <div>
                        <h2 className="text-lg mt-4 mb-2 ">Filters</h2>
                    </div>
                    <form onSubmit={(e) => handleFiltersSubmit(e)}>
                        <div className="flex align-items-center gap-1">
                            {listingFilterFields.map((val, key) => {
                                const field = renderField(val, key);
                                return (
                                    field && (
                                        <div
                                            style={{ width: "200px" }}
                                            key={key}
                                            className="mb-2"
                                        >
                                            {field}
                                        </div>
                                    )
                                );
                            })}

                        </div>

                        <button type="submit" className="btn btn-sm btn-primary">Filter</button>
                    </form>
                </div>
            </div>
            <table className="table w-100 small-sm">
                <thead>
                    <tr>
                        <th width="2%">Sr</th>
                        <th className="w-40">Product</th>
                        <th className="w-10 hidden-sm text-right">Available</th>
                        <th className="w-10 text-right">Price</th>
                        <th className="w-10 hidden-sm">Item Type</th>
                        <th className="w-10 hidden-sm">Status</th>
                        <th className="w-10 hidden-sm">Date Created</th>
                        <th className="w-10 hidden-sm">Date Modified</th>
                        <th className="w-10 hidden-sm">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData ? productsData.map((val, index) => {
                        if (val.item_type == "002" && val.variants) {
                            return (
                                <>
                                    <tr key={index}>
                                        <td >{++index}</td>
                                        <td colSpan={7} >
                                            <div className="flex align-items-center gap-1">
                                                <button onClick={() => toggleRow(index)} style={{ cursor: "pointer" }}
                                                >
                                                    {expandedRows[index] ? <ChevronUp /> : <ChevronDown />}
                                                </button>
                                                <div>
                                                    <b>
                                                        {val.product_name}
                                                    </b>
                                                </div>
                                            </div>
                                        </td>
                                        <td>


                                            <Link className="cursor-pointer" to={`/seller/product/edit/${val?.id}`}>
                                                <Pen className="icon-sm" strokeWidth={2.25} />
                                                {/* <Pen /> */}
                                            </Link>
                                        </td>
                                    </tr>

                                    {expandedRows[index] && val.variants.map((variant, sr) => (
                                        <tr key={sr}>
                                            <td><b>{++sr}</b></td>
                                            <td>
                                                <div className="flex gap" style={{ height: "70px" }}>
                                                    {variant.item_type !== "002" &&
                                                        <img src={variant.cover_image || noImage}
                                                            alt="" style={{ width: "50px", objectFit: "contain", flexShrink: 0 }} />}
                                                    <div style={{ height: "100%", overflow: "hidden", margin: "0 0 .25rem" }}>
                                                        {variant.product_name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden-sm text-right">{variant.stock}</td>
                                            <td className="text-right">{variant.net_price}</td>
                                            <td className="hidden-sm">{variant.item_type_name}</td>
                                            <td className="hidden-sm">{variant.disabled ? "Disabled" : "Enabled"}</td>
                                            <td className="hidden-sm">{variant.creation}</td>
                                            <td className="hidden-sm">{variant.modified}</td>
                                            <td>
                                                <Link className="cursor-pointer" to={`/seller/product/edit/${variant?.id}`}>
                                                    <Pen className="icon-sm" strokeWidth={2.25} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </>

                            )
                        }
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link className="cursor-pointer" key={index} to={`/seller/product/edit/${val.id}`}  >
                                        <div className="flex gap"
                                            style={{ height: "70px" }}
                                        >
                                            {
                                                val?.item_type != "002" ?
                                                    <img src={val?.cover_image || noImage}
                                                        alt="" style={{ width: "50px", objectFit: "contain", flexShrink: 0 }} />
                                                    : <></>
                                            }
                                            <div style={{ height: "100%", overflow: "hidden", "margin": "0 0 .25rem" }}>
                                                {val.product_name}
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="hidden-sm text-right">{val.stock} </td>
                                <td className="text-right">{val.net_price} </td>
                                <td className="hidden-sm">{val.item_type_name} </td>
                                <td className="hidden-sm">{val.disabled ? "Disabled" : "Enabled"} </td>
                                <td className="hidden-sm">{val.creation} </td>
                                <td className="hidden-sm">{val.modified} </td>
                                <td>
                                    <Link className="cursor-pointer" to={`/seller/product/edit/${val?.id}`}>
                                        <Pen className="icon-sm" strokeWidth={2.25} />
                                    </Link>
                                </td>
                            </tr>
                        )
                    }) : <><tr><td colSpan={8} className="text-center">No products found</td></tr></>}
                </tbody>

            </table>

            <div className="mt-6 flex-right">
                <Pagination {...paginationObject}
                    setCurrentPage={(pageNum) => setQueryPayload((prev) => ({
                        ...prev,
                        "page": pageNum
                    }))}
                />
            </div>
        </div >
    )
}

export default ProductListing
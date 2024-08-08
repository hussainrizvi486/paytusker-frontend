import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Autocomplete, Select, Input, InputDate } from "@components";
import { ScrollToTop, serializeFormData } from "@utils";

// import { } from "@components";

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
            setProductsData(results || []);
            setPaginationObject({
                currentPage: data.current_page,
                pageCount: data.total_pages,
            })
            ScrollToTop();
        }
        else if (!listingAPI.isLoading && !listingAPI.isSuccess) {
            console.warn("test")
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
        // console.log("abc")
        setQueryPayload({ "filters": JSON.stringify(filterObject) })
    }
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
                        <h2 className="text-lg mt-4 mb-2">Filters</h2>
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
                <thead >
                    <tr>
                        <th width="2%">Sr</th>
                        <th className="w-40">Product</th>
                        <th className="w-10 hidden-sm text-right">Available</th>
                        <th className="w-10 text-right">Price</th>
                        <th className="w-10 hidden-sm">Item Type</th>
                        <th className="w-10 hidden-sm">Status</th>
                        <th className="w-10 hidden-sm">Date Created</th>
                        <th className="w-10 hidden-sm">Date Modified</th>
                    </tr>
                </thead>
                <tbody>

                    {productsData?.map((val, index) => (
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
                        </tr>
                    ))}
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
        </div>
    )
}

export default ProductListing
import { useEffect, useState } from "react";
import { useGetSellerProductListingQuery } from "../../../api";
import { Pagination } from "../../../components";
import { Link } from "react-router-dom";
import noImage from "../../../assets/noImage.png";


const ProductListing = () => {
    const [productsData, setProductsData] = useState(null);
    const listingAPI = useGetSellerProductListingQuery();

    useEffect(() => {
        setProductsData(listingAPI.data)
    }, [listingAPI.data])

    return (
        <div >
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
            </div>
            <table className="table w-100 small-sm">
                <thead >
                    <tr>
                        <th width="2%">Sr</th>
                        <th className="w-40">Product</th>
                        <th className="w-10 text-right">Available</th>
                        <th className="w-10 text-right">Price</th>
                        <th className="w-10">Item Type</th>
                        <th className="w-10">Status</th>
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
                                        <img src={val?.item_type === "002" ?
                                            "https://cdn-icons-png.flaticon.com/512/16603/16603043.png" :
                                            val?.cover_image || noImage}
                                            alt="" style={{ width: "50px", objectFit: "contain", flexShrink: 0 }} />

                                        <div style={{ height: "100%", overflow: "hidden", "margin": "0 0 .25rem" }}>
                                            {val.product_name}
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className=" text-right">{val.stock} </td>
                            <td className=" text-right">{val.net_price} </td>
                            <td className="">{val.item_type_name} </td>
                            <td className="">{val.disabled ? "Disabled" : "Enabled"} </td>
                            <td className="hidden-sm">{val.creation} </td>
                            <td className="hidden-sm">{val.modified} </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* <div className="mt-6 flex-right">
                <Pagination pageCount={10} />
            </div> */}
        </div >
    )
}

export default ProductListing
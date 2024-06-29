import { useEffect, useState } from "react";
import { useGetSellerProductListingQuery } from "../../../api"
import { Pagination } from "../../../components"

const ProductListing = () => {
    const [productsData, setProductsData] = useState(null);
    const listingAPI = useGetSellerProductListingQuery();

    useEffect(() => {
        setProductsData(listingAPI.data)
    }, [listingAPI.data])

    return (
        <div>
            <div className="data-grid data-grid--full data-grid--border ">
                <div className="data-row data-row--head">
                    <div className="data-cell">Product</div>
                    <div className="data-cell text-right">Available</div>
                    <div className="data-cell text-right">Price</div>
                    <div className="data-cell">Item Type</div>
                    <div className="data-cell">Date Created</div>
                    <div className="data-cell">Date Modified</div>
                </div>
                {productsData?.map((val, index) => (
                    <div key={index} className="data-row">
                        <div className="data-cell">
                            <img src={val.cover_image} alt="" />

                            {val.product_name}</div>
                        <div className="data-cell text-right">{val.stock} </div>
                        <div className="data-cell text-right">{val.net_price} </div>
                        <div className="data-cell">{val.item_type} </div>
                        <div className="data-cell">{val.creation} </div>
                        <div className="data-cell">{val.modified} </div>
                    </div>
                ))}
            </div>

            <Pagination pageCount={10} />
        </div>
    )
}

export default ProductListing
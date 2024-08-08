import { Navigate, useParams } from "react-router-dom"
import { ProductForm } from "../../../forms"
import { useGetSellerProductListingQuery, useUpdateSellerProductMutation } from "../../../api";
import toast from "react-hot-toast";
import { useEffect } from "react";

const EditProduct = () => {
    const { id } = useParams();
    const productData = useGetSellerProductListingQuery({ id: id });
    const apiHook = useUpdateSellerProductMutation();


    // useEffect(() => {
    //     if (updateProductResponse.isSuccess) {
    //         toast.success(updateProductResponse.data)
    //         // return <Navigate to={"/seller/product/list"} />
    //     }
    //     if (updateProductResponse.isError) {
    //         toast.success(updateProductResponse.data)
    //     }

    // }, [updateProductResponse])

    return (
        <main>
            {productData?.data ? <ProductForm productData={productData?.data} apiHook={apiHook} /> : <></>}
        </main>
    )
}

export default EditProduct
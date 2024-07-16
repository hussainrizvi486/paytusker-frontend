import { Navigate, useParams } from "react-router-dom"
import { ProductForm } from "../../../forms"
import { useGetSellerProductListingQuery, useUpdateSellerProductMutation } from "../../../api";
import toast from "react-hot-toast";

const EditProduct = () => {
    const { id } = useParams();
    const productData = useGetSellerProductListingQuery({ id: id });
    const [updateProduct, updateProductResponse] = useUpdateSellerProductMutation();

    if (updateProductResponse.isSuccess) {
        toast.success(updateProductResponse.data)
        return <Navigate to={"/seller/product/list"} />
    }
    else if (updateProductResponse.isError) {
        toast.success(updateProductResponse.data)
    }

    return (
        <main>
            {productData?.data ? <ProductForm submitForm={updateProduct} productData={productData?.data} /> : <></>}
        </main>
    )
}

export default EditProduct
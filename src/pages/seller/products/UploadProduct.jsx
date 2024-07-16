import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../../forms";
import { useCreateSellerProductMutation } from "../../../api";

const UploadProduct = () => {
    const [createProduct, createProductResponse] = useCreateSellerProductMutation();
    const navigate = useNavigate();
    const handleSubmitEvent = async (data) => {
        createProduct(data);
    }

    if (createProductResponse.isSuccess) {
        toast.success(createProductResponse.data);
        navigate("/seller/product/list")
    }
    if (createProductResponse.isError) {
        toast.error(createProductResponse.data);

        // navigate("/seller/product/list")
    }

    return (
        <>
            <ProductForm
                submitForm={(data) => handleSubmitEvent(data)} />
        </>
    )
}

export default UploadProduct;
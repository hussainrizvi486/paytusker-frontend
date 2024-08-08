import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../../forms";
import { useCreateSellerProductMutation } from "../../../api";

const UploadProduct = () => {
    const apiHook = useCreateSellerProductMutation();

    return (
        <>
            <ProductForm
                apiHook={apiHook} />
        </>
    )
}

export default UploadProduct;
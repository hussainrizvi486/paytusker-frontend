import { ProductForm } from "../../../forms";

const UploadProduct = () => {
    const handleSubmitEvent = (data) => {
        console.warn(data)
    }

    return (
        <>
            <ProductForm
                submitForm={(data) => handleSubmitEvent(data)} />
        </>
    )
}

export default UploadProduct;
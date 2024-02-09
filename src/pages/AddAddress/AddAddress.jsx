import { FormInput } from "../../components/Form/FormInput"
import { FormSelect } from "../../components/Form/FormSelect"
import { Header, UserSidebar } from "../../layouts"
import { useAddUserAddressMutation } from "../../features/api/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Freeze } from "../../components"

const AddAddress = () => {
    const [addAddress, apiResponse] = useAddUserAddressMutation()
    let navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(false)
    const addAddressFields = [
        {
            "fieldname": "address_title",
            "label": "Address Title",
            "fieldtype": "text",
            "mandatory": true,
        },
        {
            "fieldname": "country",
            "label": "Country",
            "fieldtype": "text",
            "mandatory": true,
        },
        {
            "fieldname": "state",
            "label": "State",
            "fieldtype": "text",
            "mandatory": true,
        },
        {
            "fieldname": "address_type",
            "label": "Address Type",
            "fieldtype": "text",
            "mandatory": true,
        },
        {
            "fieldname": "city",
            "label": "City",
            "fieldtype": "text",
            "mandatory": true,
        },
        {
            "fieldname": "details",
            "label": "House No /Street /Area",
            "fieldtype": "text",
            "mandatory": true,
        },
    ]

    useEffect(() => {
        setPageLoading(apiResponse.isLoading)

    }, [apiResponse])


    if (apiResponse.isSuccess) {
        // toast.success("Address Added")
        navigate("/profile/address");
    }

    const f2Submit = async (e) => {
        const data = {}
        const formData = new FormData(e.target)

        for (const [key, value] of formData.entries()) {
            data[key] = value
        }

        addAddress(data)
    }

    if (pageLoading) return <Freeze />

    return (
        <div>
            <Header />
            {/* <Navbar title={"Address"}/> */}
            <div className="sidebar-page ">
                <UserSidebar />
                <div className="sidebar-page__content address-page">
                    <div className="address-page__upper">
                        <div className="heading-md">Add New Address</div>
                    </div>

                    <div className="address-page__content">
                        {generateForm(addAddressFields, f2Submit, "Save")}
                    </div>


                </div>

            </div>
        </div>
    )
}

export default AddAddress
const generateForm = (fields, onSubmit, btnLabel) => {
    const formInputTypes = ["number", "password", "text"]

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onSubmit(e)
    }

    const FormJsx = (
        <form className="web-form" onSubmit={(e) => handleFormSubmit(e)} >
            <div className="web-form__fields">

                {fields?.map((val, i) => {
                    if (formInputTypes.includes(val.fieldtype)) {
                        return <FormInput key={i} data={val} />;
                    }
                    if (val.fieldtype === "select") {
                        return <FormSelect key={i} data={val} />;
                    }
                })}


            </div>
            <div>
                <button type="submit"
                    className="btn btn-sm btn-primary"
                >{btnLabel || "Submit"}</button>
            </div>
        </form>
    );

    return FormJsx;
}


import { FormInput } from "../../components/Form/FormInput"
import { FormSelect } from "../../components/Form/FormSelect"
import { Header, Navbar, UserSidebar } from "../../layouts"

const AddAddress = () => {
    const addAddressFields = [
        {
            "fieldname": "address_title",
            "label": "Address Title",
            "fieldtype": "text",
        },
        {
            "fieldname": "country",
            "label": "Country",
            "fieldtype": "text",
        },
        {
            "fieldname": "state",
            "label": "State",
            "fieldtype": "text",
        },
        {
            "fieldname": "address_type",
            "label": "Address Type",
            "fieldtype": "text",
        },
        {
            "fieldname": "city",
            "label": "City",
            "fieldtype": "text",
        },
        {
            "fieldname": "city",
            "label": "City",
            "fieldtype": "select",
            "options": ["text1", "Test1"],
        },
        {
            "fieldname": "details",
            "label": "House No /Street /Area",
            "fieldtype": "text",
        },
        // {
        //     "fieldname": "default_address",
        //     "label": "Default Address",
        //     "fieldtype": "checkbox",
        // },
    ]

    const f2Submit = (e) => {
        const data = {}
        const formData = new FormData(e.target)

        for (const [key, value] of formData.entries()) {
            data[key] = value
        }

        console.log(data)
    }
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
                        {generateForm(addAddressFields, f2Submit)}
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

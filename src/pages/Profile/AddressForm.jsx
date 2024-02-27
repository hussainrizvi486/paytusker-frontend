import { FormInput } from "../../components/Form/FormInput"
import { FormSelect } from "../../components/Form/FormSelect"
import { Header, UserSidebar } from "../../layouts"
import { useAddUserAddressMutation, useGetUserAddressQuery } from "../../features/api/api"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Freeze } from "../../components"
import { useParams } from "react-router-dom"

const AddAddress = () => {
    const [formData, setFormData] = useState({})

    const addAddressFields = [
        {
            "fieldname": "address_title",
            "label": "Address Title",
            "fieldtype": "text",
            "mandatory": true,
            "value": formData.address_title || ""
        },
        {
            "fieldname": "country",
            "label": "Country",
            "fieldtype": "text",
            "mandatory": true,
            "value": formData.country || ""
        },
        {
            "fieldname": "state",
            "label": "State",
            "fieldtype": "text",
            "mandatory": true,
            "value": formData.state || ""
        },
        {
            "fieldname": "address_type",
            "label": "Address Type",
            "fieldtype": "text",
            "mandatory": true,
            "value": formData.address_type || ""
        },
        {
            "fieldname": "city",
            "label": "City",
            "fieldtype": "text",
            "mandatory": true,
            "value": formData.city || ""
        },
        {
            "fieldname": "address_line_1",
            "label": "House No /Street /Area",
            "fieldtype": "text",
            "mandatory": true,
            "value": formData.address_line_1 || ""
        },
    ];

    const [addAddress, apiResponse] = useAddUserAddressMutation();
    const [searchParams] = useSearchParams();
    const urlParams = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (apiResponse.isSuccess) {
            navigate("/profile/address");
        }
    }, [apiResponse.isSuccess, navigate]);

    useEffect(() => {
        if (urlParams.action === "edit") {
            const { data } = useGetUserAddressQuery({ id: searchParams.get("id") });
            if (data) {
                setFormData(data)
            }
        }

    }, [searchParams, urlParams.action])


    let pageHeading = urlParams.action === "add" ? "Add New Address" : "Edit";


    const [pageLoading, setPageLoading] = useState(false);



    const f2Submit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        addAddress(data);
    };

    useEffect(() => {
        setPageLoading(apiResponse.isLoading);
    }, [apiResponse.isLoading]);

    if (pageLoading) return <Freeze />;

    return (
        <div>
            <Header />
            <div className="sidebar-page">
                <UserSidebar />
                <div className="sidebar-page__content address-page">
                    <div className="address-page__upper">
                        <div className="heading-md">{pageHeading}</div>
                    </div>
                    <div className="address-page__content">
                        {generateForm(addAddressFields, f2Submit, "Save")}
                    </div>
                </div>
            </div>
        </div>
    );
};

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

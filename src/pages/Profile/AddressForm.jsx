import { FormInput } from "../../components/Form/FormInput";
import { FormSelect } from "../../components/Form/FormSelect";
import { Header, UserSidebar } from "../../layouts";
import { useAddUserAddressMutation, useUpdateUserAddressMutation, useGetUserAddressQuery } from "../../api";
import { useEffect, useState } from "react";
import { json, useNavigate, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import { countries } from "../../webData";
import { Checkbox } from "../../components";


const AddressFormFields = [
    {
        "fieldname": "address_title",
        "label": "Address Title",
        "fieldtype": "text",
        "mandatory": true,
        "value": ""
    },
    {
        "fieldname": "address_type",
        "label": "Address Type",
        "fieldtype": "text",
        "mandatory": true,
        "value": ""
    },
    {
        "fieldname": "country",
        "label": "Country",
        "fieldtype": "select",
        "options": countries,
        "mandatory": true,
        "value": ""
    },
    {
        "fieldname": "state",
        "label": "State / Province / Region",
        "fieldtype": "text",
        "mandatory": true,
        "value": ""
    },
    {
        "fieldname": "city",
        "label": "City",
        "fieldtype": "text",
        "mandatory": true,
        "value": ""
    },

    {
        "fieldname": "address_line_1",
        "label": "Street address",
        "placeholder": "Apartment, suite, unit, building, floor, etc.",
        "fieldtype": "text",
        "mandatory": true,
        "value": ""
    },
    {
        "fieldname": "default",
        "label": "Default Address",
        "fieldtype": "checkbox",
        "mandatory": true,
        "value": ""
    },
];


const AddAddress = () => {
    const [addAddressApi, apiResponse] = useAddUserAddressMutation();
    const handleAddressSubmit = (e) => {
        const formDataObj = new FormData(e.target);
        const addressObject = {}
        for (const [key, value] of formDataObj.entries()) {
            try {
                addressObject[key] = JSON.parse(value)
            } catch (error) {

                addressObject[key] = value
            }
        }
        addAddressApi(addressObject)
    }

    const [searchParams] = useSearchParams();
    const urlParams = useParams();
    let navigate = useNavigate();



    useEffect(() => { }, [apiResponse.isSuccess]);


    if (apiResponse.isSuccess) {
        if (searchParams.get("redirect-to")) {
            navigate(searchParams.get("redirect-to"));
        }
        else {
            navigate("/profile/address");
        }
    }
    let pageHeading = urlParams.action === "add" ? "Add New Address" : "Edit";
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => { setPageLoading(apiResponse.isLoading) }, [apiResponse.isLoading]);

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
                        {pageLoading ? <AddressFormSkeleton /> : <>
                            {urlParams.action === "edit" ?
                                <EditAddressForm
                                    searchParams={searchParams}
                                    useGetUserAddressQuery={useGetUserAddressQuery}
                                    addressFormFields={AddressFormFields}
                                    generateForm={generateForm}
                                    HandleEditApi={useUpdateUserAddressMutation}
                                />
                                : <>{generateForm(AddressFormFields, handleAddressSubmit, "Save")}</>}
                        </>}
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
    return (
        <form className="web-form" onSubmit={(e) => handleFormSubmit(e)} >
            <div className="web-form__fields">
                {fields?.map((val, i) => {
                    if (formInputTypes.includes(val.fieldtype)) {
                        return <FormInput key={i} data={val} />;
                    }

                    if (val.fieldtype === "select") {
                        return <FormSelect key={i} data={val} />;
                    }
                    if (val.fieldtype === "checkbox") {
                        return <Checkbox key={i} data={val} />;
                    }
                })}
            </div>
            <div>
                <button type="submit" className="btn btn-sm btn-primary" >{btnLabel || "Submit"}</button>
            </div>
        </form>
    );
}

const EditAddressForm = ({ searchParams, useGetUserAddressQuery, addressFormFields, generateForm, HandleEditApi }) => {
    const addressId = searchParams.get("id")
    const { data, isLoading } = useGetUserAddressQuery({ id: addressId });
    const [FormFields, setFormFields] = useState(addressFormFields.map(field => ({ ...field })))
    const [editAddressApi, apiResponse] = HandleEditApi();
    const navigate = useNavigate();
    const [formLoading, setFormLoading] = useState(isLoading)

    const HandleEdit = (e) => {
        const formDataObj = new FormData(e.target)

        const addressObject = {}
        for (const [key, value] of formDataObj.entries()) {
            try {
                addressObject[key] = JSON.parse(value)
            } catch (error) {
                addressObject[key] = value

            }

        }

        const reqBody = {
            address_object: addressObject,
            id: addressId,
            action: "edit"
        }


        console.log(addressObject)
        editAddressApi(reqBody)
    };

    useEffect(() => { setFormLoading(isLoading) }, [isLoading])

    useEffect(() => {
        if (apiResponse.isLoading) {
            setFormLoading(apiResponse.isLoading)
        }
        if (apiResponse.isSuccess) {
            navigate("/profile/address")
            toast.success("Address updated")
        }


    }, [apiResponse.isSuccess, apiResponse.isLoading])

    useEffect(() => {
        if (data) {
            const updatedFields = FormFields.map(val => {
                if (Object.keys(data).includes(val.fieldname)) {
                    return { ...val, value: data[val.fieldname] };
                }
                return val;
            });
            setFormFields(updatedFields);
        }
    }, [data]);

    return (
        <>
            {formLoading ? <AddressFormSkeleton /> :
                generateForm(FormFields, HandleEdit, "Save")}
        </>
    );
};

const AddressFormSkeleton = () => {
    return (
        <div>
            <div className="web-form__fields">
                {AddressFormFields.map((val, i) => (<div key={i}>
                    <Skeleton />
                    <Skeleton height={36} />
                </div>))}
            </div>
            <br />
            <Skeleton height={32} />
        </div>

    )
}
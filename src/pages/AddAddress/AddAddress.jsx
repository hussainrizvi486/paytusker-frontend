
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
    return (
        <div>
            <Header />
            {/* <Navbar title={"Address"}/> */}
            <div className="sidebar-page ">
                <UserSidebar />
                <div className="sidebar-page__content address-page">
                    <div className="heading-md">Add New Address</div>


                    <div className="address-form__fields">
                        {
                            addAddressFields.map((val, i) =>
                                <div className="input-box" key={i}>
                                    <div className="input-box__label">{val.label}</div>
                                    <div className="input-box__input">
                                        <input type={val.fieldtype} placeholder={val.label} name={val.fieldname}
                                            className={val.fieldtype === "checkbox" ? "checkbox.style-b" : ""}
                                        />
                                    </div>
                                </div>
                                
                            )
                        }

                    </div>
                    {/* <div className="add-addr-container">
                        <div className="flex-center h-100">
                            <button className="btn btn-icon add-address__btn">
                                <Plus /> <span>Add New Address</span>
                            </button>
                        </div>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default AddAddress
import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, UserSidebar } from "../../layouts"
import { useGetUserAddressQuery } from "../../features/api/api"

const Address = () => {
    const { data } = useGetUserAddressQuery()

    return (
        <div>
            <Header />
            <div className="sidebar-page ">
                <UserSidebar />
                <div className="sidebar-page__content address-page">
                    <div className="heading-md">Address Book</div>
                    {data ? <div className="address-cards-container">
                        {data.map((val, idx) => <AddressCard key={idx} data={val} />)}
                    </div>

                        : <div className="add-addr-container">
                            <div className="flex-center h-100">
                                <button className="btn btn-icon add-address__btn">
                                    <Plus /> <span>Add New Address</span>
                                </button>
                            </div>
                        </div>}
                </div>

            </div>
        </div >

    )
}

export default Address


const AddressCard = ({ data }) => {
    return (
        <div className="address-card__wrapper">
            <div className="address-card__title">
                {data?.address_title}
            </div>
            <div className="address-card__tags">
                {/* <div className="tag-sm">
                    Default Address
                </div> */}
            </div>
            <div className="text-sm">
                {data.city}, {data.country}
            </div>

            <div className="address-card__info text-sm" >
                {data?.address_line_1} {data?.address_line_2}
            </div>
            <div className="text-sm">
                Street No: {data?.street_no}
            </div>
        </div>
    )
}

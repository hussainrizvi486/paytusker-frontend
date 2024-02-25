import { Header, UserSidebar } from "../../layouts"
import { useGetUserAddressQuery } from "../../features/api/api"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useCartElementState } from "@stripe/react-stripe-js"
import { useState } from "react"

const Address = () => {
    const [isLoading, setIsloading] = useState(true)
    setTimeout(() => { setIsloading(false) }, 2000)

    // const { data, isLoading } = useGetUserAddressQuery()
    const data = [
        {
            "id": "b5994151-cee2-4fe3-b31d-5cf8c298d89d",
            "address_title": "New Home Address Test",
            "address_type": "Delievery Address",
            "country": "China",
            "state": "Sindh",
            "city": "Karachi",
            "address_line_1": "fdfdfafd",
            "address_line_2": null,
            "post_code": null,
            "street_no": null,
            "user_id": "f1124151-20eb-410e-ae8d-08495787fd4e",
            "creation": "2024-02-23T21:56:03.189611Z",
            "modified": "2024-02-23T21:56:03.270095Z"
        },
        {
            "id": "bfa76c7f-d0d2-457f-8bdc-e5b0e9de4ff4",
            "address_title": "Office Address",
            "address_type": "Delievery Address",
            "country": "China",
            "state": "Sindh",
            "city": "Karachi",
            "address_line_1": "fdfdfdfd",
            "address_line_2": null,
            "post_code": null,
            "street_no": null,
            "user_id": "f1124151-20eb-410e-ae8d-08495787fd4e",
            "creation": "2024-02-23T21:55:44.996426Z",
            "modified": "2024-02-23T21:55:45.077636Z"
        },
        {
            "id": "13",
            "address_title": "Office Address",
            "address_type": "Delievery Address",
            "country": "China",
            "state": "name",
            "city": "Karachi",
            "address_line_1": "House no 304, street no 10",
            "address_line_2": null,
            "post_code": null,
            "street_no": null,
            "user_id": "f1124151-20eb-410e-ae8d-08495787fd4e",
            "creation": "2024-02-23T21:54:08.431014Z",
            "modified": "2024-02-23T21:54:08.695068Z"
        },
        {
            "id": "14",
            "address_title": "Office Address",
            "address_type": "Delievery Address",
            "country": "Pakistan",
            "state": "name",
            "city": "Karachi",
            "address_line_1": "House no 304, street no 10",
            "address_line_2": null,
            "post_code": null,
            "street_no": null,
            "user_id": "f1124151-20eb-410e-ae8d-08495787fd4e",
            "creation": "2024-02-23T21:54:08.431014Z",
            "modified": "2024-02-23T21:54:08.695068Z"
        },
        {
            "id": "15",
            "address_title": "New Home Address",
            "address_type": "Delievery Address",
            "country": "China",
            "state": "Sindh",
            "city": "Karachi",
            "address_line_1": "House no 304, street no 10",
            "address_line_2": null,
            "post_code": null,
            "street_no": null,
            "user_id": "f1124151-20eb-410e-ae8d-08495787fd4e",
            "creation": "2024-02-23T21:54:08.431014Z",
            "modified": "2024-02-23T21:54:08.695068Z"
        }
    ]
    // console.log(data)
    return (
        <div>
            <Header />
            <div className="sidebar-page ">
                <UserSidebar />
                <div className="sidebar-page__content address-page">
                    <div className="heading-md">Address Book</div>
                    <div className="address-cards-container">
                        {isLoading ?
                            <>
                                <AddressCardLoadingSkeleton />
                                <AddressCardLoadingSkeleton />
                                <AddressCardLoadingSkeleton />
                                <AddressCardLoadingSkeleton />
                            </>
                            : data?.map((val, idx) => <AddressCard key={idx} data={val} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}


export const AddressCardLoadingSkeleton = () => {
    return <div className="address-card__wrapper">
        <Skeleton count={4} />
    </div>
}

{/* <div className="add-addr-container">
    <div className="flex-center h-100">
        <button className="btn btn-icon add-address__btn">
            <Plus /> <span>Add New Address</span>
        </button>
    </div>
</div> */}

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
                {data?.address_type}
            </div>

            <div className="text-sm">
                {data.city}, {data.country}
            </div>

            <div className="address-card__info text-sm" >
                {data?.address_line_1}
            </div>
        </div>
    )
}

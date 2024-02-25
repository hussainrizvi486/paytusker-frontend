import { useGetUserAddressQuery } from "../../features/api/api"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Header, UserSidebar } from "../../layouts"


const Address = () => {
    const { data, isLoading } = useGetUserAddressQuery()
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

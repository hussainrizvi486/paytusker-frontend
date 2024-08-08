import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDeleteUserAddressMutation, useGetUserAddressQuery, useUpdateUserAddressMutation } from "../../api";
import { Header, UserSidebar } from "../../layouts";

const Address = () => {
    const { data, isLoading: isFetchingAddress } = useGetUserAddressQuery();
    const [editAddressApi, editAddressApiRes] = useUpdateUserAddressMutation();
    const [removeAddressApi, removeAddressApiRes] = useDeleteUserAddressMutation();
    const [pageLoading, setPageLoading] = useState(false);

    const removeAddress = (id) => {
        if (window.confirm("Are you sure you want to remove this address?")) {
            removeAddressApi({ id: id });
        }
    };

    useEffect(() => {
        if (isFetchingAddress || editAddressApiRes.isLoading) {
            setPageLoading(true);
        } else {
            setPageLoading(false);
        }
    }, [isFetchingAddress, editAddressApiRes.isLoading]);

    return (
        <div>
            <Header />
            <div className="sidebar-page ">
                <UserSidebar />
                <div className="sidebar-page__content address-page">
                    <div className="heading-md">Address Book</div>
                    <div className="address-cards-container">
                        {pageLoading ?
                            <>
                                <AddressCardLoadingSkeleton />
                                <AddressCardLoadingSkeleton />
                                <AddressCardLoadingSkeleton />
                            </>
                            : data?.length === 0 ? <NoAddressComponent />
                                : <>{data?.map((val, idx) => (
                                    <AddressCard key={idx}
                                        data={val}
                                        removeAddress={removeAddress} />
                                ))}

                                    {data?.length < 5 ?
                                        <div className="mt-4">
                                            <Link to={"/profile/address/form/add"}>
                                                <button className="btn btn-sm btn-primary">Add new address</button>
                                            </Link>
                                        </div> : <></>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address;

export const AddressCardLoadingSkeleton = () => {
    return <div className="address-card__wrapper">
        <Skeleton count={4} />
    </div>
}

const AddressCard = ({ data, removeAddress }) => {
    return (
        <div className="address-card__wrapper">
            <div className="flex-align-between">
                <div className="address-card__title">{data?.address_title}</div>
                <div className="flex-align-center gap-1">
                    <Link to={`/profile/address/form/edit?id=${data?.id}`}>
                        <Pencil className="icon-sm cursor-pointer" />
                    </Link>

                    <button className="unset" onClick={() => removeAddress(data?.id)}>
                        <Trash2 className="icon-sm cursor-pointer" />
                    </button>
                </div>
            </div>
            {
                data?.default ? <div className="tag-sm">Default Address</div> : <></>
            }
            <div className="text-sm">
                {data?.address_type}
            </div>
            <div className="text-sm">
                {data.city}, {data.country}
            </div>
            <div className="address-card__info text-sm" >
                {data?.address_line}
            </div>

        </div>
    )
}


const NoAddressComponent = () => {
    return (
        <div className="text-center">
            <div className="mt-6">
                <div>No addresses have been added. Would you like to add a new address?</div>
                <Link to={"/profile/address/form/add"}>
                    <button className="btn btn-primary btn-sm  mt-3">Add Address</button>
                </Link>
            </div>
        </div>
    )
}
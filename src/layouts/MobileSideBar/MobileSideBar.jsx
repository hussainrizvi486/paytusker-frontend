import { useDispatch } from "react-redux";
import { X } from "lucide-react";

import { ToggleMobileSideBar } from "../../redux/slices/appUiSlice";
import { SidebarNavElement } from "../UserSidebar/UserSidebar"
import { getUserDetails } from "../../redux/slices/authSlice";
import { useGetProductCategoriesQuery } from "../../api";
import { useEffect, useState } from "react";



export const MobileSideBar = ({ active }) => {
    const dispatch = useDispatch();
    const userAuthenticated = getUserDetails()[1]
    const productsCategories = useGetProductCategoriesQuery();
    function ToggleSideBar() { dispatch(ToggleMobileSideBar()) }


    let UserSidebarLinks = [
        {
            label: "Paytusker Home", url: "/",
            child_elements: [
                { label: "Login", url: "/login" },
                { label: "Register", url: "/register" }]
        },
    ]

    if (userAuthenticated) {
        UserSidebarLinks = [
            {
                label: "Paytusker Home", url: "/", child_elements: [
                    { label: "Manage Account", url: "/profile" },
                    { label: "Address Book", url: "/profile/address" },
                    { label: "My Orders", url: "/profile/orders/pending" },
                ]
            }
        ]
    }

    const [sideBarLinks, setSideBarLinks] = useState(UserSidebarLinks);

    useEffect(() => {
        if (productsCategories.data?.categories?.physical) {
            const categories = productsCategories.data.categories.physical;
            const childElements = categories.slice(0, 10).map(category => ({
                label: category.name,
                url: "/faqs",
            }));

            setSideBarLinks(prev => [
                ...prev,
                { label: "Top Categories", child_elements: childElements }
            ]);
        }
    }, [productsCategories.data]);


    useEffect(() => { }, [sideBarLinks])


    return (
        <div className={`mobile-sidebar__wrapper ${!active ? "inactive" : "active"}`}>
            <div className="mobile-sidebar">
                <div className="mobile-sidebar__upper-section">
                    <div className="flex-end">
                        <button
                            className="unset"
                            onClick={ToggleSideBar}>
                            <X className="icon-sm" />
                        </button>
                    </div>
                    <div>
                        <div className="mobile-sidebar__heading font-bold text-lg">
                            Welcome !
                        </div>
                    </div>
                </div>
                <br />
                {sideBarLinks?.map((val, i) => (
                    <SidebarNavElement key={i} child_elements={val.child_elements} label={val.label} url={val.url}
                        icon={val.icon}
                    />
                ))}
            </div>
            <div className="mobile-sidebar__backdrop"
                onClick={ToggleSideBar}
                onDrag={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                onScroll={(e) => e.preventDefault()}
            >
            </div>
        </div>

    )
}

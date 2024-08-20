import { useDispatch, useSelector } from "react-redux";
import { MessageCircle, ScrollText, Sidebar, User, X } from "lucide-react";

import { ToggleMobileSideBar } from "../../redux/slices/appUiSlice";
import { SidebarNavElement } from "../UserSidebar/UserSidebar"
import { useGetProductCategoriesQuery } from "../../api";
import { useEffect, useState } from "react";
import { getAuthUser, getUserDetails } from "../../redux/slices/authSlice";



export const MobileSideBar = ({ active }) => {
    const authUser = getUserDetails()[0]
    const roles = getAuthUser().roles
    let currentRole = "customer";

    if (roles.includes("seller")) {
        currentRole = "seller";
    }

    const sidebarLinks = {
        "seller": [
            {
                label: "My Account", url: "/profile", icon: <User />
            },
            {
                label: "Inventory", url: "/",
                icon: <ScrollText />,
                child_elements: [
                    { label: "My Products", url: "/seller/product/list" },
                    { label: "My Orders", url: "/seller/product/list" },
                ]
            },
        ],
        "customer": [
            {
                label: "My Account", url: "/profile", icon: <User />, child_elements: [
                    { label: "Manage Account", url: "/profile" },
                    { label: "Address Book", url: "/profile/address" },
                    // { label: "Add Address", url: "/profile/address/form/add" },
                ]
            },
            {
                label: "My Orders", url: "/profile/orders/all", icon: <ScrollText />,
                child_elements: [
                    { label: "Pending Orders", url: "/profile/orders/pending" },
                    { label: "Orders History", url: "/profile/orders/all" },
                ]
            },
            {
                label: "My Reviews", url: "/profile/reviews/list", icon: <MessageCircle />,
                child_elements: [
                    { label: "To Review", url: "/profile/reviews/history", },
                    { label: "View Reviews", url: "/profile/reviews/list", },
                ]
            },
        ]
    }

    const [sideBarLinks, setSideBarLinks] = useState([
        {
            label: "Paytusker Home", url: "/",
            child_elements: [
                { label: "Login", url: "/login" },
                { label: "Register", url: "/register" }]
        },
    ]);

    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const productsCategories = useGetProductCategoriesQuery();

    function ToggleSideBar() { dispatch(ToggleMobileSideBar()) }

    function appendCategories(data) {
        const categories = data
        const childElements = categories?.slice(0, 10).map(category => ({
            label: category.name,
            url: `/search?category=${category.id}`,
        }));

        setSideBarLinks(prev => [
            ...prev,
            { label: "Top Categories", child_elements: childElements }
        ]);
    }


    useEffect(() => {
        if (isAuthenticated) {
            setSideBarLinks(sidebarLinks[currentRole]);
        }
        const categories = productsCategories.data?.categories?.physical
        if (categories) {
            appendCategories(categories)
        }
    }, [isAuthenticated, productsCategories.data])




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

import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";

import { ToggleMobileSideBar } from "../../redux/slices/appUiSlice";
import { SidebarNavElement } from "../UserSidebar/UserSidebar"
import { useGetProductCategoriesQuery } from "../../api";
import { useEffect, useState } from "react";



export const MobileSideBar = ({ active }) => {
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
            setSideBarLinks([
                {
                    label: "Paytusker Home", url: "/", child_elements: [
                        { label: "Manage Account", url: "/profile" },
                        { label: "Address Book", url: "/profile/address" },
                        { label: "My Orders", url: "/profile/orders/pending" },
                    ]
                }
            ])


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

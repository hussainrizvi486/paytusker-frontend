import { useDispatch } from "react-redux";
import { ToggleMobileSideBar } from "../../redux/slices/appUiSlice";
import { SidebarNavElement } from "../UserSidebar/UserSidebar"
import { X } from "lucide-react";


export const MobileSideBar = ({ active }) => {
    const dispatch = useDispatch()
    function ToggleSideBar() { dispatch(ToggleMobileSideBar()) }
    const authenticatedSidebarLinks = [
        {
            label: "Home", url: "/",
        },
        {
            label: "My Account", url: "/profile", child_elements: [
                { label: "Manage Account", url: "/profile", },
                { label: "Address Book", url: "/profile/address", },
                { label: "Add Address", url: "/profile/address/add", },
                { label: "Vouchers", url: "/profile", },
            ]
        },
        {
            label: "My Orders", url: "/profile/orders",
            child_elements: [
                { label: "Pending Orders", url: "/profile/orders", },
                { label: "Orders History", url: "/profile/orders", },
            ]
        },
        {
            label: "My Reviews", url: "/profile/reviews",
        },
    ]
    const sideBarStyle = {
        display: "block"
    }
    if (!active) {
        sideBarStyle["display"] = "none"
    }

    return (
        <div className={`mobile-sidebar ${!active ? "inactive" : "active"}`} >
            <div className="mobile-sidebar__upper-section">
                <div className="flex-end">
                    <button
                        className="unset"
                        onClick={ToggleSideBar}>
                        <X  className="icon-sm"/>
                    </button>
                </div>
                <div>
                    <div className="mobile-sidebar__heading font-bold text-lg">
                        Welcome !
                    </div>
                </div>
            </div>
            <br />

            {authenticatedSidebarLinks.map((val, i) => (
                <SidebarNavElement key={i} child_elements={val.child_elements} label={val.label} url={val.url}
                    icon={val.icon}
                />
            ))}
        </div>
    )
}

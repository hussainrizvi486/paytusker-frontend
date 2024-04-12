import { useDispatch } from "react-redux";
import { ToggleMobileSideBar } from "../../redux/slices/appUiSlice";
import { SidebarNavElement } from "../UserSidebar/UserSidebar"
import { X } from "lucide-react";
import { getUserDetails } from "../../redux/slices/authSlice";


export const MobileSideBar = ({ active }) => {
    const dispatch = useDispatch()
    function ToggleSideBar() { dispatch(ToggleMobileSideBar()) }

    const authenticatedSidebarLinks = [
        {
            label: "Home", url: "/",
        },
        {
            label: "My Account", url: "/profile", child_elements: [
                { label: "Manage Account", url: "/profile" },
                { label: "Address Book", url: "/profile/address" },
                { label: "Add Address", url: "/profile/address/form/add" },
                // { label: "Vouchers", url: "/profile", },
            ]
        },
        {
            label: "My Orders", url: "/profile/orders",
            child_elements: [
                { label: "Pending Orders", url: "/profile/orders" },
                { label: "Orders History", url: "/profile/orders" },
            ]
        },
        {
            label: "My Reviews", url: "/profile/reviews",
        },
    ]
    const unAuthenticatedSidebarLinks = [
        {
            label: "Paytusker Home", url: "/"
            // , icon: <Home />
        },
        {
            label: "Follow Us",
            child_elements: [
                { label: "Twitter", url: "https://mobile.twitter.com/paytusker" },
                { label: "Facebook", url: "https://m.facebook.com/#!/TuPublish/?tsid=0.584001426281142&source=result" },
                { label: "LinkedIn", url: "https://www.linkedin.com/company/tupublish/" },
                { label: "YouTube", url: "https://youtube.com/channel/UCgIsSYLJzBLOl5yRhDlwPaQ" },
                { label: "Discord", url: "https://discord.gg/TV3M28nD" }
            ]
        },
        {
            label: "About",
            child_elements: [
                { label: "FAQs", url: "/faqs" },
                { label: "Privacy Policy", url: "/privacy" },
                { label: "Term & Conditions", url: "/privacy" },
            ]
        },

    ]

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
                {
                    getUserDetails()[1] ?
                        authenticatedSidebarLinks.map((val, i) => (
                            <SidebarNavElement key={i} child_elements={val.child_elements} label={val.label} url={val.url}
                                icon={val.icon}
                            />
                        )) : <>{
                            unAuthenticatedSidebarLinks.map((val, i) => (
                                <SidebarNavElement key={i} child_elements={val.child_elements} label={val.label} url={val.url}
                                    icon={val.icon}
                                />
                            ))
                        }</>}
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

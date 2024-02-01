/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ScrollText, MapPinned, UserCog } from "lucide-react";
import { getUserDetails } from "../../redux/slices/authSlice";
// import { BookUse }

export const UserSidebar = () => {
    const authUser = getUserDetails()[0]
    console.log()
    const sidebarLinks = [
        { label: "My Account", url: "/profile", icon: <UserCog /> },
        { label: "Address Book", url: "/profile/address", icon: <MapPinned /> },
        { label: "My Orders", url: "/profile/orders", icon: <ScrollText /> },
        { label: "My Reviews", url: "/" },
        { label: "My Whislist", url: "/" }
    ]

    return (
        <div className="user-sidebar">

            <div className="sidebar-heading">
                Hello {authUser.username}
            </div>

            <nav className="sidebar-nav">
                <div className="sidebar-nav-elements">
                    {sidebarLinks.map((val, id) => (
                        <SidebarNavElement key={id} url={val.url} label={val.label} icon={val.icon} />
                    ))}
                </div>
            </nav>

        </div >
    )
}

export default UserSidebar

const SidebarNavElement = ({ url, label, icon }) => {
    return (
        <div className={window.location.pathname === url ? "sidebar-nav-el__wrapper active" : "sidebar-nav-el__wrapper"}>
            <Link to={url} className="sidebar-nav-el">
                {/* <div className="sidebar-nav-icon">
                    {icon}
                </div> */}
                <div className="sidebar-nav-label">
                    {label}
                </div>
            </Link>
        </div>
    )
}
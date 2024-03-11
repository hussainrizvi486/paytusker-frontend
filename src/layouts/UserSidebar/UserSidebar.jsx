import { Link } from "react-router-dom";
import { ScrollText, User, MessageCircle } from "lucide-react";
import { getUserDetails } from "../../redux/slices/authSlice";


export const UserSidebar = () => {
    const authUser = getUserDetails()[0]
    const sidebarLinks = [

        {
            label: "My Account", url: "/profile", icon: <User />, child_elements: [
                { label: "Manage Account", url: "/profile", },
                { label: "Address Book", url: "/profile/address", },
                { label: "Add Address", url: "/profile/address/form/add", },
                { label: "Vouchers", url: "/profile/vourchers", },
            ]
        },
        {
            label: "My Orders", url: "/profile/orders", icon: <ScrollText />,
            child_elements: [
                { label: "Pending Orders", url: "/profile/orders", },
                { label: "Orders History", url: "/profile/orders", },
            ]
        },
        {
            label: "My Reviews", url: "/profile/reviews", icon: <MessageCircle />,
            child_elements: [
                { label: "Add Review", url: "/profile/reviews/add", },
                { label: "View Reviews", url: "/profile/reviews/list", },
            ]
        },
    ]


    return (
        <div className="user-sidebar">
            <div className="profile-card">
                <div className="profile-card__img">
                    <img src="https://cdn-icons-png.flaticon.com/512/7710/7710521.png" alt="" />
                </div>
                <div className="profile-card__content">
                    <div className="sidebar-heading">
                        {authUser?.username || ""}
                    </div>
                </div>
            </div>


            <nav className="sidebar-nav">
                <div className="sidebar-nav-elements">
                    {sidebarLinks.map((val, id) => (
                        <SidebarNavElement key={id} url={val.url} label={val.label} icon={val.icon}
                            child_elements={val.child_elements}
                        />
                    ))}
                </div>
            </nav>

        </div>
    )
}

export default UserSidebar

export const SidebarNavElement = ({ url, label, child_elements, icon }) => {
    return (
        <div className="sidebar-nav-el__wrapper">
            <Link to={url} className="sidebar-nav-el">
                {icon ? <div className="sidebar-nav-icon">{icon}</div> : <></>}
                <div className="sidebar-nav__label-main">
                    {label}
                </div>

            </Link>
            {
                child_elements ? <div className="sidebar-child__elements-wrapper">
                    {
                        child_elements.map((val, i) => (
                            <div key={i} className="sidebar-child__element">
                                <Link
                                    className=""
                                    to={val.url}
                                >{val.label}</Link>
                            </div>
                        ))
                    }</div>
                    : <></>}
        </div >
    )
}
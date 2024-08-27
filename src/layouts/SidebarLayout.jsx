import { Outlet } from "react-router-dom"
import UserSidebar from "./UserSidebar/UserSidebar"
import { Header } from "./Header/Header"
import { getAuthUser } from "../redux/slices/authSlice"

export const SidebarLayout = ({ header = <Header /> }) => {
    const { roles } = getAuthUser()
    return (
        <>
            {header}
            <main className="sidebar-page" >
                <UserSidebar role={roles[0]} />
                <div className="sidebar-page__content">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

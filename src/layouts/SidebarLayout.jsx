import { Outlet } from "react-router-dom"
import UserSidebar from "./UserSidebar/UserSidebar"
import { Header } from "./Header/Header"

export const SidebarLayout = ({ header = <Header /> }) => {
    return (
        <>
            {header}
            <main className="sidebar-page" >
                <UserSidebar />
                <div className="sidebar-page__content">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

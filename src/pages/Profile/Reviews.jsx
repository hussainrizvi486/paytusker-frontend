import { Header, UserSidebar } from "../../layouts"

export const PgLayout = () => {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="sidebar-page">
                <UserSidebar />
                <div className="sidebar-page__content">
                </div>
            </div>
        </div>
    )
}

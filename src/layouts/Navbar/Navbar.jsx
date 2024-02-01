/* eslint-disable react/prop-types */
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export const Navbar = ({ title }) => {
    return (
        <header className="header-simple">
            <section>
                <Link to={"/"}>
                    <ArrowLeft />
                </Link>
            </section>
            <section>
                <div className="plain-header__heading">{title}</div>
            </section>
            <section></section>
        </header>
    )
}

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

export const DropDown = ({ label = "", options = [], children }) => {
    const menuRef = useRef();
    const [active, setActive] = useState(false);


    const ToggleMenu = () => {
        setActive(prev => !prev)


    }
    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setActive(false)
            }
        })
    }, [])


    return (
        <div className="dropdown-container" ref={menuRef}>
            <div className="dropdown-label"
                onClick={ToggleMenu}
            > {children || label}</div>
            <div className={`dropdown-container__detail-wrapper ${active ? "" : "hide"}`}>
                {options.map((val, i) => (
                    <div key={i}>
                        <Link to={val.url}>
                            <div className="dropdown-option__wrapper text-sm">
                                {val.label}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    )
}

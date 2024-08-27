import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";

export const DropDown = ({ label = "", options = [], children }) => {
    const menuRef = useRef();
    const [active, setActive] = useState(false);


    const toggleMenu = useCallback(() => {
        setActive(prev => !prev);
    }, []);

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setActive(false)
            }
        })
    }, [])


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setActive(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-container" ref={menuRef}>
            <div className="dropdown-label"
                onClick={toggleMenu}
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

import { Link } from "lucide-react";

export const ProductLink = ({ id, children }) => {
    return (
        <Link className="unset cursor-pointer" to={`/product/${id}`}>
            {children}
        </Link>
    )
}

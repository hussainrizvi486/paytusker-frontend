import { Link } from "lucide-react";

export const ProductLink = ({ id }) => {
    return (
        <Link className="unset cursor-pointer" to={`/product/${id}`}>
        </Link>
    )
}

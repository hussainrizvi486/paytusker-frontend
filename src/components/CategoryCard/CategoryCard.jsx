import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
let noImage = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"

export const CategoryCard = ({ image, category, id }) => {
    return (
        <Link to={`search?category=${id}`}>
            <div className="category-card">
                <div className="category-card__img">
                    <img src={image || noImage} alt="" />
                </div>
                <div className="category-card__title text-xs">{category}</div>
            </div>
        </Link>
    )
}

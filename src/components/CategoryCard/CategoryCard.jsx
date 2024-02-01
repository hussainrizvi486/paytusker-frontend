/* eslint-disable react/prop-types */
let noImage = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"

export const CategoryCard = ({ image, category }) => {
    return (
        <div className="category-card">
            <div className="category-card__img">
                <img src={image || noImage} alt="" />
            </div>
            <div className="category-card__title">{category}</div>
        </div>
    )
}

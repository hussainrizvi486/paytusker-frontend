/* eslint-disable react/prop-types */
import { Star } from "lucide-react"

export const Rating = ({ rating }) => {
    const Rating = Math.round(rating)
    const ratings = [1, 2, 3, 4, 5]
    return (
        <div className="rating-row">
            {
                ratings.map((index) => (<Star key={index} className={`rating-star ${Rating >= index ? "active" : ""} `} />))
            }
        </div>
    )
}

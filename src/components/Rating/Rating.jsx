/* eslint-disable react/prop-types */
import { Star } from "lucide-react"

export const Rating = ({ rating, varient }) => {

    let InpRating = parseInt(rating || 0)
    const ratings = [1, 2, 3, 4, 5]
    return (
        <div className={`rating-row ${varient}`}>
            {ratings.map((index) => (
                <Star key={index} className={`rating-star ${InpRating >= index ? "active" : ""} `} />
            ))}
        </div>
    )
}

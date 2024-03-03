/* eslint-disable react/prop-types */
import { Star } from "lucide-react"

export const Rating = ({ rating }) => {

    let _rating = parseInt(rating)
    const ratings = [1, 2, 3, 4, 5]
    return (
        <div className="rating-row">
            {
                ratings.map((index) => (<Star key={index} className={`rating-star ${_rating >= index ? "active" : ""} `} />))
            }
        </div>
    )
}

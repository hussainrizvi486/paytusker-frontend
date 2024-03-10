import { Link } from "react-router-dom"
import { Header, UserSidebar } from "../../layouts"
import { Rating } from "../../components"

const Reviews = () => {
    const reviewsData = [{}, {}]
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="sidebar-page">
                <UserSidebar />
                <div className="sidebar-page__content reviews-page">
                    <section className="to-reviews">
                        <div className="section-heading">To Review</div>

                        <div>
                            {reviewsData ? <>

                                {
                                    reviewsData.map((val, i) => {
                                        return <ReviewItemCard key={i} />
                                    })
                                }
                            </> : < NoReviewsBox />}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Reviews

const NoReviewsBox = () => {
    return (
        <div className="flex-center no-reviews__box">
            <div>
                <div className="mb-2 font-medium">There’s no item to review</div>
                <div className="flex-center">
                    <Link to={"/"}>
                        <button className="btn btn-sm btn-primary">Back To Home</button>
                    </Link>
                </div>
            </div>

        </div>)
}

const ReviewItemCard = ({ data }) => {
    return (
        <div className="reviewData-card">
            <div className="reviewData-card__item-cd">
                <div>
                    <img src="https://m.media-amazon.com/images/I/71SkJtrgIML._SL1500_.jpg" alt="" />
                </div>
                <div className="font-medium">Heat Sink Thermal Paste HY-510 FOR PROCESSORS</div>
            </div>

            <div className="my-2 text-sm">
                <div>
                    <span className="font-medium">Order ID: </span>
                    <span>0432354ACA</span>
                </div>
                <div>
                    <span className="font-medium">Order Date: </span>
                    <span>Monday, 11 March 2024</span>
                </div>
            </div>

            <div>
                <Rating rating={5} varient={"sm"} />
            </div>

            <div className="text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptatem dignissimos vel fugit exercitationem? Dicta asperiores odio vero veniam deleniti, consectetur neque maxime molestiae ducimus doloribus. Fugit esse minus voluptatum reiciendis, corrupti facilis dolorem impedit doloribus culpa quo placeat maiores.</div>

        </div>
    )
}

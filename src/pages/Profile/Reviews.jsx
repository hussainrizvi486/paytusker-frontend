import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Header, UserSidebar } from "../../layouts"
// import { Rating } from "../../components"
import { useGetUserReviewsQuery } from "../../features/api/api"
import { useEffect, useState } from "react"
import Rating from 'react-rating'
import { Star, TreesIcon } from "lucide-react"
import { FormInputFile } from "../../components"
const Reviews = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState();
    const urlParams = useSearchParams()[0]
    urlParams.get("id")


    if (pageLoading) return <div>Loading ...</div>
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="sidebar-page">
                <UserSidebar />
                <div className="sidebar-page__content reviews-page">
                    {params.action == "list" ?
                        <ReviewsListContainer />
                        : params.action == "add" ?
                            <section>
                                <div className="section-heading">Create Review</div>

                                <div >
                                    <div className="add-reviewForm__product-card">
                                        <div className="add-reviewForm__product-card__img">
                                            <img src="https://crm.paytusker.us/files/IMG_3464.jpeg" alt="" />
                                        </div>
                                        <div className="font-medium">
                                            Cowboy Rider Pet Costume, Funny Dog Costume For Small Medium Dogs & Cats, Pet Clothes
                                        </div>

                                    </div>
                                    <br />

                                    <div className="field-wrapper">
                                        <div className="heading-md">Rating</div>
                                        <div>
                                            <Rating
                                                emptySymbol={<Star className="rating-star" />}
                                                fullSymbol={<Star
                                                    fill="#ffeb3b"
                                                    color="#e5c100"
                                                    className="active rating-star" />
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="field-wrapper">

                                        <div className="heading-md">Add a photo</div>
                                        <div>
                                            <FormInputFile multiple={true} accept="image/*" />
                                            <div>

                                            </div>
                                        </div>

                                    </div>


                                    <div className="field-wrapper">
                                        <div className="heading-md">
                                            Add a writter Review
                                        </div>
                                        <div>
                                            <textarea name="" rows="10"
                                            ></textarea>
                                        </div>

                                    </div>
                                </div>

                                <button className="btn btn-primary btn-sm">Add Review</button>
                            </section>
                            : <></>

                    }
                </div>
            </div>
        </div>
    )
}

export default Reviews


const ReviewsListContainer = () => {
    const GetReviewsApi = useGetUserReviewsQuery();

    const [reviewsData, setReviewsData] = useState(null)
    useEffect(() => {
        if (GetReviewsApi.data) {
            setReviewsData(GetReviewsApi.data)
        }
    }, [GetReviewsApi.data])
    return (
        <section className="to-reviews">
            <div className="section-heading">Your Reviews</div>
            <div>
                {!GetReviewsApi.isLoading && reviewsData ? <>
                    {reviewsData.map((val, i) => {
                        return <ReviewItemCard key={i} data={val} />
                    })}
                </> : !GetReviewsApi.isLoading && !reviewsData ? < NoReviewsBox /> : <></>}
            </div>
        </section>
    )
}

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
            <div className="reviewData-card__item-card">
                <div className="reviewData-card__item-card-imgWrapper">
                    <img src={data?.product_image} alt="" />
                </div>
                <div className="font-medium">{data?.product_name}</div>
            </div>
            <div className="my-2 text-sm">
                <div>
                    <span className="font-medium">Order ID: </span>
                    <span>{data?.order_id}</span>
                </div>
                <div>
                    <span className="font-medium">Order Date: </span>
                    <span>{data?.order_date}</span>
                </div>
            </div>
            <div>
                {/* <Rating rating={data?.rating} varient={"sm"} /> */}
            </div>
            <div className="text-sm mt-3">{data?.review_content}</div>
        </div>
    )
}

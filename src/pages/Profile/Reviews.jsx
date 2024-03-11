import { Link } from "react-router-dom"
import { Header, UserSidebar } from "../../layouts"
import { Rating } from "../../components"
import { useGetUserReviewsQuery } from "../../features/api/api"
import { useEffect, useState } from "react"

const Reviews = () => {
    const GetReviewsApi = useGetUserReviewsQuery();
    const [pageLoading, setPageLoading] = useState(GetReviewsApi.isLoading);
    const [reviewsData, setReviewsData] = useState(null)


    console.log(GetReviewsApi.data)
    useEffect(() => {
        setPageLoading(GetReviewsApi.isLoading)
    }, [GetReviewsApi.isLoading])

    useEffect(() => {
        if (GetReviewsApi.data) {
            setReviewsData(GetReviewsApi.data)
        }
    }, [GetReviewsApi.data])

    if (pageLoading) <>Loading ...</>
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
                            {!pageLoading && reviewsData ? <>
                                {reviewsData.map((val, i) => {
                                    return <ReviewItemCard key={i} data={val} />
                                })}
                            </> : !pageLoading && !reviewsData ? < NoReviewsBox /> : <></>}
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
                <Rating rating={data?.rating} varient={"sm"} />
            </div>
            <div className="text-sm mt-3">{data?.review_content}</div>
        </div>
    )
}

import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Header, UserSidebar } from "../../layouts"
import { useGetUserReviewsQuery, useToReviewItemsQuery } from "../../features/api/api"
import { useEffect, useRef, useState } from "react"
import Rating from 'react-rating'
import { Star, X } from "lucide-react"
import { FormInputFile } from "../../components"
const Reviews = () => {
    const params = useParams();
    const navigate = useNavigate();

    // if (pageLoading) return <div>Loading ...</div>
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
                            <AddReviewForm />
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

const AddReviewForm = () => {
    const { data } = useToReviewItemsQuery();
    console.log(data)
    const urlParams = useSearchParams()[0];
    urlParams.get("id")
    let currentRating = 0
    const [reviewsImages, setReviewsImages] = useState([]);

    const reviewTextAreaRef = useRef();

    const handleFilesUpload = (e) => {
        const fileArray = Array.from(e.target.files)
        if (fileArray.length > 0) {
            setReviewsImages(fileArray);
            console.log(fileArray)
        }
    }

    const removeFile = (file) => {
        const updatesFiles = reviewsImages.filter((val) => { if (val != file) return val })
        setReviewsImages(updatesFiles)
    }
    const AddReviewApi = () => {


        const payload = {
            id: urlParams.get("id"),
            rating: currentRating,
            review_content: reviewTextAreaRef.current?.value,
            product_id: urlParams.get("product_id"),
            files: reviewsImages
        }
        console.log(payload)
    }
    return (
        <>
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
                                onChange={(v) => currentRating = v}
                            />
                        </div>
                    </div>

                    <div className="field-wrapper">

                        <div className="heading-md">Add a photo</div>
                        <div>
                            <FormInputFile multiple={true} accept="image/*"
                                onChange={(e) => handleFilesUpload(e)}
                            />
                            <div className="review-file__preview-wrapper">
                                {reviewsImages ? reviewsImages.map((file, i) => (
                                    <div key={i} className="addReview-image-wrapper">
                                        <button className="review-file__remove-btn"
                                            onClick={() => removeFile(file)}>
                                            <X className="icon-sm" strokeWidth={2.5} />
                                        </button>
                                        <img src={URL.createObjectURL(file)} />
                                    </div>
                                )) : <></>}
                            </div>
                        </div>

                    </div>

                    <div className="field-wrapper">
                        <div className="heading-md">
                            Add a writter Review
                        </div>
                        <div>
                            <textarea ref={reviewTextAreaRef} rows="10"></textarea>
                        </div>

                    </div>
                </div>

                <button className="btn btn-primary btn-sm" onClick={AddReviewApi}>Add Review</button>
            </section>
        </>
    )
}
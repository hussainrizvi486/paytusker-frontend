import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Header, UserSidebar } from "../../layouts"
import { useAddOrderReviewMutation, useGetOrderReviewsQuery, useGetPendingOrderReviewsQuery } from "../../api"
import { useEffect, useRef, useState } from "react"
import Rating from 'react-rating'
import { Pencil, Star, X } from "lucide-react"
import { FormInputFile } from "../../components"
import { FormatCurreny } from "../../utils"
import Skeleton from "react-loading-skeleton"
import toast from "react-hot-toast"
import { Button } from "../../components/Common/Button"

const Reviews = () => {
    const params = useParams();
    return (
        <div>
            <div>
                <Header />
            </div>

            <div className="sidebar-page">
                <UserSidebar />
                <div className="sidebar-page__content reviews-page">
                    {params.action == "list" ?
                        <ReviewsListContainer /> :
                        params.action == "add" ? <AddReviewForm /> :
                            params.action == "history" ? <ToReviewOrderContainer /> :
                                <></>}
                </div>
            </div>
        </div>
    )
}

export default Reviews

const ToReviewOrderContainer = () => {
    const { data, isLoading, isSuccess } = useGetPendingOrderReviewsQuery();

    const ToReviewCardLoading = () => {
        return (
            <div style={{
                marginBottom: "1rem"
            }}>
                <Skeleton />
                <Skeleton height={100} />
                <Skeleton />
                <Skeleton />
            </div>
        )
    }

    const ToReviewCard = ({ val }) => {
        return (
            <div className="toReview-card">
                <div className="flex-align-between mb-2 toReview-card__upper">
                    <div>
                        <span className="font-medium"> ORDER ID:</span> {val?.order_id}
                    </div>
                    <div>
                        <div className="btn btn-primary btn-icon--sm">
                            <Link to={`/profile/reviews/add?id=${val?.id}&product_id=${val?.product_id}&product_name=${encodeURIComponent(val?.product_name)}&product_image=${encodeURIComponent(val?.product_image)}`}>
                                <Pencil className="icon-sm" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="toReview-card__item-card">
                    <div className="">
                        <img src={val?.product_image} alt="" />
                    </div>
                    <div>
                        <div className="font-medium">
                            {val?.product_name}
                        </div>
                    </div>
                </div>

                <div className="text-sm">
                    <div className="flex gap">
                        <div className="font-medium">
                            Price:
                        </div>
                        <div>
                            {FormatCurreny(val?.rate)}
                        </div>
                    </div>
                    <div className="flex gap">
                        <div className="font-medium">
                            Quantity:
                        </div>
                        <div>
                            {val.qty}
                        </div>
                    </div>
                    <div className="flex gap">
                        <div className="font-medium">
                            Amount:
                        </div>
                        <div>

                            {FormatCurreny(val?.amount)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section>
            <div className="section-heading">
                To Reviews
            </div>

            <div>
                {
                    isLoading ? <>
                        <ToReviewCardLoading />
                        <ToReviewCardLoading />
                        <ToReviewCardLoading />
                    </> :

                        isSuccess && data?.reviews ? data.reviews.map((val, i) => (
                            <ToReviewCard key={i} val={val} />
                        ))
                            : isSuccess && !data?.reviews ? <NoReviewsBox message={"There is no items to reviews"} /> : <></>
                }
            </div>
        </section>

    )
}


const ReviewsListContainer = () => {
    const GetReviewsApi = useGetOrderReviewsQuery();
    const [reviewsData, setReviewsData] = useState(null);


    const ReviewItemCard = ({ data }) => {
        return (
            <div className="reviewData-card">
                <div className="reviewData-card__item-card">
                    <div className="reviewData-card__item-card-imgWrapper">
                        <img src={data?.product_image} alt="" />
                    </div>
                    <div className="font-medium">{data?.product_name}</div>
                </div>
                <div>
                    <Rating
                        emptySymbol={<Star className="rating-star" />}
                        fullSymbol={<Star
                            fill="#ffeb3b"
                            color="#e5c100"
                            className="active rating-star" />
                        }
                        initialRating={data?.rating || 0}
                        readonly={true}

                    />
                    {/* <Rating /> */}
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
                <div className="mt-3">
                    <div className="text-sm font-bold">Review Content</div>
                    <div className="text-sm ">{data?.review_content}</div>
                </div>


                <div className="reviewData-card__item-card-mediaWrapper">
                    {data?.review_media?.map((val, i) => (
                        <div key={i}
                            className="review-card__image-box"
                        ><img src={val} alt="" /></div>
                    ))}
                </div>
            </div>
        )
    }

    const ReviewItemCardLoading = () => {
        return (
            <div className="reviewData-card">
                <Skeleton height={50} />
                <div>
                    <Skeleton />
                    <Skeleton />
                </div>
                <Skeleton height={100} />
            </div>
        )
    }

    useEffect(() => {
        if (GetReviewsApi.data?.reviews) {
            setReviewsData(GetReviewsApi.data?.reviews)
        }
    }, [GetReviewsApi.data])

    return (
        <section className="to-reviews">
            <div className="section-heading">Your Reviews</div>
            {/* <ReviewItemCardLoading /> */}
            <div>
                {GetReviewsApi.isLoading ? <><ReviewItemCardLoading /></> :
                    !GetReviewsApi.isLoading && reviewsData ? <>
                        {reviewsData?.map((val, i) => {
                            return <ReviewItemCard key={i} data={val} />
                        })}
                    </> : !GetReviewsApi.isLoading && !reviewsData ? < NoReviewsBox message={"There’s no item to review"} /> : <></>}
            </div>
        </section>
    )
}


const AddReviewForm = () => {
    const urlParams = useSearchParams()[0];
    const [reviewsMedia, setReviewsMedia] = useState([]);
    const [ratingValue, setRatingValue] = useState(1);
    const reviewTextAreaRef = useRef();
    const [pageLoading, setPageLoading] = useState(false)
    const navigate = useNavigate();
    const [AddAddressApi, AddAddressApiRes] = useAddOrderReviewMutation();

    useEffect(() => {
        setPageLoading(AddAddressApiRes.isLoading)
    }, [AddAddressApiRes.isLoading])


    useEffect(() => {
        if (AddAddressApiRes.isSuccess) {
            navigate("/profile/reviews/list")
        }
    }, [AddAddressApiRes.isSuccess, navigate])

    const handleFilesUpload = (e) => {
        const fileArray = Array.from(e.target.files);
        if (fileArray.length > 0) {
            if (fileArray.length <= 5) {
                setReviewsMedia(fileArray);
            } else {
                toast("Please select up to 5 files.", { icon: "⚠️" });
            }
        }
    }

    const removeFile = (file) => {
        const updatesFiles = reviewsMedia.filter((val) => { if (val != file) return val })
        setReviewsMedia(updatesFiles)
    }

    const AddReviewApi = () => {
        if (!reviewTextAreaRef.current?.value) {
            toast.error("Please fill are required fields")
            return
        }
        const payload = {
            id: urlParams.get("id"),
            rating: ratingValue,
            review_content: reviewTextAreaRef.current?.value,
            product_id: urlParams.get("product_id"),
        }

        const reqBody = new FormData();

        for (let key in payload) {
            reqBody.append(key, payload[key])
        }

        reviewsMedia.forEach((file, i) => {
            reqBody.append(`review_media_${i}`, file)
        })
        // console.log(reqBody.entries())
        AddAddressApi(reqBody)
    }

    return (
        <>
            <section>
                <div className="section-heading">Create Review</div>
                <div >
                    <div className="add-reviewForm__product-card">
                        <div className="add-reviewForm__product-card__img">
                            <img src={urlParams.get("product_image")} />
                        </div>
                        <div className="font-medium">
                            {urlParams.get("product_name")}
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
                                initialRating={ratingValue}

                                onChange={(v) => setRatingValue(v)}
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
                                {reviewsMedia ? reviewsMedia.map((file, i) => (
                                    <div key={i} className="file-review__wrapper">
                                        <button className="file-review__wrapper-btn "
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
                            Add a writter Review <span className="mandatory-flag">*</span>
                        </div>
                        <div>
                            <textarea ref={reviewTextAreaRef} rows="10" placeholder="Write something about product or seller"></textarea>
                        </div>

                    </div>
                </div>

                <Button label={"Add Review"} className="btn-primary btn-sm" btnLoading={pageLoading} onClick={AddReviewApi} />
            </section>
        </>
    )
}

const NoReviewsBox = ({ message }) => {
    return (
        <div className="flex-center no-reviews__box">
            <div>
                <div className="mb-2 font-medium"> {message}</div>
                <div className="flex-center">
                    <Link to={"/"}>
                        <button className="btn btn-sm btn-primary">Back To Home</button>
                    </Link>
                </div>
            </div>

        </div>)
}

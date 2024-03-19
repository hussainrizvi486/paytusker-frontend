/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Star, UserCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { Header } from "../../layouts";
import axios from "axios"
import { API_URL } from "../../redux/store"
import { useParams } from "react-router-dom"
import { Freeze } from "../../components/Loaders/Freeze"
import { useNavigate } from "react-router-dom"
import { FormatCurreny } from "../../utils"
import { useAddToCartMutation } from "../../features/api/api"
import { Rating } from "../../components/Rating/Rating"
import toast from "react-hot-toast";

const Product = () => {
    const [productData, setProductData] = useState()
    const [pageLoading, setPageLoading] = useState(true)
    const navigate = useNavigate();
    const { id } = useParams();
    const [addItemToCart, cartApiResponse] = useAddToCartMutation();

    const getProductDetail = async () => {
        try {
            const req = await axios.get(`${API_URL}api/product/details`, {
                params: {
                    id: id
                }
            })
            if (req.status === 200) {
                console.log(req.data)
                setProductData(req.data)
                setPageLoading(false)
            }

        }
        catch (error) {
            // navigate("/") 
        }
    }

    useEffect(() => { getProductDetail() }, [])

    const addToCart = (product_id) => {
        addItemToCart({ product_id: product_id })
    }

    useEffect(() => {
        if (cartApiResponse.isLoading) {
            setPageLoading(cartApiResponse.isLoading)

        }
        if (cartApiResponse.isSuccess) {
            toast.success("Item successfully added to your cart.")
            setPageLoading(cartApiResponse.isLoading)
        }
    }, [cartApiResponse.isLoading, cartApiResponse.isSuccess])

    if (pageLoading) return <Freeze />
    return (
        <>
            <Header />
            <main className="product-page_main">
                <section className="product-page__display-section">
                    <section className="product-media__section">
                        <ProductMediaCarousel slides={productData?.images} />
                    </section>

                    <section className="product-info__details">
                        <div className="product-info__details-wrapper">
                            <div className="product-name">
                                {productData?.product_name}
                            </div>
                            <div className="product-category">
                                {productData?.category || ""}
                            </div>
                            <div className="product-price" >
                                {productData.formatted_price}
                                {/* {FormatCurreny(productData?.product_price)} */}
                            </div>


                            <div className="product-rating-wrapper">
                                <Rating rating={productData?.rating || 0} />
                                <div className="font-bold">{parseInt(productData?.rating || 0).toFixed(1)}</div>
                            </div>


                        </div>

                        <div className="product-page__actions">
                            <button className="btn btn-primary btn-sm" onClick={() => addToCart(productData?.id)}>Add to Cart</button>
                        </div>

                    </section>

                    <section className="product-seller__details">
                        <div className="flex-end">
                            <div className="verified-seller-tag">
                                <BadgeCheck /> <span>Verified</span></div>
                        </div>

                        <div className="seller-details__wrapper">
                            <div className="text-xs">Sold By</div>
                            <div className="text-md font-bold">Paytusker LLC</div>
                        </div>

                        <div className="product-seller-rating__wrapper">
                            <div>
                                Seller rating
                            </div>

                            <div className="">
                                <div className="font-bold text-lg">
                                    5/5
                                </div>
                            </div>
                        </div>

                    </section>
                </section>

                <div className="product-page__description-section">
                    <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>Description</div>
                    <br />

                    <div dangerouslySetInnerHTML={{ __html: productData?.description || "" }}>
                    </div>
                </div>


                {
                    productData?.reviews ?
                        <section className="product-reviews">
                            <div className="section-heading">Top Cusomer reviews</div>
                            <div>
                                {productData?.reviews?.map((val, i) =>
                                    <ReviewCard key={i} data={val} />
                                )}
                            </div>
                        </section> : <></>
                }
            </main>
        </>
    )
}

export default Product


const ReviewCard = ({ data }) => {
    const noImage = "https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif"

    return (
        <div className="product-review-card">
            <div className="review-card__upper">
                <div className="review-card__upper-sec-1">
                    <div className="review-card__profile-img">
                        <img src={data.customer_image || noImage} />
                    </div>
                    <div className="">
                        {data?.customer_name}
                    </div>
                </div>

                <Rating rating={data?.rating || 0} />
                <br />

            </div>

            <div className="review-card__lower">
                {data?.review_content}
            </div>
        </div>
    )
}

const ProductMediaCarousel = ({ slides = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = slides?.length || 0
    let hide = ""
    let navHide = ""
    if (totalSlides === 0 || totalSlides === 1) {
        navHide = "hide";
        hide = "hide";
    }

    if (totalSlides < 7) {
        navHide = "hide"
    }

    const [navigationIndex, setNavigationIndex] = useState(0);

    const moveNavigation = (action) => {

        if (action == "next") {
            if (navigationIndex < (slides.length * 60) - 340) {
                setNavigationIndex(prev => prev + 340)
            }
            else {
                setNavigationIndex(0)
            }
        }
        else if (action == "prev") {
            console.log(navigationIndex)
            if (navigationIndex >= 340) {
                setNavigationIndex((prev) => prev - 340)
            }
            else {
                setNavigationIndex(slides.length * 60)
            }
        }
    }

    const moveSlide = (action) => {
        if (action === "next") {
            activeIndex < (slides.length - 1) ? setActiveIndex((prev) => prev + 1) : setActiveIndex(0)

        } else {
            activeIndex === 0 ? setActiveIndex(slides.length - 1) : setActiveIndex((prev) => prev - 1)
        }
    }


    return (
        <div className="productMedia-carousel__wrapper">
            <div className="carousel-container">
                <button className={`carousel-btn carousel-btn--left ${hide}`} onClick={() => moveSlide("prev")}>
                    <ArrowLeft />
                </button>

                <div className="carousel-body">
                    <div className="carousel-slides__container" style={{ transform: `translateX(-${100 * activeIndex}%)` }}>

                        {slides ? slides.map((slide, index) =>
                            <div className="carousel-slide" key={index} >
                                <img src={slide} alt="" />
                            </div>
                        ) : <></>}

                    </div>
                </div>
                <button className={`carousel-btn carousel-btn--right ${hide}`} onClick={() => moveSlide("next")}>
                    <ArrowRight />
                </button>
            </div>
            <div className="carousel-slides__navgiation-wrapper">
                <div className="carousel-slides__nav-elements__wrapper">
                    <div className="carousel-slides__nav-elements__container"
                        style={{ transform: `translateX(-${navigationIndex}px)` }}
                    >
                        {slides ? slides.map((slide, index) =>
                            <div className={`carousel-slides__nav-element ${activeIndex === index ? "active" : ""}`} key={index}
                                onClick={() => setActiveIndex(index)}
                            >
                                <img src={slide} alt="" />
                            </div>
                        ) : <></>}
                    </div>
                </div>

                <button className={`media-carousel__nav-btn media-carousel__nav-btn--left ${navHide}`} onClick={() => moveNavigation("prev")}>
                    <ChevronLeft />
                </button>
                <button className={`media-carousel__nav-btn media-carousel__nav-btn--right ${navHide}`} onClick={() => moveNavigation("next")}>
                    <ChevronRight />
                </button>

            </div>
        </div>
    )
}




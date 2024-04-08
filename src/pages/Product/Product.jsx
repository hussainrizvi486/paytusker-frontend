import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, } from "lucide-react";
import axios from "axios"
import toast from "react-hot-toast";
import { API_URL } from "../../redux/store";
import { Header } from "../../layouts";
import { Button, Freeze, Rating } from "../../components";
import { useAddItemToCartMutation } from "../../api";
import { getUserDetails } from "../../redux/slices/authSlice";

const Product = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);

    let LoadingMessage = "Loading..."
    const { id } = useParams();
    const [addItemToCart, cartApiResponse] = useAddItemToCartMutation();

    const getProductDetail = async () => {
        setPageLoading(true)
        try {
            const req = await axios.get(`${API_URL}api/product/details`, {
                params: {
                    id: id
                }
            })
            if (req.status === 200) {
                setProductData(req.data);
                setPageLoading(false);
            }
        }
        catch (error) { console.error(error) }
    }

    useEffect(() => { getProductDetail() }, [id])


    const addToCart = (product_id) => {
        if (!getUserDetails()[1]) {
            navigate(`/login?redirect_to=/product/${product_id}`)
        }
        addItemToCart({ product_id: product_id })
    }

    useEffect(() => {
        if (cartApiResponse.isSuccess) {
            toast.success("Item successfully added to your cart.")
            setPageLoading(cartApiResponse.isLoading)
        }
    }, [cartApiResponse.isLoading, cartApiResponse.isSuccess])

    if (pageLoading) return <Freeze

        message={LoadingMessage}
        backdropStyle={{
            "backgroundColor": "#ffffff7a"
        }

        }
    />

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
                            </div>
                            <div className="product-rating-wrapper">
                                <Rating rating={productData?.rating || 0} />
                                <div className="font-bold">{parseInt(productData?.rating || 0).toFixed(1)}</div>
                            </div>
                            {productData.product_varients ?
                                <>
                                    <br />
                                    <br />
                                    <div className="text-sm font-medium">Select Options</div>
                                    <div className="product-variants__wrapper">
                                        {productData.product_varients.map((val, index) => (
                                            <ProductVariantBox data={val} key={index} />
                                        ))}
                                    </div>
                                </>
                                : <></>}
                            {productData?.variants_attributes && productData?.variants_attributes?.length > 0 ? <div>
                                <div className="mt-5 mb-2 font-bold">Product Details</div>
                                <div>
                                    {productData?.variants_attributes?.map((val, i) => (
                                        <div key={i} className="text-sm">
                                            <span className="font-medium">{val.attribute}: </span> <span>{val.attribute_value}</span>
                                        </div>
                                    ))}
                                </div>

                            </div> : <></>}
                        </div>

                        <div className="product-page__actions">
                            <Button
                                btnLoading={cartApiResponse.isLoading}
                                onClick={() => addToCart(productData?.id)}
                                className="btn btn-primary btn-sm"
                                label="Add to cart"
                            />
                            {/* <button

                            >Add to Cart</button> */}
                        </div>
                    </section>

                    <section className="product-seller__details">
                        <div className="flex-end">
                            <div className="verified-seller-tag">
                                <BadgeCheck /> <span>Verified</span>
                            </div>
                        </div>

                        <div className="seller-details__wrapper">
                            <div className="text-xs">Sold By</div>
                            <div className="text-md font-bold">Paytusker LLC</div>
                        </div>

                        <div className="product-seller-rating__wrapper">
                            <div>Seller rating</div>
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

                    <div
                        dangerouslySetInnerHTML={{ __html: productData?.description || "" }}
                    >
                    </div>
                </div>


                {
                    productData?.product_reviews.length > 0 ?
                        <section className="product-reviews">
                            <div className="section-heading">Top Cusomer reviews</div>
                            <div>
                                {productData?.product_reviews?.map((val, i) =>
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

const ProductVariantBox = ({ data }) => {
    const { id } = useParams();
    return (
        <div className={`product-variant-box ${id === data.id ? "active" : ""}`}>
            <Link to={`/product/${data.id}`}>
                <img src={data?.cover_image} alt="" />
            </Link>
        </div>
    )
}


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


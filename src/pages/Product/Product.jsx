/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight, BadgeCheck, Star } from "lucide-react"
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

const Product = () => {
    const [productData, setProductData] = useState(null)
    const [productImages, setProductImages] = useState([])
    const [pageLoading, setPageLoading] = useState(true)
    const navigate = useNavigate();
    const { id } = useParams();
    const [addItemToCart] = useAddToCartMutation();

    const getProductDetail = async () => {
        try {
            const req = await axios.get(`${API_URL}api/product/details/${id}`)
            if (req.status === 200) {
                setProductData(req.data)
                setProductImages(req.data.images)
                setPageLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductDetail()
    }, [])

    const addToCart = async (product_id) => {
        setPageLoading(true)
        addItemToCart({ product_id: product_id })
        navigate("/cart")
    }

    if (pageLoading) return <Freeze />
    return (
        <>
            <Header />
            <main className="product-page_main">
                <section className="product-page__display-section">
                    <section className="product-media__section">
                        <Carousel slides={productImages} />
                    </section>

                    <section className="product-info__details">
                        <div className="product-info__details-wrapper">
                            <div className="product-name">
                                {productData?.product_name}
                            </div>
                            <div className="product-category">
                                {productData?.category || "Test Category"}
                            </div>
                            <div className="product-price" >
                                {FormatCurreny(productData?.price)}
                            </div>


                            <div className="product-rating-wrapper">
                                <Rating rating={productData?.rating} />
                                <div className="font-bold">4.0</div>
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

                <section className="product-reviews">
                    <div className="section-heading">Top Cusomer reviews</div>
                    <div>
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                        <ReviewCard />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Product


const ReviewCard = () => {
    return (
        <div className="product-review-card">
            <div className="review-card__upper">
                <div className="review-card__upper-sec-1">
                    <div className="review-card__profile-img">
                        <img src="https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif" />
                    </div>
                    <div className="">
                        Customer Name
                    </div>
                </div>

                <div className="rc-rating-row">
                    <Star className="active" />
                    <Star className="active" />
                    <Star className="active" />
                    <Star />
                    <Star />
                </div>
            </div>

            <div className="review-card__lower">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates obcaecati quae, qui quo at corporis optio assumenda harum aliquid aut deserunt quas nobis, quis doloremque quaerat iste velit dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptates obcaecati quae, qui quo at corporis optio assumenda harum aliquid aut deserunt quas nobis, quis doloremque quaerat iste velit dolor?
            </div>
        </div>
    )
}

export const Carousel = ({ slides = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = slides.length
    let hide = ""
    if (totalSlides === 0 || totalSlides === 1) {
        hide = "hide"
    }
    const moveSlide = (action) => {
        if (action === "next") {
            activeIndex < (slides.length - 1) ? setActiveIndex((prev) => prev + 1) : setActiveIndex(0)

        } else {
            activeIndex === 0 ? setActiveIndex(slides.length - 1) : setActiveIndex((prev) => prev - 1)
        }
    }


    return (
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
        </div >
    )
}




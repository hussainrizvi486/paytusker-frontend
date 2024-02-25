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
    const [productData, setProductData] = useState({
        "id": "fedbdb8c-aa25-4eab-b566-233d37e2abe3",
        "creation": "2024-01-23T22:20:05.957937Z",
        "modified": "2024-01-23T22:20:05.957937Z",
        "product_name": "Infant-Toddler Book Display",
        "net_price": 258.7,
        "price": 258.7,
        "description": "Infant-Toddler Book Display",
        "stock": 1,
        "disabled": false,
        "category_id": null,
        "cover_image": "https://crm.paytusker.us/files/wb1858.2.jpg",
        "rating": null,
        "item_type": "001",
        "template_id": null,
        "images": [
            "https://crm.paytusker.us/files/wb1858.2.jpg",
            "https://crm.paytusker.us/files/wb1858.4.jpg",
            "https://crm.paytusker.us/files/wb1858.3.jpg",
            "https://crm.paytusker.us/files/WB1858.1.jpg"
        ],
        "reviews": [
            {
                "id": "99b6d5f8-a328-4a61-88e6-740bda028908",
                "creation": "2024-02-20T22:12:45.324824Z",
                "modified": "2024-02-20T22:12:45.403918Z",
                "rating": 4.0,
                "review_content": "Test Review",
                "customer_id": "318b4639-4bd3-4de1-9d75-c79ca52a4038",
                "order_id": "dfeacb2d-44a9-42c1-a173-bc87548100da",
                "product_id": "fedbdb8c-aa25-4eab-b566-233d37e2abe3",
                "customer_name": "Hussain",
                "user_id": "f1124151-20eb-410e-ae8d-08495787fd4e",
                "customer_image": "/media/images/Binance-0e4c4bfb014e4d9ca8f0b6e11c9db562.png"
            }
        ]
    })
    const [productImages, setProductImages] = useState([
        "https://crm.paytusker.us/files/wb1858.2.jpg",
        "https://crm.paytusker.us/files/wb1858.4.jpg",
        "https://crm.paytusker.us/files/wb1858.3.jpg",
        "https://crm.paytusker.us/files/WB1858.1.jpg"
    ])
    const [pageLoading, setPageLoading] = useState(false)
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
        // getProductDetail()
    }, [])

    const addToCart = async (product_id) => {
        // setPageLoading(true)
        // addItemToCart({ product_id: product_id })
        // navigate("/cart")
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
                        {productData?.reviews.map((val, i) =>
                            <ReviewCard key={i} data={val} />
                        )}
                    </div>
                </section>
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
                        <img src={data?.customer_image ? `:8000${data?.customer_image}` : noImage} />
                    </div>
                    <div className="">
                        {data?.customer_name}
                    </div>
                </div>

                {/* <br /> */}
                <Rating rating={data?.rating} />
                <br />
                {/* <div className="rc-rating-row">
                    <Star className="active" />
                    <Star className="active" />
                    <Star className="active" />
                    <Star />
                    <Star />
                </div> */}
            </div>

            <div className="review-card__lower">
                {data?.review_content}
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




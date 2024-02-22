import { useEffect, useState } from "react";
import { CategoryCard, ProductCard, ProductCardLoader } from "../../components";
import axios from 'axios';
import { Header, MobileSideBar } from "../../layouts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_URL } from "../../redux/store";
import toast from "react-hot-toast";
import { categories } from "../../assets/data";
import Skeleton from "react-loading-skeleton";

const Home = () => {
    const [products, setProducts] = useState([
        {
            "section_heading": "On Sale",
            "products": [
                {
                    "id": "fedbdb8c-aa25-4eab-b566-233d37e2abe3",
                    "product_name": "Infant-Toddler Book Display",
                    "price": 258.7,
                    "cover_image": "https://crm.paytusker.us/files/wb1858.2.jpg",
                    "category": null
                },
                {
                    "id": "fdfd89f1-ba3c-49f9-ba01-556c1cd42e7e",
                    "product_name": "Nature View Live Edge Chair 10H - WB0906",
                    "price": 455,
                    "cover_image": "https://crm.paytusker.us/files/IMG_0551.png",
                    "category": null
                },
                {
                    "id": "fe19fb13-20ce-4fc1-bb74-cb649440b9d2",
                    "product_name": "Dee Ocleppo Galant Classic Shoe",
                    "price": 143,
                    "cover_image": "https://crm.paytusker.us/files/IMG_0587.webp",
                    "category": null
                },
                {
                    "id": "fdaf67be-290c-4dac-817c-7373cc6d8018",
                    "product_name": "Love Moschino Love Moschino Womens Dress W 5 B19 05 M 4055 A34 CREAM WHITE",
                    "price": 91,
                    "cover_image": "https://crm.paytusker.us/files/IMG_0638.webp",
                    "category": null
                }
            ]
        },
        {
            "section_heading": "Recommended for you",
            "products": []
        },
        {
            "section_heading": "Top Rated",
            "products": []
        }
    ])
    const [loading, setLoading] = useState(false)
    const ProductsData = [
        {
            "section_heading": "On Sale",
            "products": []
        },
        {
            "section_heading": "Recommended for you",
            "products": []
        },
        {
            "section_heading": "Top Rated",
            "products": []
        },
    ]

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/get-products`)
            if (response.status == 200) {

                let itemsCount = 0
                let limitStart = 0
                ProductsData.map((row) => {
                    itemsCount += 12
                    row.products = response.data.slice(limitStart, itemsCount)
                    limitStart += 12
                })
                console.log(ProductsData)
                setProducts(ProductsData)
            }

            setLoading(false)
        } catch (error) {
            toast.error("Server Error")
            setLoading(false)
        }
    }


    useEffect(() => {
        // getData()
    }, [])

    const slides = [
        "https://icms-image.slatic.net/images/ims-web/52d77700-a938-4cc0-8aa7-6e7bb428a0ac.jpg",
        "https://icms-image.slatic.net/images/ims-web/cd8d8e75-cbc4-4cb2-bfd9-c39eed09adcc.jpg",
        "https://icms-image.slatic.net/images/ims-web/abaa358e-3c50-4772-a7ff-417ef23ab1e8.png"
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    const moveSlide = (action) => {
        if (action === "next") {
            activeIndex < (slides.length - 1) ? setActiveIndex((prev) => prev + 1) : setActiveIndex(0)

        } else {
            activeIndex === 0 ? setActiveIndex(slides.length - 1) : setActiveIndex((prev) => prev - 1)
        }
    }
    return (
        <>
            <Header />
            <main>

                <section>
                    <div className="slider-container">
                        <button className="slider-btn slider-btn--left"
                            onClick={() => moveSlide("prev")}
                        ><ChevronLeft /></button>
                        <button className="slider-btn slider-btn--right"
                            onClick={() => moveSlide("next")}
                        ><ChevronRight /></button>


                        <div className="slider-body">
                            <div className="slider-slides-container" style={{
                                transform: `translateX(-${100 * activeIndex}%)`
                            }}>
                                {/* {slides?.map((slide, i) => (
                                    <div className="slider-slide flex-center" key={i}>
                                        <img src={slide} alt="" />
                                    </div>
                                ))} */}

                                <div className="slider-slide flex-center">
                                    <span className="font-medium">SLIDE 1</span>
                                </div>
                                <div className="slider-slide flex-center">
                                    <span className="font-medium">SLIDE 2</span>
                                </div>
                                <div className="slider-slide flex-center">
                                    <span className="font-medium">SLIDE 3</span>
                                </div>
                                <div className="slider-slide flex-center">
                                    <span className="font-medium">SLIDE 4</span>
                                </div>
                            </div>
                        </div>

                        <div className="slider-nav">
                            <ul className="slider-nav-elements">
                                {slides?.map((slide, i) => (
                                    <li className={i === activeIndex ? "slider-nav-el dot active" : "slider-nav-el dot"} key={slide}
                                        onClick={() => setActiveIndex(i)}
                                    ></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>



                <section className="home-section">
                    <div className="section-heading">
                        Categories
                    </div>
                    <div className="home-categories-row">
                        {categories.map((val, i) => <CategoryCard key={i}
                            category={val.name}
                            image={val.image}
                        />)}
                    </div>
                </section>

                {loading ? <ProductLoadingGrid /> :
                    products?.map((row, i) => (
                        <section className="home-section" key={i}>
                            <div className="section-heading">{row.section_heading}</div>
                            <div className="home-section-products products-grid">
                                {row.products?.map((val, u) => (<ProductCard product={val} key={u} />))}
                            </div>
                        </section>
                    ))
                }
            </main >
        </>

    )
}

export default Home


const ProductLoadingGrid = ({ product_count = 12 }) => {
    let counts_arr = []
    for (let i = 0; i < product_count; i++) {
        counts_arr.push(i)
    }

    return (
        <div>
            <div className="section-heading">
                <Skeleton count={1} />
            </div>
            <div className="home-section-products products-grid">
                {counts_arr.map((i) => <ProductCardLoader key={i} />)}
            </div>
        </div>
    )
}
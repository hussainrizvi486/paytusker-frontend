import { useEffect, useState } from "react";
import { CategoryCard, Pagination, ProductCard, ProductCardLoader } from "../../components";
import axios from 'axios';
import { Header } from "../../layouts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_URL } from "../../redux/store";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useGetProductCategoriesQuery } from "../../api";


let CachedBannerData = null;

const Home = () => {
    const [products, setProducts] = useState();
    const [digitalProducts, setDigitalProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [bannerImages, setBannerImages] = useState(CachedBannerData);
    const productCategories = useGetProductCategoriesQuery();



    const getBannerImages = async () => {
        const req = await axios.get("https://crm.paytusker.us/api/method/paytusker.apis.get_banner_images")
        if (req.status == 200 && req.data) {
            setBannerImages(req.data.images)
            CachedBannerData = req.data.images
        }
    }
    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}api/product/home`);
            if (response.status === 200) {
                setProducts(response.data?.home_products || []);
                setDigitalProducts(response.data?.digital_products || []);
            }
        } catch (error) {
            toast.error("Server Error");
        } finally { setLoading(false); }
    };



    useEffect(() => {
        if (!CachedBannerData) {
            getBannerImages()
        }
        getData()
    }, [])

    const slides = bannerImages

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

                                {
                                    bannerImages?.map((obj, i) => (
                                        <picture className="slider-slide flex-center" key={i}>
                                            <source media="(min-width: 768px)" srcSet={obj.banner_image_lg} />
                                            <img src={obj.banner_image_sm} />
                                        </picture>
                                    ))
                                }
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



                {loading ? <CategoriesLoadingGrid /> :
                    <section className="home-section">
                        <div className="section-heading">Categories</div>
                        <div className="home-categories-row">
                            {productCategories.data?.categories?.physical?.map((val, i) => <CategoryCard key={i}
                                category={val?.name}
                                image={val?.image}
                                id={val?.id}
                            />)}
                        </div>
                    </section>
                }

                {loading ? (
                    <ProductLoadingGrid />
                ) : (
                    Object.keys(products)?.map((key, i) => (
                        products[key].length > 0 && (
                            <section className="home-section" key={i}>
                                <div className="section-heading">{key}</div>
                                <div className="home-section-products products-grid">
                                    {products[key].map((val, u) => (
                                        <ProductCard product={val} key={u} />
                                    ))}
                                </div>
                            </section>
                        )
                    ))
                )}



                <section className="home-section">
                    <section className="home-section">
                        {loading ? (
                            <CategoriesLoadingGrid />
                        ) :
                            (<><div className="section-heading">
                                Digital Categories
                            </div>
                                <div className="home-categories-row">
                                    {productCategories.data?.categories?.digital?.map((val, i) => <CategoryCard key={i}
                                        category={val?.name}
                                        image={val?.image}
                                        id={val?.id}
                                    />)}
                                </div></>)}

                    </section>
                    <section className="home-section" >
                        <div className="section-heading">Digital Products</div>
                        <div className="home-section-products products-grid">
                            {digitalProducts?.map((val, u) => (
                                <ProductCard product={val} key={u} />
                            ))}
                        </div>
                    </section>
                </section>

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
const CategoriesLoadingGrid = ({ product_count = 10 }) => {
    let counts_arr = []
    for (let i = 0; i < product_count; i++) {
        counts_arr.push(i)
    }

    return (
        <div className="home-section" >
            <br /><br />
            <div className="section-heading">
                <Skeleton count={1} />
            </div>
            <div className="home-categories-row">
                {counts_arr.map((i) => <Skeleton height={128} key={i} />)}
            </div>
            <br /><br />
        </div>
    )
}

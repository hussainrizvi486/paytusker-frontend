import { useEffect, useState } from "react";
import { CategoryCard, Pagination, ProductCard, ProductCardLoader } from "../../components";
import axios from 'axios';
import { Header } from "../../layouts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_URL } from "../../redux/store";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useGetHomeCategoriesQuery } from "../../api";


const Home = () => {
    const [products, setProducts] = useState();
    const [digitalProducts, setDigitalProducts] = useState();
    const homePageCategories = useGetHomeCategoriesQuery();
    const [loading, setLoading] = useState(true)

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
        getData()
    }, [])

    const slides = [
        "https://img.freepik.com/free-vector/red-flat-style-black-friday-sale-banner-template_1017-27735.jpg?w=1380&t=st=1708900725~exp=1708901325~hmac=8a8da6f08487ac3e93faa23b75400fa5f728f28baa6a866f5368c63afb434afa",
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
                                    </div>
                                ))} */}

                                <div className="slider-slide flex-center">
                                    <img src="https://img.freepik.com/free-vector/red-flat-style-black-friday-sale-banner-template_1017-27735.jpg?w=1380&t=st=1708900725~exp=1708901325~hmac=8a8da6f08487ac3e93faa23b75400fa5f728f28baa6a866f5368c63afb434afa" alt="" />
                                </div>
                                <div className="slider-slide flex-center">
                                    <img src="https://img.freepik.com/premium-vector/winter-sale-poster-with-realistic-3d-snowflakes-gift-boxes-blue-backdrop-digital-banner_348818-1483.jpg?w=1800" alt="" />
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



                {loading ? <CategoriesLoadingGrid /> :
                    <section className="home-section">
                        <div className="section-heading">Categories</div>
                        <div className="home-categories-row">
                            {homePageCategories.data?.categories?.phyical?.map((val, i) => <CategoryCard key={i}
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
                                    {homePageCategories.data?.categories?.phyical?.map((val, i) => <CategoryCard key={i}
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
            <>
                {/* <TestPagitaion /> */}
            </>
        </>

    )
}

const TestPagitaion = () => {
    const [currentPage, setCurrentPage] = useState(10);
    const handleCurrentPage = (page) => {
        setCurrentPage(page)
    }
    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1)
    }
    const handlePrevPage = () => {
        setCurrentPage((prev) => prev - 1)
    }

    return (
        <>

            <br />
            <br />
            <br />
            <h1>Test Section</h1>
            <div>
                <Pagination
                    pageCount={20}
                    currentPage={currentPage}
                    setCurrentPage={handleCurrentPage}
                    handleNext={handleNextPage}
                    handlePrev={handlePrevPage}
                />
            </div></>
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

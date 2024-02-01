import { useEffect, useState } from "react";
import { CategoryCard, Freeze, ProductCard } from "../../components";
import axios from 'axios';
import { Header } from "../../layouts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_URL } from "../../redux/store";
import toast from "react-hot-toast";
import { categories } from "../../assets/data";


const Home = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/get-products`)
            if (response.status == 200) {
                setProducts(response.data)
            }

            setLoading(false)
        } catch (error) {
            toast.error("Error")
            console.log(error)
            setLoading(false)
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const slides = [
        "https://icms-image.slatic.net/images/ims-web/52d77700-a938-4cc0-8aa7-6e7bb428a0ac.jpg",
        "https://icms-image.slatic.net/images/ims-web/cd8d8e75-cbc4-4cb2-bfd9-c39eed09adcc.jpg",
        "https://icms-image.slatic.net/images/ims-web/abaa358e-3c50-4772-a7ff-417ef23ab1e8.png"
    ]

    const Loader = <div>Loading</div>
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
                                {slides?.map((slide, i) => (
                                    <div className="slider-slide" key={i}>
                                        <img src={slide} alt="" />
                                    </div>
                                ))}
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


                {loading ? Loader :
                    <section className="home-section">
                        <div className="section-heading">Trending products</div>
                        <div className="home-section-products products-grid">
                            {products?.map((val, u) => <ProductCard
                                product={val}
                                key={u} />)}
                        </div>
                    </section>
                }



            </main>
        </>

    )
}

export default Home
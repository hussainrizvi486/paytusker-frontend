import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

let CachedBannerData = null;
export const HomeCarousel = () => {
    const [bannerImages, setBannerImages] = useState(CachedBannerData);
    const getBannerImages = async () => {
        const req = await axios.get("https://crm.paytusker.us/api/method/paytusker.apis.get_banner_images")
        if (req.status == 200 && req.data) {
            setBannerImages(req.data.images)
            CachedBannerData = req.data.images
        }
    }
    const slides = bannerImages
    const [activeIndex, setActiveIndex] = useState(0)

    const moveSlide = (action) => {
        if (!slides) return

        if (action === "next") {
            activeIndex < (slides.length - 1) ? setActiveIndex((prev) => prev + 1) : setActiveIndex(0)

        } else {
            activeIndex === 0 ? setActiveIndex(slides.length - 1) : setActiveIndex((prev) => prev - 1)
        }
    }
    useEffect(() => {
        if (!CachedBannerData) {
            getBannerImages()
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => { moveSlide("next") }, 3000);
        return () => clearInterval(interval)
    }, [bannerImages, activeIndex])

    return (
        <>
            <div className="slider-container"
            >
                <button className="slider-btn slider-btn--left"
                    onClick={() => moveSlide("prev")}
                ><ChevronLeft /></button>
                <button className="slider-btn slider-btn--right"
                    onClick={() => moveSlide("next")}

                ><ChevronRight /></button>


                <div className="slider-body">
                    <div className="slider-slides-container" style={{ transform: `translateX(-${100 * activeIndex}%)` }}>
                        {bannerImages?.map((obj, i) => (
                            <picture className="slider-slide flex-center" key={i}>
                                <source media="(min-width: 768px)" srcSet={obj.banner_image_lg} />
                                <img src={obj.banner_image_sm} />
                            </picture>
                        ))}
                    </div>
                </div>

                <div className="slider-nav">
                    <ul className="slider-nav-elements">
                        {slides?.map((slide, i) => (
                            <li className={i === activeIndex ? "slider-nav-el dot active" : "slider-nav-el dot"} key={i}
                                onClick={() => setActiveIndex(i)}
                            ></li>
                        ))}
                    </ul>
                </div>
            </div></>
    )
}


import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import axios from 'axios';

import { useGetProductCategoriesQuery } from "../../api";
import { API_URL } from "../../redux/store";
import { Header } from "../../layouts";
import { CategoryCard, HomeCarousel, ProductCard, ProductCardLoader } from "../../components";


const Home = () => {
    const productCategories = useGetProductCategoriesQuery();

    const [products, setProducts] = useState({});
    const [digitalProducts, setDigitalProducts] = useState();
    const [loading, setLoading] = useState(true);


    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}api/product/home`);
            if (response.status === 200) {
                setProducts(response.data?.home_products || {});
                setDigitalProducts(response.data?.digital_products || []);
            }
        } catch (error) {
            toast.error("Server Error");
        } finally { setLoading(false); }
    };


    useEffect(() => { getData() }, [])

    return (
        <>
            <Header />
            <main>
                <section>
                    <HomeCarousel />
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
                    </section>}



                {loading ? (<ProductLoadingGrid />) : (
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
                        {loading ? (<CategoriesLoadingGrid />) :
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

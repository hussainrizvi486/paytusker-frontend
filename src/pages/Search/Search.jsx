import { useSearchParams } from "react-router-dom"
import { Header } from "../../layouts";
import { useEffect } from "react"
import { products } from "../../assets/data"
import { ProductCard } from "../../components"
import { categories } from "../../assets/data"
const Search = () => {
    let [searchParams] = useSearchParams();
    const query = searchParams.get("query")

    useEffect(() => {
    }, [])
    return (
        <>
            <Header />
            {/* <div>{query}</div> */}
            <main className="search-page">
                <section className="search-filters">
                    <div className="text-xl font-medium">Filters</div>
                    <br />
                    <div className="search-filters__categories search-filter__section">
                        <div className="font-medium text-lg sf-section__heading">Category</div>

                        <div className="search-categories__wrapper">
                            <ul className="search-categories__list">{categories.map((val, i) =>
                                <li className="search-categories__el" key={i}>{val.name}</li>
                            )}</ul>
                        </div>
                    </div>

                    <div className="search-filters_prices-wrapper search-filter__section">
                        <div className="font-medium text-lg sf-section__heading">Price</div>
                        <div className="flex gap-2">
                            <div>
                                <input type="text" placeholder="Min" className="input input-sm" />
                            </div>
                            <div>
                                <input type="text" placeholder="Max" className="input input-sm" />
                            </div>

                            <div>
                                <button className="btn btn-sm">Apply</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="search-items">
                    <div className="search-items-query">Results for {query}: 400.</div>
                    <div className="products-grid">
                        {products.map((val, i) => <ProductCard key={i} product={val} />)}
                    </div>
                </section>

            </main>
        </>
    )
}

export default Search
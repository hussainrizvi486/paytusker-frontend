import { useSearchParams } from "react-router-dom"
import { Header } from "../../layouts";
import { useEffect, useState } from "react"
import { products } from "../../assets/data"
import { ProductCard } from "../../components"
import { categories } from "../../assets/data"
import { CopySlash, Filter } from "lucide-react";
import { useSelector } from "react-redux";




const Search = () => {
    let [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [searchFiltersOpen, setSearchFiltersOpen] = useState(false);
    const searchProducts = useSelector((state) => state.search.searchProductsResults);
    // const productCount = useSelector((state) => state.search.totalProductsCount);


    useEffect(() => {
        console.log(searchProducts)
    }, [searchProducts])

    return (
        <>
            <Header />
            <main className="search-page">
                <section className="search-filters">
                    <div className="flex-align-between ">
                        <div className="text-xl font-medium">Filters</div>
                        <div className="search-toggle__filters-btn">
                            <button className="unset"
                                onClick={() => {
                                    setSearchFiltersOpen((prev) => {
                                        if (prev) {
                                            return false
                                        }
                                        return true
                                    })
                                }}
                            >
                                <Filter className="cursor-pointer" />
                            </button>
                        </div>
                    </div>
                    <div className={`mt-4 search-filter__section-wrapper  ${searchFiltersOpen ? "active" : ""}`}>
                        <div className="search-filters__categories search-filter__section">
                            <div className="font-medium text-lg sf-section__heading">Category</div>

                            <div className="search-categories__wrapper">
                                <ul className="search-categories__list">{categories.map((val, i) =>
                                    <li className="search-categories__el text-sm" key={i}>{val.name}</li>
                                )}</ul>
                            </div>
                        </div>

                        <div className="search-filters_prices-wrapper search-filter__section">
                            <div className="font-medium text-lg sf-section__heading">Price</div>
                            <div className="flex-align-center gap-2">
                                <div>
                                    <input type="text" placeholder="Min" className="input input-sm" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Max" className="input input-sm" />
                                </div>

                                <div>
                                    <button className="btn btn-sm btn-primary">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="search-items">
                    {/* <div className="search-items-query">Results for {query}: 400.</div> */}
                    <div className="products-grid">
                        {searchProducts?.map((val, i) => <ProductCard key={i} product={val} />)}
                    </div>

                    <div className="mt-4">
                        <Pagination />
                    </div>
                    {/* <div className="flex-end gap-1 mt-4">
                        <button className="btn btn-sm btn-primary">Prev</button>
                        <button className="btn btn-sm btn-primary">Next</button>
                    </div> */}
                </section>
            </main>
        </>
    )
}

export default Search


const Pagination = ({ handleNext, setCurrentPage, handlePrev, pageCount = 1, currentPage = 1, }) => {
    console.log()
    return (
        <>{pageCount > 1 ?
            <div className="pagination-wrapper">
                <button className="btn btn-sm btn-primary"
                    onClick={handlePrev}
                >Prev</button>
                {
                    Array(pageCount).fill(pageCount).map((v, index) => (
                        <div
                            className={`pagination-count__btn ${currentPage === index + 1 ? "active" : ""}`}
                            key={v + index}
                            onClick={() => setCurrentPage(index + 1)}
                        >{index + 1}</div>
                    ))
                }
                <button className="btn btn-sm btn-primary"
                    onClick={handleNext}

                >Next</button>
            </div>
            : <></>}
        </>
    )
}

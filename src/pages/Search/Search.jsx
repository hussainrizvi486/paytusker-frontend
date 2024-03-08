import { useSearchParams } from "react-router-dom"
import { Header } from "../../layouts";
import { useEffect, useRef, useState } from "react"
import { categories } from "../../assets/data"
import { Filter } from "lucide-react";
import { ProductLoadingGrid } from "../../components/Loaders/ProductCardLoader";
import { ProductCard } from "../../components";
import toast from "react-hot-toast"
import axios from "axios";


const Search = () => {
    const setSearchParams = useSearchParams()[1]
    const [searchParams] = useSearchParams();

    const FetchSearchResults = async (queryParams, setLoading, setData, setPagination) => {
        setLoading(true)
        try {
            const req = await axios.get(`${import.meta.env.VITE_API_URL}api/product/search`, { method: "GET", params: queryParams });

            if (req.status === 200 && req.data) {
                const reqData = req.data;
                setData(reqData.results)
                setPagination((prev) => ({
                    ...prev, currentPageNum
                        : reqData.current_page, totalPages: reqData.total_pages
                }))

                window.scrollTo(0, 0)
            }
        } catch (error) {
            toast.error(`${String(error)}`)
        }
        await setLoading(false)
    }

    const query = searchParams.get("query");

    const [queryPayload, setQueryPayload] = useState({ query: query, page: searchParams.get("page") });
    const [searchFiltersOpen, setSearchFiltersOpen] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const maxPriceBtnRef = useRef();
    const minPriceBtnRef = useRef();

    const [paginationDataObj, setPaginationDataObj] = useState({
        currentPageNum: 0,
        totalPages: 0,
    });


    useEffect(() => {
        FetchSearchResults(queryPayload, setProductsLoading, setProductsData, setPaginationDataObj)
    }, [queryPayload])


    useEffect(() => {
        setQueryPayload(prev => ({
            ...prev,
            query: searchParams.get("query")
        }));
    }, [searchParams]);


    const handleCurrentPage = (pageNum) => {
        setSearchParams((params) => {
            params.set("page", pageNum)
            return params
        })
        setQueryPayload(prev => ({ ...prev, "page": pageNum }));
    };

    const handleNextPage = () => {
        const nextPage = paginationDataObj.currentPageNum + 1;
        handleCurrentPage(nextPage);
    };

    const handlePrevPage = () => {
        const prevPage = paginationDataObj.currentPageNum - 1;
        handleCurrentPage(prevPage);
    };
    const updatePriceFilters = () => {
        const newFilters = {
            min_price: parseFloat(minPriceBtnRef.current.value || 0),
            max_price: parseFloat(maxPriceBtnRef.current.value || 0)
        };

        for (const key of Object.keys(newFilters)) {
            if (newFilters[key] <= 0) {
                delete newFilters[key]
            }

        }

        console.log(newFilters)

        setQueryPayload(prev => {
            const updatedFilters = { ...prev.filters, ...newFilters };
            return { ...prev, filters: JSON.stringify(updatedFilters) };
        });
    };

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
                                        if (prev) { return false } return true
                                    })
                                }}>
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
                                    <input type="text" placeholder="Min" className="input input-sm" ref={minPriceBtnRef} />
                                </div>
                                <div>
                                    <input type="text" placeholder="Max" className="input input-sm" ref={maxPriceBtnRef} />
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-primary"
                                        onClick={() => updatePriceFilters()}
                                    >Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="search-items">
                    {productsLoading ? <ProductLoadingGrid />
                        : !productsLoading && productsData ?
                            <div className="products-grid">
                                {productsData?.map((val, i) => <ProductCard key={i} product={val} />)}
                            </div>
                            : !productsLoading && !productsData ? <NoResultContainer query={searchParams.get("query")} /> : <></>
                    }


                    <div className="search-pagination__wrapper">
                        <Pagination
                            pageCount={paginationDataObj.totalPages}
                            currentPage={paginationDataObj.currentPageNum}
                            setCurrentPage={handleCurrentPage}
                            handleNext={handleNextPage} handlePrev={handlePrevPage} />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Search

const Pagination = ({ handleNext, setCurrentPage, handlePrev, pageCount = 0, currentPage = 1, }) => {
    return (
        <>{pageCount > 1 ?
            <div className="pagination-wrapper">

                <button className="btn btn-sm btn-primary" onClick={handlePrev}>Prev</button>
                {
                    Array(pageCount).fill(pageCount).map((v, index) => (
                        <div
                            className={`pagination-count__btn ${currentPage === index + 1 ? "active" : ""}`}
                            key={v + index}
                            onClick={() => setCurrentPage(index + 1)}
                        >{index + 1}</div>
                    ))
                }
                <button className="btn btn-sm btn-primary" onClick={handleNext}>Next</button>
            </div>
            : <></>}
        </>
    )
}


const NoResultContainer = ({ query }) => {
    return (
        <div style={{ paddingLeft: ".5rem" }}>
            <p >No results found for: {query}</p><br />
            <p >Please try a different search term.</p>
        </div>
    );
};
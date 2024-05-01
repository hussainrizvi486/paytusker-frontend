import { useSearchParams } from "react-router-dom"
import { Header } from "../../layouts";
import { useEffect, useRef, useState } from "react"
import { Filter } from "lucide-react";
import { ProductLoadingGrid } from "../../components/Loaders/ProductCardLoader";
import { Pagination, ProductCard } from "../../components";
import toast from "react-hot-toast"
import axios from "axios";


const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()


    const query = searchParams.get("query");
    const [queryPayload, setQueryPayload] = useState({
        query: query || null,
        category: searchParams.get("category") || null,
        page: searchParams.get("page"),
    });

    const [searchFiltersOpen, setSearchFiltersOpen] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const maxPriceBtnRef = useRef();
    const minPriceBtnRef = useRef();
    const [searchResCount, setSearchResCount] = useState(0);
    const [searchFiltersDict, setSearchFiltersDict] = useState();

    const [paginationDataObj, setPaginationDataObj] = useState({
        currentPageNum: 0,
        totalPages: 0,
    });


    useEffect(() => {
        setQueryPayload((prev) => ({ ...prev, query: query }))
        console.log("CAll 1")
    }, [query]);

    useEffect(() => {
        let payload_data = queryPayload;
        const FetchSearchResults = async (queryParams, setLoading, setData, setPagination) => {
            setLoading(true)
            try {
                const req = await axios.get(`${import.meta.env.VITE_API_URL}api/product/search`, {
                    method: "GET",
                    params: { ...queryParams, filters: JSON.stringify(queryParams.filters) }
                });
                if (req.status === 200 && req.data) {
                    const reqData = req.data;
                    if (reqData.results?.length > 0) {
                        setData(reqData.results);
                        setSearchResCount(reqData.count || 0);
                        setSearchFiltersDict(reqData.filters_attributes);

                    } else {
                        setData(null)
                        setSearchFiltersDict(null);
                        setQueryPayload((prev) => {
                            if (prev?.filters?.attributes) {
                                prev["filters"]["attributes"] = {}
                            }
                            return prev
                        })
                    }
                    setPagination((prev) => ({
                        ...prev, currentPageNum
                            : reqData.current_page, totalPages: reqData.total_pages
                    }))

                    window.scrollTo(0, 0)
                }
                await setLoading(false)
            } catch (error) {
                toast.error(`${String(error)}`)
                await setLoading(false)
            }
        }

        FetchSearchResults(payload_data, setProductsLoading, setProductsData, setPaginationDataObj)
    }, [queryPayload])





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

        setQueryPayload(prev => {
            const updatedFilters = { ...prev.filters, ...newFilters };
            return { ...prev, filters: updatedFilters };
        });
    };

    const updateAttributeFilters = (key, val) => {
        setQueryPayload((prev) => {
            let filters_attributes = prev?.filters?.attributes || {};
            let other_filters = { ...prev.filters };

            if (Object.keys(filters_attributes).includes(key)) {
                if (filters_attributes[key].includes(val)) {
                    filters_attributes[key].splice(filters_attributes[key].indexOf(val), 1);
                }
                else {
                    filters_attributes[key].push(val);
                }
            } else {
                filters_attributes[key] = [val];
            }

            other_filters["attributes"] = filters_attributes
            return { ...prev, filters: other_filters };
        });
    };

    const checkFilterAttributesExist = (key, val) => {
        let current_attributes = queryPayload?.filters?.attributes || null
        if (!current_attributes) return false
        if (Object.keys(current_attributes).includes(key)) {
            if (current_attributes[key].includes(val)) {
                return true
            }
            return false
        }
        return false
    }

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

                        {/* <div className="search-filters__categories search-filter__section">
                            <div className="font-medium text-lg sf-section__heading">Category</div>
                            <div className="search-categories__wrapper">
                                <ul className="search-categories__list">
                                    {categories.map((val, i) => <li className="search-categories__el text-sm" key={i}>{val.name}</li>)}
                                </ul>
                            </div>
                        </div> */}

                        {searchFiltersDict ?
                            Object.keys(searchFiltersDict).map((key, i) => (
                                <div key={i} className="search-filter__option-wrapper">
                                    <div className="search-filter__option-label">{key}</div>
                                    <div className="search-filter__option-values">{
                                        searchFiltersDict[key].map((val, j) => (
                                            <div key={j} className={`filter-option ${checkFilterAttributesExist(key, val) ? "active" : ""}`}
                                                onClick={() => updateAttributeFilters(key, val)}
                                            >
                                                {val}
                                            </div>
                                        ))

                                    }</div>
                                </div>
                            )
                            ) : <></>
                        }


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
                    {productsLoading ?
                        <ProductLoadingGrid />
                        : !productsLoading && productsData ?
                            <div>
                                {query ? <div className="mb-5">Showing {searchResCount} results for &quot;{query}&quot;</div> : <></>}

                                <div className="products-grid">
                                    {productsData?.map((val, i) => <ProductCard key={i} product={val} />)}
                                </div>
                            </div>

                            : !productsLoading && !productsData ? <NoResultContainer query={searchParams.get("query")} />
                                : <></>}


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




const NoResultContainer = ({ query }) => {
    return (
        <div style={{ paddingLeft: ".5rem" }}>
            <p >No results found for: {query}</p><br />
            <p >Please try a different search term.</p>
        </div>
    );
};
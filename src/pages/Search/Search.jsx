import { useSearchParams } from "react-router-dom"
import { Header } from "../../layouts";
import { useEffect, useState } from "react"
import { categories } from "../../assets/data"
import { Filter } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchProductsQuery } from "../../features/api/api";
import { ProductLoadingGrid } from "../../components/Loaders/ProductCardLoader";
import { ProductCard } from "../../components";


const Search = () => {
    let [searchParams] = useSearchParams();
    let currentPageState = useSelector((state) => state.search);
    const query = searchParams.get("query");
    const [queryPayload, setQueryPayload] = useState({ "query": query });
    const [searchFiltersOpen, setSearchFiltersOpen] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [paginationDataObj, setPaginationDataObj] = useState({
        "currentPageNum": currentPageState.currentPageNum,
        "totalPages": currentPageState.totalPages,
    });

    const SearchAPI = useSearchProductsQuery(queryPayload);

    const handleCurrentPage = (pageNum) => {
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

    useEffect(() => {
        SearchAPI.refetch(queryPayload).then((res) => { if (res.isSuccess) { window.scrollTo(0, 0) } });
    }, [queryPayload]);

    useEffect(() => {
        if (SearchAPI.data && SearchAPI.isSuccess) {
            const data = SearchAPI.data;
            setProductsData(data?.results);
            let pagination_obj = {
                totalPages: data?.total_pages,
                currentPageNum: data?.current_page,
            };
            setPaginationDataObj(pagination_obj);
        }
    }, [SearchAPI, SearchAPI.data]);

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
                    {SearchAPI.isLoading ? <ProductLoadingGrid /> : <></>}
                    <div className="products-grid">
                        {productsData?.map((val, i) => <ProductCard key={i} product={val} />)}
                    </div>

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

const Pagination = ({ handleNext, setCurrentPage, handlePrev, pageCount = 10, currentPage = 1, }) => {
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

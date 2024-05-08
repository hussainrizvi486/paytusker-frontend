import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
    handleNext,
    setCurrentPage,
    handlePrev,
    pageCount = 0,
    currentPage = 1,
}) => {
    const pagesArr = Array.from({ length: pageCount }, (_, index) => index + 1);
    const centerRow = pagesArr.slice(currentPage - 2, currentPage + 1);
    const startRow = [1];
    const breakLimit = 5;
    const endRow = [pagesArr.length];
    const endLimit = (pagesArr.length - breakLimit) + 1;
    if (pageCount > 1) return (
        <>
            <div className="pagination-wrapper">
                <button className="pagination-btn" onClick={handlePrev}>
                    <ChevronLeft className="icon-sm" />
                </button>
                {currentPage > breakLimit - 1 && pageCount > breakLimit - 1 && currentPage < endLimit ? (
                    <>
                        {startRow.map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                        ...
                        {centerRow.map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                        ...
                        {endRow.map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                    </>
                ) : currentPage >= endLimit ? (
                    <>
                        {startRow.map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                        ...
                        {pagesArr.slice(endLimit - 1, pagesArr.length).map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                    </>
                ) : pageCount > breakLimit && currentPage < breakLimit ? (
                    <>
                        {pagesArr.slice(0, breakLimit).map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                        ...
                        {endRow.map((v) => (
                            <div
                                className={`pagination-btn text-sm ${currentPage === v ? "active" : ""}`}
                                key={v}
                                onClick={() => setCurrentPage(v)}
                            >
                                {v}
                            </div>
                        ))}
                    </>
                ) : (
                    <></>
                )}
                <button className="pagination-btn" onClick={handleNext}>
                    <ChevronRight className="icon-sm" />
                </button>
            </div>
        </>
    );
};

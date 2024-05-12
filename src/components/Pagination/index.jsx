import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
    handleNext,
    setCurrentPage,
    handlePrev,
    pageCount = 0,
    currentPage = 1,
}) => {
    let paginationsELements = [];
    const pagesArr = Array.from({ length: pageCount }, (_, index) => index + 1);
    const breakLimit = 5;
    const totalPage = pagesArr.length;
    const endLimit = (totalPage - breakLimit) + 1;

    if (totalPage <= breakLimit) {
        pagesArr.forEach(el => {
            paginationsELements.push({
                pageNum: el
            })
        })
    }
    // with ellipsis
    else if (totalPage > breakLimit && breakLimit > currentPage) {
        // starting row
        let stRange = pagesArr.slice(0, breakLimit)
        stRange.forEach(v => paginationsELements.push({ pageNum: v }))
        paginationsELements.push({
            pageNum: "..."
        })
        paginationsELements.push({
            pageNum: totalPage
        })
    }
    else if (totalPage > breakLimit && breakLimit <= currentPage && currentPage < (endLimit + 1)) {
        // mid row
        let midRange = pagesArr.slice(currentPage - 2, currentPage + 1)
        paginationsELements = [{ pageNum: 1 }]
        paginationsELements.push({
            pageNum: "..."
        })
        midRange.forEach(v => paginationsELements.push({ pageNum: v }))
        paginationsELements.push({ pageNum: "..." })
        paginationsELements.push({ pageNum: pagesArr.length })
    }
    else if (totalPage > breakLimit && breakLimit <= currentPage && currentPage > endLimit) {
        // end row
        paginationsELements.push({ pageNum: 1 })
        paginationsELements.push({ pageNum: "..." })
        let endRange = pagesArr.slice(endLimit, totalPage)
        endRange.forEach(v => paginationsELements.push({ pageNum: v }))
    }

    if (totalPage > 1) return (
        <>
            <div className="pagination-wrapper"

            >
                <button
                    disabled={currentPage == 1}
                    className={`pagination-btn `} onClick={handlePrev}>
                    <ChevronLeft className="icon-sm" />
                </button>
                <>
                    {paginationsELements?.map((obj) => {
                        if (isNaN(obj.pageNum)) {
                            return <>...</>
                        }
                        else {
                            return (
                                <div
                                    className={`pagination-btn text-sm ${currentPage === obj.pageNum ? "active" : ""}`}
                                    key={obj.pageNum}
                                    onClick={() => setCurrentPage(obj.pageNum)}
                                >
                                    {obj.pageNum}
                                </div>
                            )
                        }
                    }
                    )}
                </>
                <button className="pagination-btn" onClick={handleNext}
                    disabled={currentPage == totalPage}

                >
                    <ChevronRight className="icon-sm" />
                </button>
            </div>
        </>
    );
};

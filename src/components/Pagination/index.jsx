export const Pagination = ({ handleNext, setCurrentPage, handlePrev, pageCount = 0, currentPage = 1, }) => {
    const pagesArr = Array.from({ length: pageCount }, (_, index) => index + 1);


    if (currentPage > 5) {
        const centerSec = [...pagesArr.slice(currentPage - 3, currentPage - 1), currentPage, ...pagesArr.slice(currentPage, currentPage + 2)]
        return (
            <div className="pagination-wrapper">
                <button className="btn btn-sm btn-primary" onClick={handlePrev}>Prev</button>
                <div
                    className={`pagination-count__btn`}
                    onClick={() => setCurrentPage(1)}
                >{1}</div>
                ...
                {centerSec.map((v) => (
                    <div
                        className={`pagination-count__btn ${currentPage === v ? "active" : ""}`}
                        key={v}
                        onClick={() => setCurrentPage(v)}
                    >{v}</div>
                ))}
                ...
                <div
                    className={`pagination-count__btn`}
                    onClick={() => setCurrentPage(pageCount)}
                >{pageCount}</div>
                <button className="btn btn-sm btn-primary" onClick={handleNext}>Next</button>
            </div>
        )
    }
    // const displayArr = 
    return (
        <>{pageCount > 1 ?
            <div className="pagination-wrapper">

                <button className="btn btn-sm btn-primary" onClick={handlePrev}>Prev</button>
                {pagesArr.map((v, index) => (
                    <div
                        className={`pagination-count__btn ${currentPage === index + 1 ? "active" : ""}`}
                        key={v + index}
                        onClick={() => setCurrentPage(index + 1)}
                    >{index + 1}</div>
                ))}
                <button className="btn btn-sm btn-primary" onClick={handleNext}>Next</button>
            </div>
            : <></>}
        </>
    )
}
import Skeleton from 'react-loading-skeleton'



export const ProductCardLoader = () => {
    return (
        <div className="product-card">
            <div className="product-card__image">
                <Skeleton height={180} />
            </div>

            <div className="product-card__details">
                <Skeleton count={2} />
                <br />
                <Skeleton count={1} />
            </div>
        </div>
    )
}


export const ProductLoadingGrid = ({ product_count = 12, grid_class }) => {
    let counts_arr = []
    for (let i = 0; i < product_count; i++) {
        counts_arr.push(i)
    }

    return (
        <div>
            <div className="section-heading">
                <Skeleton count={1} />
            </div>
            <div className={`home-section-products products-grid ${grid_class}`}>
                {counts_arr.map((i) => <ProductCardLoader key={i} />)}
            </div>
        </div>
    )
}
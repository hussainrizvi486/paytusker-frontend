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

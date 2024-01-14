import React from 'react'
import { TProduct } from '../../types/products'

type TProductCardProps = {
    product: TProduct
    searchValue?: string
    onSelect: () => void
}

const ProductCard = ({
    product,
    searchValue = '',
    onSelect,
}: TProductCardProps) => {
    const startIndex = product.title
        .toLowerCase()
        .indexOf(searchValue.toLowerCase())
    const title = startIndex >= 0 ? (
        <span>
            {product.title.substring(0, startIndex)}
            <span className="product-card__highlighted">{searchValue}</span>
            {product.title.substring(startIndex + searchValue.length)}
        </span>
    ): product.title;

    return (
        <div className="product-card-wrapper" onClick={onSelect}>
            <div className="product-card-wrapper__title">{title}</div>
            <div className="product-card-wrapper__description">
                {product.description}
            </div>
        </div>
    )
}

export default React.memo(ProductCard)

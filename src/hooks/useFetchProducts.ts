import { useEffect, useState } from 'react'
import { PRODUCTS_URL } from '../constants/urls'
import { TProduct } from '../types/products'

const useFetchProducts = (searchValue: string) => {
    const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const result = await fetch(PRODUCTS_URL)
            const response = await result.json()
            //filter should be run with api filter ideally
            setFilteredProducts(
                response?.products.filter(
                    (product: TProduct) =>
                        product.title
                            .toLowerCase()
                            .indexOf(searchValue.toLowerCase()) >= 0
                )
            )
            setIsLoading(false)
        } catch (error) {
            console.log('error')
            setIsLoading(false)
        }
    }

    // below api is called with the same params everytime since its just a mock and not an actual api which supports search param
    useEffect(() => {
        if (searchValue) {
            fetchProducts()
        }
    }, [searchValue])

    return {
        filteredProducts,
        isLoading,
    }
}

export default useFetchProducts

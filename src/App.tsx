import { useMemo, useState } from 'react'
import Autocomplete from './components/autocomplete'
import useFetchProducts from './hooks/useFetchProducts'
import { TProduct } from './types/products'

function App() {
    const [searchValue, setSearchValue] = useState<string>('')
    const { filteredProducts, isLoading } = useFetchProducts(searchValue)

    const onChangeInput = (value: string) => {
        setSearchValue(value)
    }

    return (
        <Autocomplete
            list={filteredProducts}
            onChangeInput={onChangeInput}
            isLoading={isLoading}
        />
    )
}

export default App

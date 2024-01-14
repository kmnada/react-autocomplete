import { ChangeEvent, useCallback, useRef, useState } from 'react'
import { TProduct } from '../../types/products'
import ProductCard from '../product-card'
import useClickOutside from '../../hooks/useClickOutside'
import Loader from '../loader'

type TAutocompleteProps = {
    list: TProduct[]
    onChangeInput: (value: string) => void
    isLoading: boolean
}

const Autocomplete = ({
    list,
    onChangeInput,
    isLoading,
}: TAutocompleteProps) => {
    const elementRef = useRef(null)
    const [searchValue, setSearchValue] = useState('')
    const [showDropdown, setShowDropdown] = useState(true)
    const [highlightedText, setHighlightedText] = useState('')

    const handleDropdown = () => setShowDropdown(false)

    useClickOutside(elementRef, handleDropdown)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHighlightedText(event.target.value)
        onChangeInput(event.target.value)
    }

    const debounce = (
        searchFn: (event: ChangeEvent<HTMLInputElement>) => void,
        delay: number
    ) => {
        let timer: ReturnType<typeof setTimeout>

        return function (args: ChangeEvent<HTMLInputElement>) {
            clearTimeout(timer)

            timer = setTimeout(() => {
                searchFn(args)
            }, delay)
        }
    }

    const debouncedHandleChange = debounce(handleChange, 1000)

    const onSelect = useCallback(
        (title: string) => {
            onChangeInput(title)
            setSearchValue(title)
            setHighlightedText(title)
        },
        [onChangeInput, setSearchValue, setHighlightedText]
    )

    return (
        <div className="input-wrapper" ref={elementRef}>
            <input
                className="input-wrapper__field"
                placeholder="Search ..."
                type="text"
                onChange={(event) => {
                    setSearchValue(event.target.value)
                    debouncedHandleChange(event)
                }}
                onFocus={() => setShowDropdown(true)}
                value={searchValue}
            />
            {showDropdown && searchValue.length > 0 && (
                <div className="suggestion-wrapper">
                    <div className="input-wrapper__dropdown">
                        {list.length > 0 ? (
                            list.map((item: TProduct) => (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    searchValue={highlightedText}
                                    onSelect={() => onSelect(item.title)}
                                />
                            ))
                        ) : (
                            <div className="input-wrapper__dropdown-empty">
                                No matching value
                            </div>
                        )}
                    </div>
                    {isLoading && (
                        <div className="loader-container">
                            <Loader />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Autocomplete

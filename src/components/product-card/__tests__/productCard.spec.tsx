import { render, screen } from '@testing-library/react'
import ProductCard from '../productCard'

const mockProduct = {
    title: 'sample',
    description: 'sample description',
    id: 1,
    price: 100,
    discountPercentage: 50,
    stock: 10,
    brand: 'test',
}
describe('product Card component ', () => {
    it('should render the component', () => {
        render(<ProductCard product={mockProduct} onSelect={jest.fn()} />)
        expect(screen.getByText('sample')).toBeInTheDocument()
    })
})

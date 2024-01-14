import { render, screen } from '@testing-library/react'
import Autocomplete from '../autocomplete'

describe('Autocomplete component', () => {
    it('renders the component in default state', () => {
        render(
            <Autocomplete
                list={[]}
                onChangeInput={jest.fn()}
                isLoading={false}
            />
        )
        expect(screen.getByPlaceholderText('Search ...')).toBeInTheDocument()
    })
})

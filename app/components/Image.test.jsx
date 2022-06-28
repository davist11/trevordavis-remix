/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Image from './Image'
import useImgix from '~/hooks/use-imgix'

jest.mock('~/hooks/use-imgix');

const useImgixMock = useImgix;
const defaultProps = {
    src: '',
}

const renderComponent = (props = defaultProps) =>
    render(<Image {...props} />)

describe('Imgix Component', () => {
    it('Shound render without crashing', () => {
        renderComponent()
    })

    it('Shound render nothing when passing no src', () => {
        renderComponent({ alt: 'Sample image' })
        expect(screen.queryByAltText('Sample image')).not.toBeInTheDocument()
    })

    it('Should render an image', () => {
        useImgixMock.mockReturnValue('https://path/to/image.jpg');

        renderComponent({ src: '//path/to/image.jpg', alt: 'Sample image' })
        expect(screen.queryByAltText('Sample image')).toBeInTheDocument()
    })
})

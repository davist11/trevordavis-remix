/* eslint-env jest */

import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogSummary from './BlogSummary'

const defaultProps = {
    typeHandle: '',
    body: '',
}

const renderComponent = (props = defaultProps) =>
    render(<BlogSummary {...props} />)

const sampleString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

describe('Blog Summary Component', () => {
    it('Shound render without crashing', () => {
        renderComponent()
    })

    it('Should render all chars if type is externalArticle', () => {
        renderComponent({
            typeHandle: 'externalArticle',
            body: `<p>${sampleString}</p>`,
        })

        expect(screen.getByText(sampleString))
    })

    it('Should render all chars if type is not externalArticle and less than 400 chars', () => {
        renderComponent({
            typeHandle: 'blog',
            body: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
        })

        expect(
            screen.getByText(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            )
        )
    })
    it('Should render 400 chars plus … if type is not externalArticle and more than 400 chars', () => {
        renderComponent({
            typeHandle: 'blog',
            body: `<p>${sampleString}</p>`,
        })

        expect(
            screen.getByText(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui…'
            )
        )
    })
})

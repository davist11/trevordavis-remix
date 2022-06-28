/* eslint-env jest */

import { renderHook } from '@testing-library/react'

import useBlogSummary from '~/hooks/use-blog-summary'

describe('Blog Summary Hook', () => {
    it('Should return all text if less than 400 chars', () => {
        const { result } = renderHook(() =>
            useBlogSummary(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            )
        )
        expect(result.current).toEqual(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        )
    })

    it('Should return all text if less than 400 chars with HTML stripped', () => {
        const { result } = renderHook(() =>
            useBlogSummary(
                `<p><strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`
            )
        )
        expect(result.current).toEqual(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        )
    })

    it('Should return 400 chars plus … if more than 400 chars', () => {
        const { result } = renderHook(() =>
            useBlogSummary(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            )
        )
        expect(result.current).toEqual(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui…'
        )
    })

    it('Should allow passing of the limit character to get correct number of chars', () => {
        const { result } = renderHook(() =>
            useBlogSummary(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                25
            )
        )
        expect(result.current).toEqual('Lorem ipsum dolor sit ame…')
    })
})

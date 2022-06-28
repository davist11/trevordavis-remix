/* eslint-env jest */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Like from './Like'
import userEvent from '@testing-library/user-event'
import { useFetcher } from '@remix-run/react'

jest.mock('./Like', () => {
  const originalModule = jest.requireActual('./Like');
  return {
    __esModule: true,
    ...originalModule,
    handleLike: jest.fn(() => {
        return {
            numberOflikes: 11
        }
    }),
  };
});

jest.mock('@remix-run/react', () => {
    const originalModule = jest.requireActual('@remix-run/react');

    return {
        __esModule: true,
        ...originalModule,
        useFetcher: jest.fn(),
    };
});

useFetcher.mockImplementation(() => {
    return {
        type: 'idle',
        submit: jest.fn(),
    }
})

const defaultProps = {
    storageKey: 'test-key',
    likes: 10,
}

const renderComponent = (props = defaultProps) =>
    render(<Like {...props} />)


describe('Like Component', () => {
    it('Should render without crashing', () => {

        renderComponent()
    })

    it('Should display number of initial likes', async () => {
        renderComponent()

        expect(screen.getByText('10 Likes'))
    })

    it('Should increase like count', async() => {
        renderComponent()

        // expect(screen.getByText('10 Likes'))

        // const user = userEvent.setup()
        screen.debug(screen.getByRole('button'))
        // await user.click(screen.getByRole('button'))

        // useFetcher.mockImplementationOnce(() => {
        //     return {
        //         type: 'done',
        //         data: {
        //             numberOfLikes: 11,
        //         },
        //     }
        // })

        // expect(screen.getByText('11 Likes'))
    })

    // it.todo('Should be able to unlike after liking')
})

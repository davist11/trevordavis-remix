import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { themeCookie } from '~/cookies.server'

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const theme = formData.get('theme')

    if (typeof theme !== 'string' || !['light', 'dark'].includes(theme)) {
        return json({ success: false, error: 'Invalid theme' }, { status: 400 })
    }

    const cookieHeader = await themeCookie.serialize(theme)

    return json(
        { success: true },
        {
            headers: {
                'Set-Cookie': cookieHeader,
            },
        }
    )
}

export const loader = () => {
    throw new Response('Not Found', { status: 404 })
}

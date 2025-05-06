import { createCookie } from '@remix-run/node'

export const themeCookie = createCookie('theme', {
    path: '/',
    maxAge: 315_360_000, // 10 years
})

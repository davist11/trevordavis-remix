import { useEffect } from 'react'
import { useFetcher } from '@remix-run/react'
import Moon from '~/images/icons/Moon'
import Sun from '~/images/icons/Sun'
import { Theme } from '~/hooks/use-theme'

type ThemeToggleProps = {
    handleThemeToggle: () => void
    setTheme: (theme: Theme) => void
    theme: Theme
}

export const ThemeToggle = ({
    handleThemeToggle,
    theme,
    setTheme,
}: ThemeToggleProps) => {
    const fetcher = useFetcher()
    const oppositeTheme = theme === 'light' ? 'dark' : 'light'

    const handleSetTheme = () => {
        handleThemeToggle()

        const formData = new FormData()
        formData.append('theme', oppositeTheme)
        console.log({ oppositeTheme })
        fetcher.submit(formData, { method: 'post', action: '/api/set-theme' })
    }

    return (
        <button
            className="dark:hover:text-blue-200 duration-200 transition-default"
            onClick={handleSetTheme}
            type="button"
        >
            <span className="sr-only">Enable {oppositeTheme} mode</span>

            {theme === 'light' ? <Moon fill="none" /> : <Sun fill="none" />}
        </button>
    )
}

/*
Fix it for small screens
update node and packages?
Update TW (eventually)
*/

import { useState } from 'react'

export type Theme = 'light' | 'dark'

type UseThemeProps = {
    theme: Theme
    setTheme: (theme: Theme) => void
    handleThemeToggle: () => void
}

export const useTheme = (initialTheme: Theme): UseThemeProps => {
    const [theme, setTheme] = useState<Theme>(initialTheme)

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'

        setTheme(newTheme)
    }

    return { theme, setTheme, handleThemeToggle }
}

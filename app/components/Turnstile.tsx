import { useEffect, useState } from 'react'
import { Turnstile as TurnstileComponent } from '@marsidev/react-turnstile'

interface TurnstileProps {
    siteKey: string
}

export default function Turnstile({ siteKey }: TurnstileProps) {
    const [mounted, setMounted] = useState(false)

    console.log({ siteKey })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return <TurnstileComponent siteKey={siteKey} />
}

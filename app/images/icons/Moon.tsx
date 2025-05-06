import { SvgType } from './SvgType'

const Moon = (props: SvgType) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-none"
            {...props}
        >
            <path d="M22 14a9 9 0 1 1-9-11 6 6 0 0 0 9 11z" />
        </svg>
    )
}

export default Moon

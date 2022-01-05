import { SvgType } from './SvgType'

const CaretDown = (props: SvgType) => {
    return (
        <svg
            {...props}
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
            />
        </svg>
    )
}

export default CaretDown

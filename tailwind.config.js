const plugins = require('@viget/tailwindcss-plugins')
const {
    rem,
    remPair,
    em,
    pxPair,
} = require('@viget/tailwindcss-plugins/utilities/fns')
const a = require('@viget/tailwindcss-plugins/utilities/alpha')

module.exports = {
    content: ['./app/**/*.{ts,tsx}'],
    prefix: '',
    important: false,
    separator: ':',
    mode: 'jit',
    presets: [],
    theme: {
        screens: {
            ty: em(350),
            xs: em(400),
            sm: em(640),
            md: em(768),
            lg: em(1024),
            xl: em(1280),
            jb: em(1440),

            xsd: { max: em(399) },
            smd: { max: em(639) },
            mdd: { max: em(767) },
            lgd: { max: em(1023) },
            xld: { max: em(1279) },
        },
        aspectRatio: {
            about: '850 / 575',
            homepage: '1200 / 675',
        },
        breakInside: {
            avoid: 'avoid',
        },
        clipPath: {},
        colors: {
            transparent: 'transparent',
            black: '#000',
            current: 'currentColor',
            white: {
                default: '#fff',
                32: `#ffffff${a[32]}`,
            },
            blue: {
                100: '#c8d3f5',
                200: '#5C9EAD',
                400: '#222436',
                500: '#1e2030',
                600: '#191a2a',
                700: '#131421',
            },
            pink: {
                400: '#ff98a4',
            },
        },
        columnCount: {
            1: 1,
            2: 2,
            3: 3,
        },
        columnGap: (theme) => ({
            ...theme('spacing'),
        }),
        spacing: {
            '-full': '-100%',
            px: '1px',
            0: '0',
            ...remPair(2),
            ...remPair(4),
            ...remPair(5),
            ...remPair(8),
            ...remPair(10),
            ...remPair(12),
            ...remPair(16),
            ...remPair(20),
            ...remPair(24),
            ...remPair(32),
            ...remPair(40),
            ...remPair(48),
            ...remPair(64),
            ...remPair(80),
            ...remPair(100),
            ...remPair(120),
            ...remPair(140),
            ...remPair(240),
            ...remPair(480),
        },
        animate: (theme) => ({
            triggerClass: '-in-view',
            staggerDelay: {
                ...theme('transitionDelay'),
            },
            staggerInterval: {
                default: '100ms',
                200: '200ms',
                ...theme('transitionDelay'),
            },
            maxItemIntervalSupport: 9,
            animations: {
                'fade-up': {
                    from: {
                        transform: 'translateY(20px)',
                        opacity: 0,
                    },
                    to: {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                },
            },
        }),
        backgroundColor: (theme) => theme('colors'),
        backgroundOpacity: (theme) => theme('opacity'),
        backgroundPosition: {
            bottom: 'bottom',
            center: 'center',
            'center-bottom': 'center bottom',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
        },
        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain',
        },
        borderColor: (theme) => ({
            ...theme('colors'),
            default: theme('colors.blue.500', 'currentColor'),
        }),
        borderOpacity: (theme) => theme('opacity'),
        borderRadius: {
            none: '0',
            default: rem(4),
            md: rem(8),
            lg: rem(16),
            xl: rem(24),
            full: '9999px',
        },
        borderWidth: {
            default: '1px',
            0: '0',
            ...pxPair(2),
            ...pxPair(4),
            ...pxPair(8),
        },
        boxShadow: (theme) => ({
            none: 'none',
        }),
        container: {},
        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            'not-allowed': 'not-allowed',
        },
        divideColor: (theme) => theme('borderColor'),
        divideWidth: (theme) => theme('borderWidth'),
        fill: {
            current: 'currentColor',
            none: 'none',
        },
        flex: {
            1: '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
            none: 'none',
        },
        flexGrow: {
            0: '0',
            default: '1',
        },
        flexShrink: {
            0: '0',
            default: '1',
        },
        fontFamily: {
            mono: [
                '"JetBrains Mono"',
                '"Source Code Pro"',
                '"Menlo"',
                '"Monaco"',
                '"Courier New"',
                'monospace',
            ],
            serif: ['"Noto serif"', '"Georgia"', '"Times New Roman"', 'serif'],
            sans: [
                '"Quicksand"',
                '"Helvetica Neue"',
                'Helvetica',
                'sans-serif',
            ],
        },
        fontSize: {
            jb: rem(40),
            xl: rem(32),
            lg: rem(24),
            md: rem(18),
            sm: rem(16),
            xs: rem(12),
        },
        fontWeight: {
            hairline: '100',
            thin: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
        },
        gap: (theme) => theme('spacing'),
        height: (theme) => ({
            auto: 'auto',
            ...theme('spacing'),
            full: '100%',
            screen: '100vh',
        }),
        inset: (theme, { negative }) => ({
            ...theme('spacing'),
            ...negative(theme('spacing')),
            0: '0',
            '1/2': '50%',
            full: '100%',
            auto: 'auto',
        }),
        letterSpacing: {
            normal: '0',
            wide: '0.03em',
            wider: '0.1em',
            widest: '0.2em',
        },
        lineHeight: {
            none: '1',
            tight: '1.15',
            snug: '1.25',
            normal: '1.4',
            relaxed: '1.6',
        },
        listStyleType: {
            none: 'none',
            disc: 'disc',
            decimal: 'decimal',
        },
        margin: (theme, { negative }) => ({
            auto: 'auto',
            ...theme('spacing'),
            ...negative(theme('spacing')),
        }),
        maxHeight: {
            full: '100%',
            screen: '100vh',
            half: '50vh',
        },
        maxWidth: {
            full: '100%',
            ...remPair(80),
            ...remPair(160),
            ...remPair(225),
            ...remPair(308),
            ...remPair(375),
            ...remPair(768),
            ...remPair(1064),
            ...remPair(1280),
            ...remPair(1440),
        },
        minHeight: {
            0: '0',
            ...pxPair(380),
            full: '100%',
            screen: '100vh',
            '2/3-screen': '66.666667vh',
        },
        minWidth: {
            0: '0',
            full: '100%',
            ...remPair(16),
            ...remPair(40),
            ...remPair(180),
            ...remPair(240),
            ...remPair(280),
        },
        objectPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
        },
        opacity: {
            0: '0',
            25: '0.25',
            50: '0.5',
            75: '0.75',
            100: '1',
        },
        order: {
            first: '-9999',
            last: '9999',
            none: '0',
        },
        padding: (theme) => theme('spacing'),
        placeholderColor: (theme) => theme('colors'),
        placeholderOpacity: (theme) => theme('opacity'),
        rect: {
            'icon-sm': [16, 16],
            icon: [24, 24],
            'icon-md': [36, 36],
            'icon-lg': [48, 48],
            60: [60, 60],
            'logo-sm': [160, 24],
            logo: [193.5, 28.5],
            'logo-lg': [258, 38],
            'logo-text': [168, 25],
            'logo-icon': [48, 48],
        },
        rotate: {
            0: '0deg',
            45: '45deg',
            90: '90deg',
            100: '100deg',
            180: '180deg',
            200: '200deg',
            270: '270deg',
        },
        scale: {
            '-100': '-1',
            0: '0',
            90: '0.9',
            100: '1',
            110: '1.1',
        },
        scrollSnapAlign: {
            start: 'start',
        },
        scrollSnapType: {
            'x-mandatory': 'x mandatory',
        },
        skew: {},
        space: (theme, { negative }) => ({
            ...theme('spacing'),
            ...negative(theme('spacing')),
        }),
        stroke: (theme) => theme('colors'),
        textColor: (theme) => theme('colors'),
        textDecorationColor: (theme) => theme('colors'),
        textDecorationThickness: {
            default: '1px',
            0: '0',
            ...pxPair(2),
            ...pxPair(4),
            ...pxPair(8),
        },
        textUnderlineOffset: {
            default: '1px',
            0: '0',
            ...pxPair(2),
            ...pxPair(4),
            ...pxPair(8),
        },
        textOpacity: (theme) => theme('opacity'),
        transformOrigin: {
            center: 'center',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left',
        },
        transitionDelay: (theme) => theme('transitionDuration'),
        transitionDuration: {
            200: '200ms',
            400: '400ms',
        },
        transitionProperty: {
            none: 'none',
            all: 'all',
            default:
                'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            opacity: 'opacity',
            transform: 'transform',
            'opacity-transform': 'opacity, transform',
        },
        transitionTimingFunction: {
            'in-out': 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
        },
        translate: (theme, { negative }) => ({
            ...theme('spacing'),
            ...negative(theme('spacing')),
            '-full': '-100%',
            '-1/2': '-50%',
            '1/2': '50%',
            full: '100%',
        }),
        width: (theme) => ({
            auto: 'auto',
            ...theme('spacing'),
            '1/2': '50%',
            '1/2-grid': 'calc(50% - 20px)',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            ...pxPair(360),
            full: '100%',
            screen: '100vw',
        }),
        zIndex: {
            auto: 'auto',
            '-2': -2,
            '-1': -1,
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            'nav-overlay': '99',
            nav: '100',
            max: '9999',
        },
    },
    variants: {
        alignContent: ['responsive'],
        alignItems: ['responsive'],
        alignSelf: ['responsive'],
        appearance: ['responsive'],
        aspectRatio: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColor: ['responsive', 'hover'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        body: ['responsive'],
        borderCollapse: [],
        borderColor: ['responsive'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidth: ['responsive'],
        boxShadow: ['responsive'],
        breakInside: [],
        clear: ['responsive'],
        clipPath: ['responsive'],
        columnCount: ['responsive'],
        columnGap: [],
        cursor: ['responsive'],
        display: ['responsive'],
        divideColor: ['responsive'],
        divideWidth: ['responsive'],
        fill: ['responsive'],
        flex: ['responsive'],
        flexDirection: ['responsive'],
        flexGrow: ['responsive'],
        flexShrink: ['responsive'],
        flexWrap: ['responsive'],
        float: ['responsive'],
        fontFamily: ['responsive'],
        fontSize: ['responsive'],
        fontSmoothing: ['responsive'],
        fontStyle: ['responsive'],
        fontWeight: ['responsive'],
        gap: ['responsive'],
        heading: ['responsive'],
        height: ['responsive'],
        inset: ['responsive'],
        justifyContent: ['responsive'],
        letterSpacing: ['responsive'],
        lineHeight: ['responsive'],
        listStylePosition: ['responsive'],
        listStyleType: ['responsive'],
        margin: ['responsive'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        objectFit: ['responsive'],
        objectPosition: ['responsive'],
        opacity: ['responsive', 'group-hover'],
        order: ['responsive'],
        outline: ['responsive'],
        overflow: ['responsive'],
        padding: ['responsive'],
        placeholderColor: ['responsive'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        rect: ['responsive'],
        resize: ['responsive'],
        reversedTextColor: ['hover'],
        rotate: [],
        scale: ['responsive'],
        skew: [],
        space: ['responsive'],
        sr: ['focus'],
        stroke: ['responsive'],
        strokeWidth: ['responsive'],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColor: ['responsive', 'hover'],
        textDecoration: ['responsive'],
        textShadow: ['responsive'],
        textTransform: ['responsive'],
        toggle: [],
        transform: ['responsive'],
        transformOrigin: [],
        transitionDelay: ['responsive'],
        transitionDuration: ['responsive'],
        transitionProperty: ['responsive'],
        transitionTimingFunction: ['responsive'],
        translate: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        width: ['responsive'],
        wordBreak: ['responsive'],
        zIndex: ['responsive'],
    },
    corePlugins: {
        accessibility: false,
        animation: false,
        backgroundClip: false,
        backgroundImage: false,
        backgroundOpacity: false,
        borderOpacity: false,
        boxSizing: false,
        container: false,
        divideOpacity: false,
        fontVariantNumeric: false,
        gradientColorStops: false,
        gridAutoColumns: false,
        gridAutoFlow: false,
        gridAutoRows: false,
        gridColumn: false,
        gridColumnEnd: false,
        gridColumnStart: false,
        gridRow: false,
        gridRowEnd: false,
        gridRowStart: false,
        gridTemplateColumns: false,
        gridTemplateRows: false,
        justifyItems: false,
        justifySelf: false,
        overscrollBehavior: false,
        placeContent: false,
        placeItems: false,
        placeSelf: false,
        placeholderOpacity: false,
        ringColor: false,
        ringOffsetColor: false,
        ringOffsetWidth: false,
        ringOpacity: false,
        ringWidth: false,
        textOpacity: false,
    },
    plugins: [
        plugins.animate,
        plugins.parentExpanded,
        plugins.rect,
        plugins.sr,
        // require('./config/tailwind/text-shadow'),
    ],
}

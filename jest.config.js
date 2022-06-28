module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/app/$1',
    },
}

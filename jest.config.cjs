module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.cjs'],
    transformIgnorePatterns: [],
    
    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}
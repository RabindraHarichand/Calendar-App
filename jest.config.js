export const testEnvironment = "jest-environment-jsdom";
export const setupFiles = ["./jest.setup.js"];
export const transformIgnorePatterns = [];

// ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
// export const moduleNameMapper = {
//   "\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
// };

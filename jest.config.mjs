export default {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
}

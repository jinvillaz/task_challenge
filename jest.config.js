/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./server/**/*.{js,ts}', '!**/node_modules/**', '!**/vendor/**'],
  roots: ['./__tests__'],
}

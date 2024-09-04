// jest.config.js
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: {
    resultsDir: '.reports/allure-results'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: '.reports/test-report.html'
    }]
  ],
  setupFilesAfterEnv: ["jest-extended/all"]
};

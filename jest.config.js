const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    // Only test ts
    path.resolve(__dirname, 'src/**/__tests__/*.test.ts'),
    path.resolve(__dirname, 'src/__tests__/*.test.ts')
  ]
}

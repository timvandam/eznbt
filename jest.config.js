module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    // Only test ts
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ]
}

module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testPathIgnorePatterns: ['/tests/seeds/'],
  watchPathIgnorePatterns: ['/tests/seeds/'],
  collectCoverageFrom: [
    '**/controller/*.js',
    '**/routes/*.js',
  ],
};

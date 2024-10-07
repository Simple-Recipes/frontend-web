module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // 添加需要被 transform 的包名
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  };
  
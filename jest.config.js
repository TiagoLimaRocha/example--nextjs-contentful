const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@components(.*)$': '<rootDir>/components$1',
    '^@providers(.*)$': '<rootDir>/providers$1',
    '^@hoc(.*)$': '<rootDir>/hoc$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@theme(.*)$': '<rootDir>/theme$1',
    '^@public(.*)$': '<rootDir>/public$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@styles(.*)$': '<rootDir>/styles$1',
    '^@models(.*)$': '<rootDir>/models$1',
    '^@factories(.*)$': '<rootDir>/factories$1',
    '^@controllers(.*)$': '<rootDir>/controllers$1',
    '^@mocks(.*)$': '<rootDir>/__mocks__$1',
    '^@constants(.*)$': '<rootDir>/constants$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

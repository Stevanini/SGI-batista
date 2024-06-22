import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'public/(.*)': '<rootDir>/public/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@atoms/(.*)': '<rootDir>/src/components/atoms/$1',
    '@molecules/(.*)': '<rootDir>/src/components/molecules/$1',
    '@organisms/(.*)': '<rootDir>/src/components/organisms/$1',
    '@configs/(.*)$': '<rootDir>/src/configs/$1',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/node_modules/**',
    '!src/**/*.spec.tsx',
    '!**/types/*.ts',
    '!**/index.ts',
    '!**/loading/**',
    '!src/**/*types.ts',
  ],
  coveragePathIgnorePatterns: ['/src/app/\\[\\[\\.\\.\\.slug\\]\\]/', '/src/interfaces/'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'json', 'html'],
  transformIgnorePatterns: ['node_modules/(?!swiper|ssr-window|dom7)'],
};

export default createJestConfig(config);

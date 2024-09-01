export default {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.tsx", "src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/tests/setupEnv.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};

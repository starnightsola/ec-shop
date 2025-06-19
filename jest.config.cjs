const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['./jest.setup.ts'],
};
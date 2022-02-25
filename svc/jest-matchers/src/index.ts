export * from './register-jest-matchers'

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveRootModuleResourceOfType(type: string): jest.CustomMatcherResult;
    }
  }
}

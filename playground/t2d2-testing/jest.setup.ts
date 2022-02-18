import 'babel-polyfill'
import { registerJestMatchers } from '@mrsauravsahu/t2d2'

registerJestMatchers();

declare global {
   namespace jest {
    interface Matchers<R> {
      hasRootModuleResourceOfType(type: string): jest.CustomMatcherResult;
    }
  }
}

import neostandard from 'neostandard'

export default [
  ...neostandard({
    globals: ['browser', '$', '$$', 'expect'],
  }),
  {
    rules: {
      'sort-imports': ['error']
    }
  }
]

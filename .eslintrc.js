module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tests/tsconfig.json'],
    // allows imports
    sourceType: 'module',
    extraFileExtensions: [".yaml"]
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'arrow-body-style': ['warn', 'as-needed'],
    // curly braces for if, else etc.
    curly: ['error', 'multi-line'],
    eqeqeq: ['error', 'smart'],
    // for...in will normally include properties in prototype chain, require if
    'guard-for-in': ['error'],
    // I don't think we even use labels
    'no-extra-label': ['error'],
    // not sure about this, but replaces tslint's `no-arg` rule
    'no-caller': ['error'],
    // transfered from tslint's `no-conditional-assignment` rule
    'no-cond-assign': ['error'],
    'no-debugger': ['error'],
    // similar to tslint's `no-construct` rule
    'no-new-wrappers': ['error'],
    // replacement for `no-string-throw`
    'no-throw-literal': ['error'],
    'no-unused-expressions': ['error'],
    'no-var': ['error'],
    // this isn't a tslint thing, but have copied over
    'new-parens': ['error'],
    //I dislike the shorthand honestly, it makes me worry I'll accidentally break something if I refactor the name of a variable
    'object-shorthand': ['off'],
    'prefer-arrow-callback': ['error'],
    'prefer-const': ['error'],
    semi: ['error', 'never'],
    'use-isnan': ['error'],
    'no-duplicate-imports': ['error'],
    '@typescript-eslint/array-type': ['error', {
      default: 'array-simple'
    }],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: 'Use {} instead.',
          String: "Use 'string' instead.",
          Number: "Use 'number' instead.",
          Boolean: "Use 'boolean' instead.",
        },
      },
    ],
    // PascalCase for classes
    '@typescript-eslint/naming-convention': ['error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['strictCamelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      //because: https://basarat.gitbook.io/typescript/styleguide#enum
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      {
        selector: 'objectLiteralProperty',
        format: ['PascalCase', 'camelCase'],
      }
  ],

    //these should be done with naming-convention
    //'@typescript-eslint/class-name-casing': ['error'],
    // don't prefix interface names with 'I'
    //'@typescript-eslint/interface-name-prefix': ['error', 'never'],
    // don't conflict <Types> and JSX
    //'@typescript-eslint/no-angle-bracket-type-assertion': ['error'],

    // lose out on typing benefits with any,
    // want this on error, but the sdk seems to like any
    '@typescript-eslint/no-explicit-any': ['warn'],
    '@typescript-eslint/no-empty-interface': ['off'],
    //i don't really care about this to be honest, i think it can
    //be useful to be explicit about it sometimes
    '@typescript-eslint/no-inferrable-types': ['off'],
    // namespaces and modules are outdated, use ES6 style
    '@typescript-eslint/no-namespace': ['error'],
    // use ES6-style imports instead
    //'@typescript-eslint/no-triple-slash-reference': ['error'],
    //dunno why these are off
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    //want this to error but we use it a lot currently :/
    '@typescript-eslint/no-non-null-assertion': ['warn'],
  },
  overrides: [
    {
      "files": ["tests/**/*.ts"],
      "rules": {
        //I'm okay with doing this in test that deal with json responses
        '@typescript-eslint/no-explicit-any': ['warn'],
        //i'm okay with doing this in tests
        '@typescript-eslint/no-non-null-assertion': ['warn'],
      }
    }
  ]
}

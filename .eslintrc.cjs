module.exports = {
   "env": {
      "browser": true,
      "es2021": true
   },
   "extends": "standard-with-typescript",
   "overrides": [
      {
         "env": {
            "node": true
         },
         "files": [
            ".eslintrc.{js,cjs}"
         ],
         "parserOptions": {
            "sourceType": "script"
         }
      }
   ],
   "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
   },
   "rules": {
      'no-return-assign': "off",
      'no-new': 'off',
      '@typescript-eslint/indent': ['error', 3],
      '@typescript-eslint/explicit-function-return-type': "off",
      '@typescript-eslint/space-before-function-paren': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off'
   }
}

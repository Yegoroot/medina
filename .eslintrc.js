{
  "extends": ["react-app", "plugin:prettier/recommended"],
  "rules": {
    "no-console": "warn",
    "quotes": ["error", "single"],
    "semi": ["warn", "never"],
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  }
}

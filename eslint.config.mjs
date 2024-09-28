import globals from "globals";


export default [
  {languageOptions: { globals: globals.browser }},
  {
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended"
    ]
  }
  
];


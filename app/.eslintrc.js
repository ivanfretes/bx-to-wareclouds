module.exports = {
   env: {
      browser: true,
      commonjs: true,
      es2021: true,
   },
   extends: ["airbnb-base", "prettier"],
   parserOptions: {
      ecmaVersion: 12,
   },
   plugins: ["prettier"],
   rules: {
      "prettier/prettier": "error",
      camelcase: 0,
      indent: 3,
   },
};

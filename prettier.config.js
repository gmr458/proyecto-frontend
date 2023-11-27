/** @type {import("prettier").Config} */
const config = {
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    jsxSingleQuote: false,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
    plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;

/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  
  // 플러그인 설정 (순서가 중요합니다!)
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  // Import 정렬 순서 (FSD 구조 반영)
  importOrder: [
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/app/(.*)$",
    "^@/processes/(.*)$",
    "^@/pages/(.*)$",
    "^@/widgets/(.*)$",
    "^@/features/(.*)$",
    "^@/entities/(.*)$",
    "^@/shared/(.*)$",
    "",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
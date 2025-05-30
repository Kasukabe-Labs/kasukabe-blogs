import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable 'any' type checking
      "@typescript-eslint/no-explicit-any": "off",

      // Disable unused imports/variables errors
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // Additional rules you might want to disable
      "@typescript-eslint/no-unused-imports": "off",
    },
  },
];

export default eslintConfig;

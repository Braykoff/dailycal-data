import eslintConfigPrettier from "eslint-config-prettier";
import json from "@eslint/json";
import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import * as mdx from "eslint-plugin-mdx";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

const logicRules = {
  "no-redeclare": "error",
  "no-undef": "error",
  "no-dupe-keys": "error",
  "no-empty-function": "error",
  curly: ["error", "all"],
  "prefer-const": "error",
  "prefer-template": "error",
  "no-var": "error",
  eqeqeq: "error",
  "no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
  "import/no-duplicates": "error",
  "prettier/prettier": "error",
};

const tsLogicRuleOverrides = {
  "no-redeclare": "off",
  "@typescript-eslint/no-redeclare": "error",
  "no-empty-function": "off",
  "@typescript-eslint/no-empty-function": "error",
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
  ],
  "@typescript-eslint/no-explicit-any": "off",
};

const reactJsxRules = {
  "react/self-closing-comp": "error",
  "react/jsx-no-useless-fragment": "error",
  "react/display-name": "off",
};

const srcJs = "src/**/*.js";
const srcTs = "src/**/*.ts";
const srcJsx = "src/**/*.jsx";
const srcTsx = "src/**/*.tsx";
const srcAstro = "src/**/*.astro";
const srcMdx = "src/**/*.mdx";
const srcJson = "src/**/*.json";
const rootConfigs = [
  "*.config.js",
  "*.config.mjs",
  "*.config.ts",
  "astro.config.mjs",
  "eslint.config.js",
  "prettier.config.js",
];

const jsLikeFiles = [srcJs, ...rootConfigs];
const tsLikeFiles = [srcTs, srcTsx];
const astroClientScripts = ["**/*.astro/*.js", "**/*.astro/*.ts"];

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "package-lock.json"],
  },

  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
      react: reactPlugin,
      json,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  ...astro.configs["flat/base"],

  {
    files: jsLikeFiles,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: logicRules,
  },

  {
    files: [srcJsx],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...logicRules,
      ...reactJsxRules,
    },
  },

  {
    files: tsLikeFiles,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    rules: {
      ...logicRules,
      ...tsLogicRuleOverrides,
    },
  },

  {
    files: [srcTsx],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...logicRules,
      ...tsLogicRuleOverrides,
      ...reactJsxRules,
    },
  },

  {
    files: [srcAstro],
    rules: {
      "no-undef": "off",
      ...logicRules,
    },
  },

  {
    files: astroClientScripts,
    rules: logicRules,
  },

  {
    files: [srcMdx],
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {},
    }),
    rules: {
      ...logicRules,
      "mdx/remark": "off",
      "no-unused-expressions": "off",
      "react/react-in-jsx-scope": "off",
    },
  },

  {
    files: [srcMdx],
    ...mdx.flatCodeBlocks,
    rules: {
      ...logicRules,
      ...mdx.flatCodeBlocks.rules,
      "mdx/remark": "off",
      "no-unused-expressions": "off",
    },
  },

  {
    files: [srcJson],
    language: "json/json",
    rules: {
      "json/no-duplicate-keys": "error",
      "prettier/prettier": "error",
    },
  },

  eslintConfigPrettier,
];

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import { FlatCompat } from '@eslint/eslintrc' // 导入FlatCompat
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginReact from "eslint-plugin-react";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
// const compat = new FlatCompat() // 初始化FlatCompat，创建对象compat

export default defineConfig([
  // ============================================
  // 1. 忽略文件（必须放在最前面）
  // ============================================
  {
    ignores: [
      "dist/**",
      "dist-ssr/**",
      "*.config.js",
      "*.config.ts",
      "node_modules/**",
      ".vite/**",
      "pnpm-lock.yaml",
      "package-lock.json"
    ]
  },
// ============================================
  // 2. 基础 JavaScript 配置（只应用到 JS 文件）
  // ============================================
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  
  // ============================================
  // 3. TypeScript 配置（只应用到 TS 文件）
  // ============================================
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"]
  })),
  
  // ============================================
  // 4. React 配置（只应用到 JSX/TSX 文件）
  // ============================================
  {
    files: ["**/*.jsx", "**/*.tsx"],
    ...pluginReact.configs.flat.recommended,
    plugins: {
      // 重要：必须在这里注册所有插件
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh
    },
    settings: {
      react: {
        version: "detect"  // 自动检测 React 版本
      }
    },
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: globals.browser
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      // React Hooks 规则
      ...pluginReactHooks.configs.recommended.rules,
      // React Refresh 规则
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      // 自定义规则
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unknown-property": ["error", {
      ignore: [
        'bg',
        'text',
        'font',
        'p',
        'm',
        'w',
        'h',
        'flex',
        'grid',
        'border',
        'rounded',
        'shadow',
        'opacity',
        'transition',
        'transform',
        // 添加更多 Windi CSS 属性...
      ]
    }]
    }
  },
  
  // ============================================
  // 5. CSS 配置（只应用到 CSS 文件）
  // ============================================
  { 
    files: ["**/*.css"], 
    plugins: { css }, 
    language: "css/css", 
    extends: ["css/recommended"],
    rules: {
    "css/font-family-fallbacks": "off"  // 关闭这个规则
    }
  },
  
  // ============================================
  // 6. Prettier 配置（放到最后，覆盖其他配置）
  // ============================================
  eslintPluginPrettier,
  // 集成.eslintrc-auto-import.json
  // compat.config({ extends: ['./.eslintrc-auto-import.json'] })
]);

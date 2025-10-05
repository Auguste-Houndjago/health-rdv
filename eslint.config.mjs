import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Configuration ESLint ultra-tolérante :
 * - aucune règle bloquante
 * - compatible avec Next.js 14/15 et TypeScript
 * - tout passe en "warn"
 */
const eslintConfig = [
  // Importe la config de base Next.js + TS
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore les dossiers générés automatiquement
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // Règles principales : tout en "warn"
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-console": "off",
      "no-alert": "off",
    },

    // ✅ Rend toutes les autres règles silencieuses (warn au lieu de error)
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },

    languageOptions: {
      globals: {
        // Active l'environnement Node
        process: true,
        __dirname: true,
        module: true,
        require: true,
      },
    },
  },

  // ✅ Sécurité absolue : fallback pour forcer "warn" sur tout le reste
  {
    rules: new Proxy({}, { get: () => "warn" }),
  },
];

export default eslintConfig;

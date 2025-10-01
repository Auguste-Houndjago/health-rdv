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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // --- Typescript ---
      "@typescript-eslint/no-explicit-any": "off", // Évite d'utiliser "any", encourage des types précis
      "@typescript-eslint/no-unused-vars": "warn", // Préviens des variables déclarées mais jamais utilisées
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // Évite d’utiliser `!` sur des chaînes optionnelles
      "@typescript-eslint/explicit-module-boundary-types": "off", // Oblige à définir les types de retour des fonctions exportées

      // --- Bonnes pratiques JS ---
      "no-console": "off", // Décourage l’utilisation de console.log (mais ne l’interdit pas)
      "no-alert": "off", // Décourage l’utilisation de alert(), confirm(), prompt()
      "no-debugger": "warn", // Empêche d’oublier un debugger dans le code
      // "default-case": "warn", // Obliger un "default" dans les switch
      // "no-else-return": "warn", // Supprimer les else inutiles après un return
      // "no-empty-function": "warn", // Empêche les fonctions vides inutiles
      // "no-eval": "warn", // Interdit eval() (dangereux pour la sécurité)
      // "no-implied-eval": "warn", // Interdit setTimeout/setInterval avec des strings
      // "no-multi-spaces": "warn", // Supprime les espaces multiples
      // "no-new-func": "warn", // Interdit new Function() (dangereux comme eval)
      // "no-return-assign": "warn", // Interdit les return avec une assignation
      // "no-sequences": "warn", // Interdit l’opérateur virgule
      // "no-unused-expressions": "warn", // Empêche des expressions inutiles (ex: "a && b" tout seul)
      // "no-useless-concat": "warn", // Interdit concaténer des strings inutiles
      // "no-useless-return": "warn", // Interdit les return vides inutiles
      // "require-await": "warn", // Empêche les fonctions async sans await

      // --- Style & cohérence ---
      // "semi": ["warn", "always"], // Imposer le point-virgule
      // "quotes": ["warn", "double", { avoidEscape: true }], // Imposer les guillemets doubles
      // "indent": ["warn", 2, { SwitchCase: 1 }], // Indentation de 2 espaces, 1 niveau dans switch
      // "comma-dangle": ["warn", "always-multiline"], // Virgule finale dans les objets/arrays multilignes
      // "object-curly-spacing": ["warn", "always"], // Espaces à l’intérieur des accolades { foo: bar }
      // "array-bracket-spacing": ["warn", "never"], // Pas d’espaces dans [ 1, 2 ]
      // "space-before-blocks": "warn", // Exige un espace avant les { de bloc
      // "keyword-spacing": ["warn", { before: true, after: true }], // Espaces autour des mots-clés (if, else…)
      // "no-trailing-spaces": "warn", // Interdit les espaces en fin de ligne
      // "eol-last": ["warn", "always"], // Exige une ligne vide à la fin des fichiers

      // --- React / Next.js ---
      // "react/jsx-uses-react": "warn", // Préviens quand React est importé mais pas utilisé
      // "react/jsx-uses-vars": "warn", // Préviens quand une variable JSX n’est pas utilisée
      // "react/react-in-jsx-scope": "warn", // Vérifie que React est importé (utile avant React 17)
      // "react/jsx-no-duplicate-props": "warn", // Empêche d’avoir deux props identiques dans un JSX
      // "react/jsx-no-undef": "warn", // Empêche d’utiliser des composants non définis
      // "react/jsx-key": "warn", // Oblige un "key" dans les listes React
      // "react-hooks/rules-of-hooks": "warn", // Vérifie l’usage correct des hooks
      // "react-hooks/exhaustive-deps": "warn", // Vérifie les dépendances dans useEffect/useCallback
    },
  },
  {
    rules: new Proxy({}, { get: () => "warn" }), // toutes les autres règles deviennent ---> "off"| "warn"| "error"
    env: {
      node: true,
    },
  },
];

export default eslintConfig;

# Elysium Scale — Site d'affiliation

## Projet

Site d'affiliation **Elysium Scale** construit avec **Astro**. Objectif : générer du trafic qualifié et convertir via des liens d'affiliation. Le logo et la charte graphique sont fournis manuellement (ne pas générer de logo ni de palette de couleurs).

## Stack technique

- **Framework** : Astro (dernière version stable)
- **Langage** : TypeScript strict (`strict: true` dans tsconfig)
- **Styling** : Tailwind CSS v4 (intégration Astro officielle)
- **Déploiement** : à définir (Vercel, Netlify ou Cloudflare Pages)
- **Package manager** : pnpm

## Commandes

```bash
pnpm install          # Installer les dépendances
pnpm dev              # Serveur de dev (localhost:4321)
pnpm build            # Build de production
pnpm preview          # Prévisualiser le build
pnpm astro check      # Vérification types + diagnostics Astro
pnpm lint             # Linter (ESLint)
pnpm format           # Formater (Prettier)
```

## Structure du projet

```
src/
├── assets/           # Images, logo, fichiers de charte graphique
├── components/       # Composants Astro réutilisables (.astro)
│   ├── ui/           # Boutons, cartes, badges, CTA
│   ├── layout/       # Header, Footer, Sidebar, Navigation
│   └── sections/     # Blocs de page (Hero, Features, Comparatif, FAQ)
├── content/          # Content Collections Astro (articles, produits, catégories)
│   ├── articles/     # Articles de blog / guides (.md ou .mdx)
│   └── products/     # Fiches produits affiliés (.md ou .mdx)
├── layouts/          # Layouts Astro (BaseLayout, ArticleLayout, ProductLayout)
├── pages/            # Routes du site (file-based routing)
│   ├── index.astro
│   ├── blog/
│   └── produits/
├── styles/           # CSS global, variables Tailwind, tokens de la charte
├── utils/            # Fonctions utilitaires (formatage, helpers SEO, liens affiliés)
├── data/             # Données statiques (JSON/YAML : comparatifs, tableaux de prix)
└── config/           # Configuration du site (site metadata, navigation, liens sociaux)
```

## Conventions de code

### Astro

- Composants Astro en PascalCase : `ProductCard.astro`, `HeroSection.astro`
- Utiliser les Content Collections pour tout contenu éditorial (articles, produits)
- Pas de framework JS côté client sauf besoin interactif explicite — privilégier le HTML statique
- Si interactivité nécessaire, utiliser des `<script>` inline ou des composants avec `client:visible`/`client:idle`
- Toujours typer les props avec une interface TypeScript dans le frontmatter

### Fichiers & nommage

- Pages et slugs en kebab-case : `guide-achat.astro`, `meilleur-vpn.md`
- Composants en PascalCase : `AffiliateLink.astro`
- Utilitaires en camelCase : `formatPrice.ts`, `buildAffiliateUrl.ts`
- Un composant = un fichier. Pas de composants multiples par fichier

### TypeScript

- `strict: true` obligatoire
- Pas de `any` — utiliser `unknown` + type guards si nécessaire
- Interfaces pour les props de composants, types pour les unions/utilitaires

### Tailwind

- Utiliser les classes utilitaires Tailwind directement dans le markup
- Pas de `@apply` sauf dans `styles/` pour les styles très réutilisés
- Les couleurs et polices de la charte sont définies dans la config Tailwind (`tailwind.config.mjs`)
- Respecter les tokens de la charte graphique fournie — ne jamais inventer de couleurs

## SEO & Performance (critique pour l'affiliation)

- Chaque page a un `<title>` unique et une `<meta name="description">` unique
- Utiliser le composant `<SEO>` dans chaque layout
- Images : toujours utiliser `<Image />` d'Astro (optimisation automatique), attributs `alt` obligatoires
- Liens affiliés : toujours passer par la fonction utilitaire `buildAffiliateUrl()` — ne jamais coder en dur
- Attributs `rel="nofollow sponsored"` sur tous les liens affiliés
- Lazy loading pour les images sous le fold
- Scores Lighthouse cibles : Performance ≥ 95, SEO = 100, Accessibilité ≥ 90

## Liens d'affiliation

- Centraliser tous les liens affiliés dans `src/data/affiliateLinks.ts`
- Structure : `{ id, program, baseUrl, trackingParams, label }`
- Utiliser `buildAffiliateUrl(id)` dans les composants, jamais d'URL en dur
- Disclosure obligatoire sur chaque page contenant des liens affiliés (mention légale)

## Contenu (Content Collections)

### Schema articles (`src/content/config.ts`)

```ts
articles: defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("Elysium Scale"),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})
```

### Schema produits (`src/content/config.ts`)

```ts
products: defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    rating: z.number().min(0).max(5),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    affiliateId: z.string(),
    price: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
})
```

## Charte graphique

Le logo et la charte graphique (couleurs, typographies, espacements) sont fournis par le client dans `src/assets/`. Les tokens correspondants sont configurés dans `tailwind.config.mjs`. **Ne jamais générer, modifier ou remplacer ces assets.**

## Accessibilité

- HTML sémantique (`<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- Contraste texte/fond conforme WCAG AA minimum
- Navigation clavier fonctionnelle
- Attributs ARIA uniquement quand le HTML sémantique ne suffit pas

## Tests

- `pnpm astro check` avant chaque commit (zéro erreur)
- Vérifier les liens cassés avec un outil dédié avant déploiement
- Tester chaque page sur Lighthouse (seuils ci-dessus)

## Git

- Branches : `feature/nom-feature`, `fix/nom-fix`, `content/nom-article`
- Messages de commit en français, format conventionnel : `feat: ajout page comparatif VPN`
- Ne jamais commit sur `main` directement — passer par des PR

## Ce qu'il ne faut PAS faire

- Ne pas générer de logo, favicons ou éléments de charte — ils sont fournis
- Ne pas utiliser de couleurs ou polices hors de la charte définie dans Tailwind
- Ne pas coder d'URL affiliée en dur — toujours passer par `buildAffiliateUrl()`
- Ne pas omettre les mentions légales d'affiliation
- Ne pas utiliser de frameworks JS lourds (React/Vue/Svelte) sans justification explicite
- Ne pas créer de pages sans balises SEO complètes

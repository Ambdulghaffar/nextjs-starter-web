# DESIGN.md — Règles de design du template

> **À lire avant toute génération ou modification d'UI.**
>
> Ce projet change régulièrement de thème : couleurs, rayons, ambiance. Aucune couleur ne doit être écrite en dur dans un composant. Les composants utilisent les **tokens sémantiques** (`bg-primary`, `bg-brand-1`, `text-muted-foreground`, `border-border`, etc.) définis dans `themes/theme.css`.

---

## 1. Règle d'or

| Interdit dans les composants                                                           | Autorisé                                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `text-blue-300`, `bg-red-500`, `border-slate-200`, `bg-emerald-50`, `bg-gray-100`…     | Tokens sémantiques, `brand-1` à `brand-3`                     |
| `text-white`, `bg-black`, `text-black`                                                 | `text-primary-foreground`, `bg-background`, `text-foreground` |
| `bg-[#3b82f6]`, `text-[oklch(...)]`, `style={{ color: "..." }}`, `rgb()`, `hsl()`, hex | Un token ou un token avec opacité : `bg-primary/10`           |
| `rounded-[12px]`, `rounded-[0.75rem]`                                                  | `rounded-md`, `rounded-lg`, `rounded-xl`, etc.                |
| `dark:bg-gray-900`, `dark:text-white` quand un token convient                          | Les tokens sémantiques, qui s'adaptent au mode sombre         |
| `bg-success`, `text-warning`, `bg-info` (ces tokens n'existent plus)                   | Voir « Messages d'état » (section 3)                          |

**Objectif :** une interface moderne, cohérente et vivante, sans la rendre uniformément blanche, grise ou monochrome.

**Principe :** les couleurs non neutres sont peu nombreuses et chacune a un rôle clair.

---

## 2. Architecture des couleurs

Deux couches :

1. **Tokens sémantiques** : `:root` et `.dark` dans `themes/theme.css`. Ils décrivent des rôles.
2. **Pont Tailwind** : `@theme inline` dans `globals.css`. Il expose les tokens comme classes (`bg-primary`, `bg-brand-1`…).

Il n'y a **pas de palettes de nuances** (`brand-50` à `brand-950`, `gray-*`) : chaque thème ne définit que des tokens, avec des valeurs `oklch(...)` directes.

| Fichier                 | Rôle                                                                                 | Modifiable pour changer de thème ?            |
| ----------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------- |
| `themes/theme.css`      | Tokens sémantiques (clair et sombre)                                                 | Oui                                           |
| `themes/variants/*.css` | Variantes de thème prêtes à l'emploi                                                 | Oui                                           |
| `themes/tailadmin.css`  | Styles hérités de TailAdmin. Ne doit définir aucune couleur en dur ni aucune palette | Non                                           |
| `globals.css`           | Imports, `@theme inline`, mapping des tokens                                         | Seulement pour mapper un nouveau token        |
| Composants et pages     | Structure et apparence                                                               | Utiliser les tokens, jamais de couleur en dur |

**Ordre des imports dans `globals.css` :** `tailwindcss`, puis `theme.css`, puis `tailadmin.css`, puis les variantes. `tailadmin.css` ne doit utiliser que des tokens (`@apply bg-primary`, jamais `bg-brand-500`).

**Familles de couleurs :**

| Famille            | Tokens                                                                                                   | Usage                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Neutres            | `background`, `foreground`, `card`, `popover`, `muted`, `secondary`, `accent`, `border`, `input`, `ring` | Structure de l'interface (80 à 90 % de l'écran). Sans couleur    |
| Marque             | `primary`                                                                                                | Action principale, lien, élément actif, focus                    |
| Danger             | `destructive`                                                                                            | Erreur, suppression. Sens fixe, même teinte dans tous les thèmes |
| Accents de couleur | `brand-1`, `brand-2`, `brand-3` (+ `-foreground`)                                                        | Zones colorées décoratives ou de catégorie. Suivent le thème     |
| Données            | `chart-1` à `chart-5`                                                                                    | Graphiques uniquement                                            |

Les seules couleurs **non neutres** de base sont donc `primary`, `destructive` et `brand-1` à `brand-3`. Il n'y a pas de tokens `success`, `warning` ni `info`.

**Rôle de `secondary` et `accent` (convention shadcn) :** ce sont des **surfaces neutres**. `secondary` sert aux boutons secondaires et badges discrets. `accent` sert au survol et à la sélection (items de menu, ghost buttons, Select, Command, Tabs). Ce ne sont pas des couleurs de marque : ne pas les colorer pour « varier » l'interface.

---

## 3. Tokens et classes utilitaires

### Surfaces et texte

| Rôle                                | Classes                              |
| ----------------------------------- | ------------------------------------ |
| Fond de page                        | `bg-background text-foreground`      |
| Carte ou panneau                    | `bg-card text-card-foreground`       |
| Menu, popover, dropdown, tooltip    | `bg-popover text-popover-foreground` |
| Zone discrète, skeleton             | `bg-muted`                           |
| Texte secondaire, aide, placeholder | `text-muted-foreground`              |
| Survol ou sélection d'un élément    | `bg-accent text-accent-foreground`   |

### Actions

| Rôle                           | Classes                                                        |
| ------------------------------ | -------------------------------------------------------------- |
| Action principale              | `bg-primary text-primary-foreground hover:bg-primary/90`       |
| Action secondaire              | `bg-secondary text-secondary-foreground hover:bg-secondary/80` |
| Lien, icône ou texte de marque | `text-primary`                                                 |
| Fond léger de marque           | `bg-primary/10 text-primary`                                   |
| Action destructive             | `bg-destructive text-destructive-foreground`                   |

### Danger

| Usage          | Classes                                      |
| -------------- | -------------------------------------------- |
| Fond plein     | `bg-destructive text-destructive-foreground` |
| Fond léger     | `bg-destructive/10 text-destructive`         |
| Champ invalide | `border-destructive`, `aria-invalid`         |

`destructive` garde son sens (erreur, suppression). Ne jamais l'utiliser comme couleur décorative, sinon un bouton « Supprimer » ne se distingue plus du reste.

### Accents `brand-1` à `brand-3`

Trois couleurs **sans sens fixe**, redéfinies par chaque thème (en clair et en sombre). Elles servent à colorer une zone, une carte de catégorie, une icône ou un badge, pour éviter une interface monochrome.

| Usage               | Classes                                                        |
| ------------------- | -------------------------------------------------------------- |
| Fond plein          | `bg-brand-1 text-brand-1-foreground`                           |
| Fond léger          | `bg-brand-1/10 text-brand-1` (pour `brand-3`, voir ci-dessous) |
| Icône dans un carré | `bg-brand-2/10 text-brand-2`                                   |
| Bordure d'accent    | `border-t-2 border-brand-3`                                    |

**Règles :**

1. **Pas de sens fixe.** `brand-1` n'est ni « succès » ni « info » : ne jamais l'utiliser pour communiquer un état. Un thème peut changer sa teinte.
2. **Une catégorie garde toujours le même accent** dans toute l'application (par exemple « Revenus » = `brand-1` partout).
3. **`brand-3` est clair en mode clair** : il ne se lit pas en texte sur fond clair. Pour un fond léger, utiliser `bg-brand-3/15 text-foreground`. En mode sombre, `text-brand-3` est lisible.
4. Utiliser le `-foreground` associé sur un fond plein (`bg-brand-2 text-brand-2-foreground`), jamais `text-white`.
5. Limiter à **une seule teinte d'accent par composant**.
6. Ne pas ajouter de `brand-4`, `brand-5`… sans décision explicite (voir section 6).

### Messages d'état (succès, avertissement, information)

Il n'y a pas de token dédié. Le sens passe par **l'icône et le libellé**, pas par la couleur :

| Message       | Rendu                                                                               |
| ------------- | ----------------------------------------------------------------------------------- |
| Succès        | `bg-muted text-foreground` ou `bg-card border-border`, avec une icône de validation |
| Avertissement | Idem, avec une icône d'alerte et un texte explicite                                 |
| Information   | `bg-primary/10 text-primary`, avec une icône d'information                          |
| Erreur        | `bg-destructive/10 text-destructive`, avec une icône d'erreur                       |

Ne pas utiliser `brand-1..3` pour ces messages : un utilisateur y verrait un sens qui change avec le thème.

### Diversifier sans surcharger

Ne pas utiliser `primary` pour tout. La variété vient de :

1. **Accents** : une carte « revenus » en `bg-brand-1/10`, « commandes » en `bg-brand-2/10`, « général » en `bg-primary/10`.
2. **Niveaux de surface** : `background`, `card`, `muted`, `popover` ont des luminosités différentes.
3. **Marque en teinte douce** : `bg-primary/10 text-primary` pour les bannières et en-têtes de section.
4. **Détails** : fine bordure colorée en haut d'une carte, icône dans un petit carré teinté, badge, dégradé très léger.

**Règles de composition :**

1. Une couleur doit avoir une fonction (action, danger, catégorie). Pas de couleur pour décorer au hasard.
2. Réserver `primary` aux éléments prioritaires.
3. Limiter à **une seule teinte d'accent par composant**.
4. Garder les fonds importants sobres quand plusieurs accents sont présents.
5. Vérifier la lisibilité en mode clair et sombre.

### Contours et focus

| Rôle                  | Classes                                                              |
| --------------------- | -------------------------------------------------------------------- |
| Bordure ou séparateur | `border-border`, `divide-border`                                     |
| Bordure de champ      | `border-input`                                                       |
| Anneau de focus       | `focus-visible:ring-ring/50 focus-visible:ring-[3px]` ou `ring-ring` |

Les bordures et contours globaux sont déjà définis dans `@layer base`. Un simple `border` suffit souvent.

### Sidebar

- Fond : `bg-sidebar text-sidebar-foreground`
- Bordure : `border-sidebar-border`
- Élément actif : `bg-sidebar-primary text-sidebar-primary-foreground` (lié à `primary`)
- Survol : `bg-sidebar-accent text-sidebar-accent-foreground`
- Focus : `ring-sidebar-ring`

### Graphiques

`fill-chart-1` à `fill-chart-5`, `stroke-chart-*`, `bg-chart-*`.

**Réservés aux visualisations de données.** Ne jamais les utiliser pour des badges, boutons ou cartes d'interface (pour cela : `brand-1..3`). Garder un ordre cohérent entre les séries et ne pas s'appuyer sur la couleur seule (légendes, étiquettes, formes).

### Forme et typographie

- Rayons : `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, etc.
- Polices : `font-sans`, `font-mono`, `font-heading`.

---

## 4. Mode A — « Voici un composant »

Entrée : du code Tailwind, un composant shadcn, un composant TailAdmin, du HTML ou une description.

### Procédure

1. Lire `themes/theme.css` et `globals.css`.
2. Conserver la structure, les espacements, la typographie et les états, sauf demande de refonte.
3. Remplacer chaque couleur par un token correspondant à son **rôle** (action, danger, surface, texte, catégorie).
4. Supprimer les variantes `dark:` de couleur devenues inutiles.
5. Remplacer les rayons arbitraires par `rounded-*`.
6. Vérifier `hover`, `focus-visible`, `disabled` et `aria-invalid`.
7. Vérifier le rendu en mode clair et sombre.

### Table de conversion

| Code d'origine                                      | Devient                                                  |
| --------------------------------------------------- | -------------------------------------------------------- |
| `bg-white dark:bg-gray-900`                         | `bg-card` ou `bg-background` selon le rôle               |
| `text-gray-900 dark:text-white`                     | `text-foreground`                                        |
| `text-gray-500` ou `text-gray-400`                  | `text-muted-foreground`                                  |
| `bg-gray-50` ou `bg-gray-100`                       | `bg-muted`                                               |
| `border-gray-200 dark:border-gray-800`              | `border-border`                                          |
| `bg-blue-600 text-white hover:bg-blue-700` (action) | `bg-primary text-primary-foreground hover:bg-primary/90` |
| `bg-blue-50 text-blue-600` (marque)                 | `bg-primary/10 text-primary`                             |
| `bg-blue-50 text-blue-600` (information)            | `bg-primary/10 text-primary` avec une icône d'info       |
| `bg-green-50 text-green-600` (catégorie)            | `bg-brand-1/10 text-brand-1`                             |
| `bg-green-50 text-green-600` (message de succès)    | `bg-muted text-foreground` avec une icône de validation  |
| `bg-yellow-50 text-yellow-700` (catégorie)          | `bg-brand-3/15 text-foreground`                          |
| `bg-yellow-50 text-yellow-700` (avertissement)      | `bg-muted text-foreground` avec une icône d'alerte       |
| `bg-purple-50 text-purple-600` (catégorie)          | `bg-brand-2/10 text-brand-2`                             |
| `text-red-500`, `bg-red-50`                         | `text-destructive`, `bg-destructive/10`                  |
| `ring-blue-500`                                     | `ring-ring`                                              |
| `hover:bg-gray-100` sur un item de menu             | `hover:bg-accent hover:text-accent-foreground`           |
| `shadow-black/10`                                   | `shadow-sm` ou `shadow-md`                               |
| `bg-success`, `text-warning`, `bg-info` (anciens)   | Voir « Messages d'état » ou accents `brand-1..3`         |

Pour une couleur verte, jaune ou violette, déterminer son rôle : **catégorie** donne un accent `brand-1..3`, **état** donne l'icône et le libellé sur surface neutre.

### Exemple

Avant :

```tsx
<div className="rounded-[12px] border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
  <h3 className="text-gray-900 dark:text-white">Revenus</h3>
  <p className="text-green-600">+12 % ce mois</p>
  <button className="bg-blue-600 text-white hover:bg-blue-700">Voir</button>
</div>
```

Après :

```tsx
<div className="border-border bg-card text-card-foreground rounded-xl border p-6">
  <h3 className="text-foreground">Revenus</h3>
  <p className="text-brand-1">+12 % ce mois</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">
    Voir
  </button>
</div>
```

---

## 5. Mode B — « Voici une image »

### B1 — L'image sert de maquette

L'image fournit la structure, la hiérarchie, les espacements et les formes. Ses couleurs ne sont pas reproduites littéralement : elles sont traduites en tokens selon leur rôle.

| Élément observé                    | Token à privilégier                                                   |
| ---------------------------------- | --------------------------------------------------------------------- |
| Fond général                       | `background`                                                          |
| Carte ou panneau                   | `card`                                                                |
| Action dominante                   | `primary`                                                             |
| Action secondaire, badge discret   | `secondary`                                                           |
| Survol, sélection                  | `accent`                                                              |
| Zone discrète                      | `muted`                                                               |
| Texte secondaire                   | `muted-foreground`                                                    |
| Traits et champs                   | `border`, `input`                                                     |
| Erreur ou suppression              | `destructive`                                                         |
| Succès, avertissement, information | Surface neutre + icône + libellé (pas de token dédié)                 |
| Barre latérale                     | `sidebar-*`                                                           |
| Séries d'un graphique              | `chart-1` à `chart-5`                                                 |
| Carte ou zone colorée (catégorie)  | `brand-1` à `brand-3`, en teinte douce : `bg-brand-1/10 text-brand-1` |
| Bannière aux couleurs de la marque | `primary` en teinte douce : `bg-primary/10 text-primary`              |

Si la maquette utilise plusieurs couleurs, les reproduire par des teintes douces de `primary` et de `brand-1..3` plutôt que de tout transformer en `primary`. S'il y a plus de trois couleurs de catégorie, regrouper les catégories voisines.

### B2 — L'image doit définir le thème

Si la demande est de changer l'apparence globale du projet à partir d'une image, passer au mode C.

---

## 6. Quand un token manque

Ne pas remplacer un token manquant par une couleur Tailwind arbitraire.

`primary`, `secondary`, `accent`, `muted`, `destructive`, `brand-1` à `brand-3`, `chart-*` et `sidebar-*` existent déjà. `success`, `warning` et `info` sont **volontairement absents** : ne pas les recréer. Un nouveau token se justifie seulement si **un composant précis en a besoin et qu'aucun token existant ne convient**. Ne pas ajouter de tokens par rang (`brand-4`, `tertiary`, `complement`) ni de variantes « douces » (`brand-1-soft`), qui s'obtiennent avec `/10`.

Procédure, par exemple pour un token `highlight` :

1. Dans `themes/theme.css`, définir le token et son `-foreground` dans `:root` **et** `.dark`.
2. Dans `globals.css`, bloc `@theme inline`, ajouter :

```css
--color-highlight: var(--highlight);
--color-highlight-foreground: var(--highlight-foreground);
```

3. L'ajouter à **toutes** les variantes de thème si sa valeur doit changer selon le thème (c'est le cas des `brand-1..3`).

---

## 7. Mode C — Changer le thème de tout le projet

Entrée : un brief, une image ou une maquette Figma.

Objectif : modifier `themes/theme.css` ou créer une variante dans `themes/variants/`, sans toucher aux composants.

### Brief à remplir

```md
- Nom du thème :
- Couleur principale :
- Ambiance : sobre / chaleureuse / tech / nature / luxe…
- Teinte des gris : neutres / teintés vers la couleur principale
- Arrondis : carrés / standards / très arrondis
- Mode sombre à soigner : oui / non
- Accents brand-1 à brand-3 imposés (sinon : à choisir) :
- Image ou maquette de référence :
```

### Procédure

1. Convertir la couleur principale en OKLCH.
2. Définir les tokens dans `:root` avec des valeurs `oklch(...)` directes : `primary` est la couleur du thème ; les neutres (`background`, `card`, `muted`, `secondary`, `accent`, `border`) ont la même teinte `H` que `primary` avec une chroma très faible, ou restent neutres (`C` = 0).
3. Définir `.dark` : `primary` devient une version **plus claire** de la marque, avec un `primary-foreground` sombre. Les surfaces sont plus sombres, avec `card` plus clair que `background`.
4. Harmoniser `chart-1` à `chart-5` (mêmes teintes en clair et en sombre, plus lumineuses en sombre).
5. **Choisir `brand-1` à `brand-3`** : trois teintes différentes entre elles, éloignées de la teinte de `primary` et de celle de `destructive` (environ 40° d'écart minimum), pour qu'on ne les confonde pas.
   - Mode clair : `brand-1` et `brand-2` foncés (`L` autour de 0,5 à 0,57) avec `-foreground` clair ; `brand-3` clair (`L` autour de 0,78) avec `-foreground` sombre.
   - Mode sombre : les trois plus clairs (`L` autour de 0,74 à 0,8) avec `-foreground` sombre.
6. **Garder `destructive` dans sa teinte** (rouge). Ne le modifier que si le brief l'impose.
7. Vérifier les contrastes (voir ci-dessous).

### Contrastes à vérifier dans les deux modes

| Paire                                                                | Minimum               |
| -------------------------------------------------------------------- | --------------------- |
| `foreground` / `background`, `card`, `popover`                       | 4,5:1                 |
| `muted-foreground` / `background`, `card`, `muted`                   | 4,5:1                 |
| `primary-foreground` / `primary`                                     | 4,5:1                 |
| `secondary-foreground` / `secondary`, `accent-foreground` / `accent` | 4,5:1                 |
| `destructive-foreground` / `destructive`                             | 4,5:1                 |
| `brand-1-foreground` / `brand-1`                                     | 4,5:1                 |
| `brand-2-foreground` / `brand-2`                                     | 4,5:1                 |
| `brand-3-foreground` / `brand-3`                                     | 4,5:1                 |
| `ring` et `border` / `background`                                    | 3:1 (focus et champs) |

Pour les teintes douces (`bg-brand-1/10 text-brand-1`), vérifier aussi le texte sur le fond teinté.

Ne pas modifier `globals.css`, `tailadmin.css` ou les composants si ce n'est pas nécessaire. Si une couleur en dur empêche le changement de thème, corriger le composant selon le mode A.

---

## 8. Vérification avant de rendre le travail

Adapter le dossier `src` à la structure du projet.

```bash
grep -rEn "\b(bg|text|border|ring|outline|fill|stroke|from|via|to|divide|decoration|caret|accent|shadow)-(slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}" src

grep -rEn "\b(bg|text|border|ring|fill|stroke)-(white|black)\b" src

grep -rEn "\[#|\[oklch|\[rgb|\[hsl|#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(" src --include="*.tsx" --include="*.ts"

grep -rEn "rounded-\[" src

grep -rEn "\b(bg|text|border|ring|fill|stroke|from|via|to)-(success|warning|info)\b" src

grep -rEn "(bg|text|border)-chart-" src --exclude-dir=charts
```

Les deux dernières commandes détectent les anciens tokens `success`, `warning` et `info` (qui doivent disparaître) et les `chart-*` utilisés hors des graphiques. Adapter `--exclude-dir` au dossier qui contient les graphiques.

### Checklist finale

- [ ] Les couleurs viennent des tokens sémantiques ou de `brand-1` à `brand-3`.
- [ ] `primary` est réservé aux actions et à l'identité, pas à tout l'écran.
- [ ] `secondary` et `accent` restent des surfaces neutres.
- [ ] `destructive` n'est utilisé que pour l'erreur et la suppression.
- [ ] `brand-1` à `brand-3` servent aux catégories et aux zones colorées, jamais à un message d'état.
- [ ] Aucun `success`, `warning` ni `info` dans le code, `theme.css`, `globals.css` et les variantes.
- [ ] Les messages d'état se distinguent par l'icône et le libellé.
- [ ] La variété vient des accents en teinte douce (`/10`, `/15`), de niveaux de surface et de détails, pas de couleurs saturées en fond.
- [ ] `chart-*` n'est utilisé que dans des graphiques.
- [ ] Les états `hover`, `focus-visible`, `disabled` et `aria-invalid` sont traités.
- [ ] Les rayons viennent de l'échelle `rounded-*`.
- [ ] Le rendu est vérifié en mode clair et sombre.
- [ ] Tout nouveau token est défini dans `theme.css` (clair et sombre), mappé dans `globals.css` et ajouté aux variantes concernées.

---

## 9. Durcissement optionnel

Il est possible de restreindre les palettes Tailwind disponibles en réinitialisant leur namespace dans `@theme` (par exemple `--color-*: initial;`) et en ne redéclarant que les couleurs autorisées. À tester sur le template avant généralisation : cela peut supprimer des classes utilisées par des composants existants.

**Principe final :** une interface cohérente n'est pas une interface monochrome. Les neutres posent la structure, `primary` porte l'action, `destructive` signale le danger, `brand-1` à `brand-3` apportent la couleur, et tout reste compatible avec les thèmes et le mode sombre.

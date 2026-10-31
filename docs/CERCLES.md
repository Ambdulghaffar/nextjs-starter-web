# CERCLES.md — Cercles décoratifs en arrière-plan

> **À lire quand on demande des cercles, ronds ou bulles décoratifs.**
> Complète `DESIGN.md` : mêmes règles (tokens uniquement, aucune couleur en dur).

---

## 1. Demande rapide

Il suffit de dire, dans n'importe quel ordre :

```
Cercles : <nombre>
Style   : plein | anneau | mixte            (défaut : mixte)
Zone    : haut-droite | bas-gauche | coins | partout   (défaut : coins)
Taille  : petits | variés | grands          (défaut : variés)
Intensité : discret | normal | marqué       (défaut : normal)
```

Exemples :

- « 7 cercles » → 7 cercles, mixte, coins, variés, normal
- « 5 cercles pleins discrets en haut à droite »
- « 9 anneaux grands partout, marqué »

Tout ce qui n'est pas précisé prend la valeur par défaut. **Ne pas poser de question**, générer directement.

---

## 2. Règles obligatoires

1. **Fond homogène** : une seule couleur unie. Jamais de `from-`, `via-`, `to-`, `bg-linear-*`, `bg-gradient-*`.
2. **Couleur des cercles = token + opacité**, jamais de hex, `oklch()`, `white`, `black`.
3. **Pas de `blur`** ni de motif de points, sauf demande explicite.
4. **Conteneur** : `relative isolate overflow-hidden` (les cercles ne débordent pas et restent derrière le contenu).
5. **Chaque cercle** : `aria-hidden`, `absolute`, `-z-10`, `rounded-full`.
6. **Positions** en `top/right/bottom/left` avec valeurs de l'échelle Tailwind ou fractions (`right-1/3`). Valeurs négatives pour les cercles qui dépassent du bord.
7. **Tailles** avec `size-*` (échelle Tailwind), pas de `w-[..] h-[..]`.
8. **Rayons** : `rounded-full` uniquement pour les cercles.
9. Pas de cercle sous du texte long : garder les gros cercles dans les coins.

---

## 3. Couleur selon le fond

| Fond du conteneur                              | Cercles pleins                        | Anneaux                        |
| ---------------------------------------------- | ------------------------------------- | ------------------------------ |
| `bg-primary` (texte `text-primary-foreground`) | `bg-primary-foreground/10` à `/15`    | `border-primary-foreground/20` |
| `bg-primary/10`, `bg-muted`, `bg-card` (clair) | `bg-primary/10` à `/15`               | `border-primary/20`            |
| `bg-brand-1` (texte `text-brand-1-foreground`) | `bg-brand-1-foreground/10`            | `border-brand-1-foreground/20` |
| `bg-brand-2`, `bg-brand-3`                     | idem avec `-foreground` correspondant | idem                           |

Une seule famille de couleur par composant (voir `DESIGN.md`).

---

## 4. Intensité

| Intensité | Pleins        | Anneaux       |
| --------- | ------------- | ------------- |
| discret   | `/5` à `/10`  | `/10` à `/15` |
| normal    | `/10` à `/15` | `/15` à `/20` |
| marqué    | `/15` à `/25` | `/25` à `/35` |

Anneau = `border-2` (ou `border-4` pour « marqué »).

---

## 5. Échelle des tailles

| Taille | Classes               | Usage                            |
| ------ | --------------------- | -------------------------------- |
| XS     | `size-6`              | point                            |
| S      | `size-10` à `size-16` | petite bulle                     |
| M      | `size-28` à `size-48` | cercle moyen                     |
| L      | `size-72` à `size-80` | grand cercle qui dépasse du coin |

- **petits** : XS et S seulement
- **variés** : mélange de S, M et L (1 ou 2 L maximum)
- **grands** : M et L seulement

---

## 6. Zones et positions types

| Zone        | Où placer                                                        | Exemples de classes                                       |
| ----------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| haut-droite | coin haut droit, le L dépasse                                    | `-top-24 -right-16`, `top-10 right-24`, `top-6 right-1/3` |
| bas-gauche  | coin bas gauche, le L dépasse                                    | `-bottom-28 -left-20`, `-bottom-10 left-1/4`              |
| bas-droite  | petits et moyens                                                 | `right-12 bottom-12`, `right-1/4 bottom-6`                |
| haut-gauche | idem haut-droite en miroir                                       | `-top-20 -left-16`, `top-12 left-24`                      |
| coins       | répartir entre haut-droite, bas-gauche et bas-droite             |                                                           |
| partout     | répartir sur les 4 coins et le centre-haut/bas, jamais au centre |                                                           |

**Répartition** : ne jamais mettre tous les cercles au même endroit. Alterner plein / anneau et grand / petit entre voisins.

---

## 7. Recettes prêtes (fond `bg-primary`)

### 3 cercles

```tsx
<div aria-hidden className="bg-primary-foreground/10 absolute -top-24 -right-16 -z-10 size-80 rounded-full" />
<div aria-hidden className="border-primary-foreground/20 absolute -bottom-20 -left-16 -z-10 size-56 rounded-full border-2" />
<div aria-hidden className="bg-primary-foreground/15 absolute right-12 bottom-10 -z-10 size-12 rounded-full" />
```

### 5 cercles

Les 3 ci-dessus, plus :

```tsx
<div aria-hidden className="border-primary-foreground/20 absolute top-10 right-24 -z-10 size-40 rounded-full border-2" />
<div aria-hidden className="bg-primary-foreground/10 absolute -bottom-8 left-1/4 -z-10 size-24 rounded-full" />
```

### 7 cercles (référence)

```tsx
<div aria-hidden className="bg-primary-foreground/10 absolute -top-24 -right-16 -z-10 size-80 rounded-full" />
<div aria-hidden className="border-primary-foreground/20 absolute top-10 right-24 -z-10 size-48 rounded-full border-2" />
<div aria-hidden className="bg-primary-foreground/10 absolute top-6 right-1/3 -z-10 size-10 rounded-full" />
<div aria-hidden className="border-primary-foreground/15 absolute -bottom-28 -left-20 -z-10 size-72 rounded-full border-2" />
<div aria-hidden className="bg-primary-foreground/10 absolute -bottom-10 left-1/4 -z-10 size-28 rounded-full" />
<div aria-hidden className="bg-primary-foreground/15 absolute right-12 bottom-12 -z-10 size-16 rounded-full" />
<div aria-hidden className="border-primary-foreground/20 absolute right-1/4 bottom-6 -z-10 size-6 rounded-full border-2" />
```

### Plus de 7

Partir de la recette 7 et ajouter des cercles S ou XS dans les zones libres (haut-gauche, centre-bas), en alternant plein et anneau.

---

## 8. Procédure

1. Lire la demande (section 1) et compléter avec les défauts.
2. Choisir les couleurs selon le fond (section 3) et l'intensité (section 4).
3. Placer le nombre exact de cercles demandé : taille (section 5), zone (section 6).
4. Vérifier le conteneur : `relative isolate overflow-hidden`.
5. Vérifier qu'aucun cercle ne passe sous le texte principal en mobile.
6. Compter les cercles : le total doit correspondre à la demande.

---

## 9. Vérification

```bash
# Dégradés interdits
grep -rEn "\b(from|via|to)-|bg-linear|bg-gradient" src

# Couleurs en dur dans les cercles
grep -rEn "rounded-full" src | grep -E "bg-(white|black)|#[0-9a-fA-F]{3,8}|\[oklch"

# Blur non demandé
grep -rEn "blur-" src
```

### Checklist

- [ ] Nombre de cercles = nombre demandé
- [ ] Fond uni, sans dégradé
- [ ] Couleurs en tokens avec opacité
- [ ] `aria-hidden`, `-z-10`, `rounded-full` sur chaque cercle
- [ ] Conteneur `relative isolate overflow-hidden`
- [ ] Texte lisible en clair et en sombre

<!-- Ne pas supprimer : consigne Next.js -->

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in node_modules/next/dist/docs/ before writing any code. Heed deprecation notices.

# Guide d'ajout d'une feature

## Projet

Application Next.js 16 / React 19 en TypeScript, avec UI Tailwind et composants réutilisables. Les données sont gérées par TanStack React Query et un backend Spring REST, derrière des route handlers Next.js. L'interface et les messages existants sont en français.

## Quand je demande une nouvelle feature

1. Si le contrat Spring (controller, DTO ou OpenAPI) n'est pas fourni, demande-le avant de commencer.
2. Liste les fichiers que tu vas créer, en distinguant les optionnels, et attends mon accord.
3. Crée-les dans l'ordre ci-dessous, en copiant le style de `users`.
4. Si la feature a une page, ajoute son entrée dans la navigation (sidebar/menu) : fichier à confirmer.
5. Lance `tsc` et le lint, corrige les erreurs, puis résume ce qui a été créé.

## Ordre de création (modèle users)

Optionnel = à créer seulement si la feature en a besoin.

1. `src/lib/<feature>/api/types.ts` — modèles, enums et `*Filters` ; `User`, `UserRole`, `UserStatus` et `UsersResponse` y sont définis.
2. `src/lib/<feature>/schemas/<feature>.ts` — schémas Zod et types de formulaire ; users sépare `userCreateSchema` et `userUpdateSchema`.
3. `src/lib/<feature>/api/filters.ts` (optionnel) — constructeur qui supprime les filtres vides ; `buildUserFilters` pour users.
4. `src/lib/<feature>/constants/<feature>-options.ts` (optionnel) — options et métadonnées d'affichage des enums (`user-options.ts`).
5. `src/lib/<feature>/api/services/<feature>.server.ts` — appels backend serveur, authentifiés, retournant `Result<T, ApiError>`.
6. `src/lib/<feature>/api/services/<feature>.client.ts` — appels navigateur vers `/api/<feature>` via `frontendHttp`, avec `unwrapApiError`.
7. `src/lib/<feature>/api/queries/index.ts` — clés stables (`all`, `list`, `detail`).
8. `src/lib/<feature>/api/queries/queries.server.ts` et `queries.client.ts` — `queryOptions`, prélecture serveur et lecture client.
9. `src/lib/<feature>/api/mutations.ts` — create/update/soft-delete/(hard-delete) et invalidation de `keys.all`.
10. `src/app/api/<feature>/route.ts` — GET paginé/filtré et POST validé.
11. `src/app/api/<feature>/[id]/route.ts` — GET, PATCH validé et DELETE (soft delete) ; valider l'identifiant avec `parseId`.
12. `src/app/api/<feature>/[id]/purge/route.ts` (optionnel) — DELETE permanent si le domaine le nécessite.
13. `src/lib/<feature>/components/<feature>.tsx` — composant client de liste : table, export, pagination, modales et mutations.
14. `src/lib/<feature>/components/<feature>-skeleton.tsx` — état de chargement de table.
15. `src/lib/<feature>/components/ui/<feature>-form.tsx` (et éventuellement `<feature>-form-view.tsx`) — formulaire create/update avec react-hook-form.
16. `src/lib/<feature>/components/ui/<feature>-table/{columns,row,cell-action,filters,use-filters,modals}.tsx` — présentation, actions, filtres debounce et modales.
17. `src/lib/<feature>/components/<feature>-details.tsx` et son skeleton (optionnel) — détail utilisé par la page et la modale ; `UserDetails` lit la query par identifiant.
18. `src/app/(website)/dashboard/<feature>/page.tsx`, `[id]/page.tsx` (optionnel) et `loading.tsx` — prélecture, hydratation, Suspense et états d'erreur/loading.
19. `src/config/environment.config.ts` — ajouter l'endpoint backend `...endpoints.<feature>` ; `src/config/proxy-api.config.ts` — ajouter le chemin proxy correspondant.
20. `src/utils/routes.ts` — ajouter la route de navigation seulement si la feature a une page ; users utilise `DASHBOARD_USERS`.

## Conventions observées

- Imports avec alias (`@/`, `@config`, `@lib`) ; fichiers et fonctions en camelCase, composants en PascalCase, dossiers en kebab-case.
- Les services serveur encapsulent chaque appel dans try/catch, journalisent via `getLogger("server")` et retournent `Result<T, ApiError>`. Les handlers utilisent `errorResponse` ; ne renvoyer ni erreur brute ni secret.
- Les services client ne parlent jamais directement au backend Spring : `frontendHttp()` appelle le proxy `/api`, puis `unwrapApiError` transforme l'erreur en `UnwrappedApiError`.
- Clés React Query : `["users"]`, `["users","list",filters]`, `["users","detail",id]`. Après chaque mutation, invalider `userKeys.all` (listes et détails).
- Les pages serveur préchargent avec `queries.server.ts`, déshydratent et entourent le client de `HydrationBoundary`, `Suspense` et `QuerySectionBoundary`. Les composants utilisent `useSuspenseQuery`.
- Filtres : `page`, `size`, `search`, `role`, `status`, `sort`. La recherche est trimée et debounce 400 ms, et tout changement de filtre remet la page à 1. La réponse est `PageResponse<T>` avec `content`, `page`, `size`, `totalElements`, `totalPages`.
- POST utilise le schéma create complet ; PATCH utilise le schéma update partiel. `parseBody` fait `safeParse` ; `parseId` rejette les identifiants non entiers ou non positifs.
- `DELETE /:id` est un soft delete ; `DELETE /:id/purge` est irréversible et réservé à l'état supprimé. Les deux renvoient 204 sans corps.
- Formulaires : react-hook-form + `zodResolver`. Succès et erreurs utilisateur via sonner (`toast.success/error`). Une 401 affiche le message de session expirée.
- Réutiliser `Table`, `Button`, `Modal`, `FullscreenModal`, `DataPagination`, `EmptyState`, les skeletons communs et `DeleteConfirmation`. Prévoir un état vide, un état de chargement et une boundary d'erreur.

## Règles

- Ne jamais appeler Spring depuis un composant : passer par un service, puis le route handler/proxy. Ne pas contourner `frontendHttp`, `apiClient` ou leurs intercepteurs.
- Ne jamais mettre de token, cookie, secret ou URL secrète dans un composant, un fichier client ou ce guide.
- Le backend est authentifié par `apiClient(true)` : `proxy.ts` transmet le token dans un header interne (`x-session-access-token`), et `auth()` sert de repli (cookie de session ou bearer selon le provider).
- Ne pas modifier `proxy.ts`, `auth.ts`, les intercepteurs, `ApiError`, `Result` ou la configuration globale pour une feature ordinaire ; les étendre seulement si un besoin transversal est démontré.
- Ne pas dupliquer pagination, parsing JSON, conversion d'erreur ou clés : réutiliser `src/lib/common/http.ts`, `api-error.ts`, `handle-api-error.ts`, `use-page-query.ts` et le pattern `userKeys`.
- Ne pas retourner un succès quand le service renvoie `{ ok: false }` : propager le statut via `errorResponse`.

## Extraits minimaux à copier

Service serveur :

```ts
export async function getUsers(
  filters: UserFilters = {},
): Promise<Result<UsersResponse, ApiError>> {
  try {
    const res = await (
      await apiClient(true)
    ).get<UsersResponse>(usersUrl, {
      params: filters,
    });
    return { ok: true, data: res.data };
  } catch (error) {
    return { ok: false, error: ApiError(error, "getUsers") };
  }
}
```

Route handler :

```ts
export async function GET(request: NextRequest) {
  const response = await getUsers({
    page: parseIntParam(request.nextUrl.searchParams.get("page")),
  });
  if (!response.ok) return errorResponse(response.error);
  return NextResponse.json(response.data, { status: 200 });
}
```

Query client :

```ts
export const usersQueryOptions = (filters: UserFilters) =>
  queryOptions<UsersResponse, ApiError>({
    queryKey: userKeys.list(filters),
    queryFn: () => fetchUsers(filters),
  });
```

## À confirmer avant une nouvelle feature

- Contrat Spring exact : noms des paramètres, tri, page indexée à 1, statuts et sémantique de suppression sont déduits de `users`, mais à confirmer avec le backend de la nouvelle ressource.
- Permissions métier : non définies dans `proxy.ts` ; à confirmer si la nouvelle feature nécessite un contrôle dédié.
- Fichier de navigation (sidebar/menu) : chemin à confirmer.

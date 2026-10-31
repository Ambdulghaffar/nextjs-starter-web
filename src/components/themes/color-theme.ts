export const COLOR_THEME_KEY = "color-theme";

/** "default" = aucun attribut data-theme (c'est theme.css). */
export const COLOR_THEMES = [
  { id: "default", label: "Défaut", swatch: "oklch(0.31 0.1769 263.94)" },
  { id: "solaire", label: "Solaire", swatch: "oklch(0.72 0.165 62)" },
  { id: "foret", label: "Forêt", swatch: "oklch(0.66 0.16 155)" },
  { id: "rose", label: "Rose", swatch: "oklch(0.6 0.22 5)" },
  { id: "ocean", label: "Océan", swatch: "oklch(0.62 0.13 225)" },
] as const;

export type ColorThemeId = (typeof COLOR_THEMES)[number]["id"];

const CHANGE_EVENT = "color-theme-change";

function isColorThemeId(value: unknown): value is ColorThemeId {
  return COLOR_THEMES.some((t) => t.id === value);
}

export function getColorTheme(): ColorThemeId {
  try {
    const value = localStorage.getItem(COLOR_THEME_KEY);
    return isColorThemeId(value) ? value : "default";
  } catch {
    return "default";
  }
}

export function applyColorTheme(id: ColorThemeId) {
  const root = document.documentElement;
  if (id === "default") delete root.dataset.theme;
  else root.dataset.theme = id;
}

export function setColorTheme(id: ColorThemeId) {
  try {
    localStorage.setItem(COLOR_THEME_KEY, id);
  } catch {
    /* stockage indisponible : le thème vaut pour cette session seulement */
  }
  applyColorTheme(id);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Pour useSyncExternalStore : réagit aux changements, y compris d'un autre onglet. */
export function subscribeColorTheme(onChange: () => void) {
  const onStorage = () => {
    applyColorTheme(getColorTheme());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

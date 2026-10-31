import { COLOR_THEMES, COLOR_THEME_KEY } from "./color-theme";

/**
 * À placer dans <head> du layout racine : applique le thème enregistré
 * AVANT le premier affichage, pour éviter un flash de l'ancien thème.
 */
export function ColorThemeScript() {
  const ids = COLOR_THEMES.map((t) => t.id).filter((id) => id !== "default");
  const code = `try{var t=localStorage.getItem(${JSON.stringify(
    COLOR_THEME_KEY,
  )});if(${JSON.stringify(ids)}.indexOf(t)>-1){document.documentElement.dataset.theme=t}}catch(e){}`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

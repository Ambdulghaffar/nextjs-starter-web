"""Nettoie tailadmin-init.css : retire la palette (déplacée dans theme.css)
et remplace les couleurs en dur par des variables.
Usage : python migrate-init-css.py chemin/vers/tailadmin-init.css
"""
import re, shutil, sys

path = sys.argv[1] if len(sys.argv) > 1 else "tailadmin-init.css"
shutil.copy(path, path + ".bak")
src = open(path, encoding="utf-8").read()

HEX = {
    "#465fff": "var(--color-brand-500)",
    "#9cb9ff": "var(--color-brand-300)",
    "#8098f9": "var(--color-brand-400)",
    "#3538cd": "var(--color-brand-700)",
    "#c5d8ff": "var(--color-brand-200)",
    "#344054": "var(--color-gray-700)",
    "#98a2b3": "var(--color-gray-400)",
    "#f9fafb": "var(--color-gray-50)",
    "#ffffff": "var(--color-white)",
    "#111827": "var(--color-gray-900)",
    "#1f2937": "var(--color-gray-800)",
    "#171f2e": "var(--color-gray-dark)",
}

out, removed = [], 0
for line in src.split("\n"):
    s = line.strip()
    if (re.match(r"--color-(brand|gray)-\d+:", s)
            or s.startswith("--color-gray-dark:")
            or s.startswith("--font-outfit:")):
        removed += 1
        continue
    if s.startswith("--shadow-focus-ring:"):
        line = "  --shadow-focus-ring: 0px 0px 0px 4px color-mix(in srgb, var(--color-brand-500) 12%, transparent);"
    elif s.startswith("--shadow-datepicker:"):
        c = "color-mix(in srgb, white 5%, var(--color-gray-dark))"
        line = f"  --shadow-datepicker: -5px 0 0 {c}, 5px 0 0 {c};"
    elif not s.startswith("--color-"):
        for h, v in HEX.items():
            line = line.replace(h, v)
        line = line.replace("stroke: white", "stroke: var(--color-white)")
    out.append(line)

open(path, "w", encoding="utf-8").write("\n".join(out))
print(f"{removed} lignes déplacées vers theme.css (attendu : 26)")
left = sorted({m for l in out if not l.strip().startswith("--color-")
               for m in re.findall(r"#[0-9a-fA-F]{3,8}\b", l)})
print("Hex restants (coloration syntaxique) :", ", ".join(left) or "aucun")
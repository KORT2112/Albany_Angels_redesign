import json
from pathlib import Path

root = Path(r"C:\Users\kaika\.openclaw\workspace\albany-redesign")
data = json.loads((root / "roster-data.json").read_text(encoding="utf-8"))
asset_dir = root / "assets" / "roster"

cards = []
for item in data:
    name = item["name"]
    label = name.replace("-1", "").replace("copy-of-", "").replace("-", " ").title()
    matches = list(asset_dir.glob(f"{name}.*"))
    img = matches[0].name if matches else "alexa.jpg"
    cards.append(f'''          <article class="profile-card"><img class="real-card-image" src="./assets/roster/{img}" alt="{label}" /><div class="profile-body"><h3>{label}</h3><p>Presented in the redesigned premium roster experience.</p><a href="./profile-template.html" class="text-link">View profile</a></div></article>''')

(root / "roster-cards.html").write_text("\n".join(cards), encoding="utf-8")
print(root / "roster-cards.html")

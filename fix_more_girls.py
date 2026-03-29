import os, re, glob

BASE = r"C:\Users\kaika\Claude\AlbanyAngels\albany-redesign V.5"
GIRLS_HTML = os.path.join(BASE, "girls")
ASSETS_BASE = os.path.join(BASE, "assets", "girls")
IMG_EXTS = {'.jpg', '.jpeg', '.png', '.webp'}

# --- 1. Collect all girls: slug, display name, hero image ---
girls = []
for html_file in sorted(glob.glob(os.path.join(GIRLS_HTML, "*.html"))):
    slug = os.path.splitext(os.path.basename(html_file))[0]
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    name_match = re.search(r'<h1>(.*?)</h1>', content)
    name = name_match.group(1) if name_match else slug.capitalize()

    # Find hero image
    girl_dir = os.path.join(ASSETS_BASE, slug)
    hero_img = None
    for ext in ['.jpg', '.jpeg', '.png', '.webp']:
        candidate = os.path.join(girl_dir, f'hero{ext}')
        if os.path.exists(candidate):
            hero_img = f'hero{ext}'
            break
    if not hero_img:
        # Fall back to first gallery image
        if os.path.isdir(girl_dir):
            files = sorted([f for f in os.listdir(girl_dir)
                            if os.path.splitext(f)[1].lower() in IMG_EXTS])
            if files:
                hero_img = files[0]

    girls.append({'slug': slug, 'name': name, 'hero': hero_img})

print(f"Found {len(girls)} girls")

# --- 2. For each girl, pick 4 others and rebuild the More Girls section ---
def build_card(girl):
    if girl['hero']:
        src = f"../assets/girls/{girl['slug']}/{girl['hero']}"
    else:
        src = ""
    img = f'<img class="real-card-image" loading="lazy" src="{src}" alt="{girl["name"]}" />' if src else ''
    return (
        f'          <article class="profile-card">'
        f'<a href="{girl["slug"]}.html" class="card-link">'
        f'{img}'
        f'<div class="profile-body"><h3>{girl["name"]}</h3></div>'
        f'</a></article>'
    )

MORE_GIRLS_PATTERN = re.compile(
    r'<div class="profile-grid compact-grid">.*?</div>\n      </div>',
    re.DOTALL
)

fixed = 0
for i, girl in enumerate(girls):
    html_file = os.path.join(GIRLS_HTML, f"{girl['slug']}.html")
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pick 4 others in rotating order (skip self)
    others = [g for g in girls if g['slug'] != girl['slug']]
    start = i % len(others)
    picks = (others[start:] + others[:start])[:4]

    cards_html = '\n'.join(build_card(g) for g in picks)
    new_grid = (
        f'<div class="profile-grid compact-grid">\n'
        f'{cards_html}\n'
        f'        </div>\n      </div>'
    )

    new_content = MORE_GIRLS_PATTERN.sub(new_grid, content, count=1)

    if new_content != content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        fixed += 1
        print(f"  FIXED {girl['slug']} -> {', '.join(p['name'] for p in picks)}")
    else:
        print(f"  SKIP  {girl['slug']} (pattern not matched)")

print(f"\nDone. {fixed} files updated.")

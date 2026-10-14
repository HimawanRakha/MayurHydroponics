"""Resize original Mayur assets into web-ready copies under public/.

Run from the project root: python scripts/prepare-images.py
Originals stay untouched in "Asset Project Website/".
"""
import os
from PIL import Image, ImageOps

SRC = "Asset Project Website"
OUT = "public"  # logo only; photos go to src/assets/images
MAX = 2000

KEBUN = {
    "IMG_0170.jpg": "lorong-greenhouse-mayur-hydroponics.jpg",
    "IMG_0052.jpg": "greenhouse-mayur-tampak-luar.jpg",
    "IMG_0146.jpg": "selada-butterhead-dan-selada-merah-di-greenhouse.jpg",
    "IMG_0152.jpg": "barisan-selada-hijau-dan-merah.jpg",
    "IMG_0160.jpg": "bibit-kangkung-di-netpot.jpg",
    "86895.jpg": "pokcoy-panen-dalam-keranjang.jpg",
}
PRODUK = {
    "20221203_110828.jpg": "caisim.jpg",
    "20221203_110920.jpg": "kangkung.jpg",
    "20221203_110948.jpg": "baby-kailan.jpg",
    "20221203_111017.jpg": "samhong.jpg",
    "20221203_111121.jpg": "romaine.jpg",
    "20221203_111150.jpg": "pokcoy.jpg",
    "20221203_111218.jpg": "butterhead.jpg",
    "20221203_111246.jpg": "selada-keriting.jpg",
    "20221203_112043.jpg": "selada-campur.jpg",
    "20230108_071106.jpg": "baby-pagoda.jpg",
}


def save(img, dest, max_side=MAX):
    img = ImageOps.exif_transpose(img).convert("RGB")
    img.thumbnail((max_side, max_side), Image.LANCZOS)
    img.save(dest, "JPEG", quality=82, optimize=True, progressive=True)
    print(dest, img.size, os.path.getsize(dest) // 1024, "KB")


for src, name in KEBUN.items():
    save(Image.open(os.path.join(SRC, "Foto Mayur kebun", src)), os.path.join("src/assets/images", "kebun", name))

for src, name in PRODUK.items():
    path = os.path.join(SRC, "Foto produk", src)
    if os.path.exists(path):
        # Product shots are 9:16 portrait; 1600px tall is plenty for a catalog column.
        save(Image.open(path), os.path.join("src/assets/images", "produk", name), 1600)

logo = Image.open(os.path.join(SRC, "logo_mayur-removebg-preview.png")).convert("RGBA")
logo.save(os.path.join(OUT, "logo/mayur-hydroponics-logo.png"), optimize=True)
# Leaf mark only (top part above the wordmark) for favicon / icon use.
mark = logo.crop((205, 0, 515, 250))
side = max(mark.size)
square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
square.paste(mark, ((side - mark.size[0]) // 2, (side - mark.size[1]) // 2))
square.resize((512, 512), Image.LANCZOS).save(os.path.join(OUT, "logo/mayur-mark.png"), optimize=True)
print("logo done", logo.size, mark.size)

# Open Graph image (1200x630): greenhouse photo + logo on the site's mist background.
og = Image.new("RGB", (1200, 630), (243, 246, 242))
photo = ImageOps.fit(
    ImageOps.exif_transpose(Image.open(os.path.join(SRC, "Foto Mayur kebun", "IMG_0170.jpg"))).convert("RGB"),
    (600, 630),
    Image.LANCZOS,
)
og.paste(photo, (600, 0))
og_logo = logo.copy()
og_logo.thumbnail((470, 470), Image.LANCZOS)
og.paste(og_logo, ((600 - og_logo.size[0]) // 2, (630 - og_logo.size[1]) // 2), og_logo)
og.save("src/app/opengraph-image.jpg", "JPEG", quality=86, optimize=True)
print("og done")

# Background-removed product packs (supplied by the owner) for the hero.
CUTOUTS = {
    "pokcoy.png": "pokcoy.png",
    "caisim.png": "caisim.png",
    "selada.png": "selada-keriting.png",
    "butterhead.png": "butterhead.png",
    "kangkung.png": "kangkung.png",
    "samhong.png": "samhong.png",
    "romaine.png": "romaine.png",
}
os.makedirs("src/assets/images/cutout", exist_ok=True)
for src, name in CUTOUTS.items():
    cut = Image.open(os.path.join(SRC, "Foto produk", src)).convert("RGBA")
    cut = cut.crop(cut.getbbox())
    cut.thumbnail((900, 1100), Image.LANCZOS)
    dest = os.path.join("src/assets/images/cutout", name)
    cut.save(dest, optimize=True)
    print(dest, cut.size, os.path.getsize(dest) // 1024, "KB")

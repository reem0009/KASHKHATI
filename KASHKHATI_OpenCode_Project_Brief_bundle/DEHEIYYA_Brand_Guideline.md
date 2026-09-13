# DEHEIYYA — Brand Guideline

This document defines how the DEHEIYYA identity — the star mark, wordmark, color palette, typography, dividers, pattern, and seals — is to be used. Every asset referenced here is included alongside this document in the `assets/` folder, organized to match the section structure below. All logo, wordmark, divider, seal, and pattern files are provided as both `.svg` (source, editable) and `.png` (raster export) — always prefer the `.svg` unless a raster is specifically required.

This guide documents the system **as designed**: every rule below is either confirmed directly by the brand owner or extracted directly from the provided files (exact hex values, real font references, actual file structure). Anywhere a rule is inferred rather than confirmed, it is explicitly marked as such.

for a visual explanation, refer to [DEHEIYYA Brand Guideline Deck](DEHEIYYA_Brand_Guideline_Deck.pptx)
---

## 1. Color Palette

The brand's three core colors, confirmed exact from `assets/colorpalette/colorpalette.svg`:

| Name | Hex | Usage |
|---|---|---|
| Black | `#000000` | Primary dark neutral |
| Red | `#A50100` | Primary brand accent — the star, key wordmark treatments |
| Cream | `#EDEBDE` | Primary light neutral |

![Color palette](assets/colorpalette/colorpalette.png)

### Tonal variants (not separate palette colors)

A few assets use colors that are close to, but not exactly, the three core hex values above. These are **intentional tonal shades used for a specific rendering effect**, not additional approved brand colors:

| Where it appears | Hex | Why |
|---|---|---|
| `sealblack.svg` (embossed star) | `#3C3C3C` | Shaded off black to simulate a pressed/embossed mark against black wax |
| `sealred.svg` (embossed star) | `#B10402` | Shaded off red, same reason, against red wax |
| `sealwhite.svg` (embossed star) | `#EAE8DB` | Shaded off cream, same reason, against cream wax |
| `dividersmall.svg`, `logodividersmall.svg`, `patterndivider.svg`, `pattern.svg` | `#BC0100` / `#810100` | Secondary shading within the red diamonds/stars for visual depth |

**Do not use these tonal values as standalone brand colors** in new applications (e.g. don't pick `#B10402` as "the red" for a new UI element) — they exist only as part of the seal-emboss and shading techniques on the specific assets above. For any new design work, the only approved flat colors are the three in the main palette table.

---

## 2. Typography

### English

| Typeface | Role | Confirmed by |
|---|---|---|
| **AdvertisingBold** | The English wordmark logotype, specifically and only | Live `<text>` element in `wordmarkblack.svg`, `wordmarkred.svg`, `wordmarkwhite.svg`, confirmed explicitly by brand owner |
| **Playfair Display** (Regular / Italic / Bold / Bold Italic / Black / Black Italic) | General headings | Provided font family, four static weights |
| **Montserrat** (variable weight, + Italic) | Body text / UI | Provided font family |

**Important — AdvertisingBold is exclusively the wordmark typeface.** It is not the general heading font; Playfair Display is used for headings elsewhere in the brand. Do not substitute Playfair Display into the wordmark, and do not use AdvertisingBold for general headings or body copy.

### Arabic

| Typeface | Role | Confirmed by |
|---|---|---|
| **Noto Naskh Arabic** (variable weight) | The Arabic wordmark logotype, **and** Arabic headings | Font reference inside `wordmarkarabicblack.svg` / `wordmarkarabicwhite.svg` / `wordmarkarabicred.svg` ; heading role confirmed by brand owner |
| **Noto Kufi Arabic** (variable weight) | Arabic body text / UI **only** — not headings | Confirmed by brand owner |

Both roles are now confirmed by the brand owner: Noto Naskh Arabic covers the wordmark logotype and headings; Noto Kufi Arabic is reserved for body text and UI only, and is not used for headings.

### How the wordmark diacritics are actually built (important for implementation)

The English wordmark is **not** simply the word "DEHEIYYÄ" typed in AdvertisingBold. Inspecting `wordmarkblack.svg` directly shows:

- The live text layer reads the plain string **`DEHEIYYA`** (no diacritics — confirmed via the raw `<tspan>` content, and AdvertisingBold does not even contain an Ä glyph).
- The underline beneath the **D**, the underline beneath the **H**, the macrons over both **Y**s, and the umlaut over the **A** are **four separate hand-drawn vector `<path>` elements**, layered on top of the live text — not part of the font, not typed characters.

**Implication for anyone rebuilding or programmatically generating this wordmark:** do not attempt to type "Ä" or apply Unicode combining diacritics and expect AdvertisingBold to render them — it can't. The diacritic marks must be reproduced as separate drawn shapes positioned over the base letters, exactly as done in the source files. Treat the wordmark SVGs as the authoritative source for this construction rather than re-deriving it. 

**Dimensions**

The dimensions for the lines are: WIDTH 4.371, HEIGHT 0.286. 

The dimensions for the umlaut over the A are: WIDTH 0.759, HEIGHT 0.794

The Arabic wordmark, by contrast, is fully converted to path outlines (no live text at all) — it has no font-rendering dependency and can be used as-is anywhere.

---

## 3. The Star Mark

The star (referred to in early development as the "moon" motif) is the primary brand mark. It is an eight-pointed geometric form built from a stepped/cross-stitch pixel pattern, with a woven checkerboard detail at its core. **Always use the exact shape as provided in these files — never redraw, simplify, or approximate the star.** Its precise stepped silhouette, including the checkerboard core, is a deliberate and specific design; a "cleaned up" or geometrically-simplified version is not an acceptable substitute.

### Variants

| File | Description | Approved usage |
|---|---|---|
| `logo/logolightmode.svg` | Red arms, **black** checkerboard core | On **light / cream backgrounds** |
| `logo/logored.svg` | Red arms, **cream** checkerboard core | On **dark / black backgrounds** |
| `logo/logoredborder.svg` | Red arms + red rounded-square border frame | Standalone badge / app-icon style treatment |
| `logo/logowhite.svg` | Solid reversed — cream star on a filled red rounded-square | Badge / app-icon treatment​ |
| `logo/logowhiteborder.svg` | Cream star + matching cream border, low-contrast | For placement over dark or photographic backgrounds where a subtle, low-contrast mark is wanted rather than a bold one |

![Light mode](assets/logo/logolightmode.png) ![Red mode](assets/logo/logored.png) ![Red border](assets/logo/logoredborder.png) ![White](assets/logo/logowhite.png) ![White border](assets/logo/logowhiteborder.png)

**Confirmed rule — core color follows background lightness:** the black-core version (`logolightmode`) goes on light/cream backgrounds; the cream-core version (`logored`) goes on dark or black backgrounds. This is the single governing rule for choosing between the two primary star variants — don't pick by preference, pick by background.

---

## 4. The Wordmark

"DEHEIYYA" (rendered with diacritics — see Section 2) exists as a standalone mark, independent of the star, in both English and Arabic.

### English
| File | Color |
|---|---|
| `wordmark/wordmarkblack.svg` | Black |
| `wordmark/wordmarkred.svg` | Red |
| `wordmark/wordmarkwhite.svg` | Cream/white |

![Wordmark black](assets/wordmark/wordmarkblack.png)

![Wordmark red](assets/wordmark/wordmarkred.png)

![Wordmark white](assets/wordmark/wordmarkwhite.png)

### Arabic
| File | Color |
|---|---|
| `wordmark/wordmarkarabicblack.svg` | Black |
| `wordmark/wordmarkarabicwhite.svg` | Cream/white |
| `wordmark/wordmarkarabicred.svg` | Cream/white |

![Arabic wordmark black](assets/wordmark/wordmarkarabicblack.png)

![Arabic wordmark white](assets/wordmark/wordmarkarabicwhite.png)

![Arabic wordmark red](assets/wordmark/wordmarkarabicred.png)

---

## 5. Approved Lockups (Star + Wordmark Together)

These are the confirmed, approved combinations of star + wordmark on specific backgrounds. Treat every combination shown in these two reference sheets as a "Do" — an already-approved pairing — rather than inventing new color/background combinations.

**`lockups/brand_color_usages.svg`** — 8 approved English lockups across black, cream, and red backgrounds, in different star/wordmark color combinations:

![Brand color usages](assets/lockups/brand_color_usages.png)

**`lockups/website_color_usages.svg`** — 4 approved lockups as used in a website/digital context, covering both English and Arabic wordmarks on black and cream backgrounds:

![Website color usages](assets/lockups/website_color_usages.png)

**Don't** construct a star + wordmark pairing that isn't shown in one of these two reference sheets without checking first — e.g. don't pair the cream-core star (`logored`) with a black background, since that combination doesn't appear here and breaks the light/dark core-matching rule from Section 3.

---

## 6. Dividers

Four divider styles exist, each with a **specific, distinct use case** — they are not interchangeable alternates:

| File | Description | Use case |
|---|---|---|
| `dividers/dividersmall.svg` | Thin line + small red diamond, no star | **MINOR / INLINE BREAKS​** |
| `dividers/logodividersmall.svg` | Thin line + small star motif | **SECTION HEADERS​** |
| `dividers/bigmoondivider.svg` | Full-size star flanked by two thicker bars | Larger / hero divider (e.g. major page or section breaks — confirm exact threshold with brand owner if unclear) |
| `dividers/patterndivider.svg` | Alternating diamonds with the star centered, more ornate | A third, more decorative divider style — DECORATIVE — USE TBD​. its specific use case relative to the other three has not yet been confirmed; check before defaulting to it over `bigmoondivider` |

![Small diamond divider](assets/dividers/dividersmall.png)

![Small star divider](assets/dividers/logodividersmall.png)

![Big moon divider](assets/dividers/bigmoondivider.png)

![Pattern divider](assets/dividers/patterndivider.png)

**Do not use the diamond divider (`dividersmall`) for section headers, or the star divider (`logodividersmall`) for minor/inline breaks** — the confirmed rule is: star = section headers, diamond = minor breaks.

---

## 7. Pattern

`pattern/pattern.svg` — a repeating tile of the star motif with small accent dots, for use as a background/surface pattern (e.g. packaging, backgrounds, textile-style applications) rather than as a mark or icon.

![Pattern](assets/pattern/pattern.png)

**Don't** use the pattern at a scale or crop that makes individual stars unrecognizable as the brand star — if the pattern is scaled down for a small surface, check that the stepped/checkerboard detail is still legible, or use a larger tile repeat instead of shrinking the existing one.

---

## 8. Seals

Wax-seal treatments of the star mark, in three colors:

| File | Wax color | Embossed star tone |
|---|---|---|
| `seals/sealblack.svg` | Black | `#3C3C3C` (tonal, see Section 1) |
| `seals/sealred.svg` | Red | `#B10402` (tonal) |
| `seals/sealwhite.svg` | Cream/white | `#EAE8DB` (tonal) |

![Black seal](assets/seals/sealblack.png) ![Red seal](assets/seals/sealred.png) ![White seal](assets/seals/sealwhite.png)

**Don't** recolor the embossed star inside a seal to a flat palette color (e.g. pure `#A50100` on the red seal) — the slightly-shifted tone is what makes the emboss effect read correctly; a flat exact-match color will look wrong (too uniform, no dimensionality).

---

## 9. Do's and Don'ts — Summary

**Do:**
- Use the exact star shape as provided in every file — the stepped silhouette and checkerboard core are both deliberate.
- Match the star's core color to the background: black core on light/cream, cream core on dark/black (Section 3).
- Use AdvertisingBold only for the English wordmark logotype; Playfair Display for general headings; Montserrat for body text.
- Reproduce wordmark diacritics as separate drawn marks over plain "DEHEIYYA," exactly as built in the source files — not as typed Unicode diacritics.
- Use the diamond divider for minor/inline breaks and the star divider for section headers.
- Reference the two approved-lockups sheets before creating any new star+wordmark+background combination.
- Treat the seal emboss tones as effect-specific, not general palette colors.

**Don't:**
- Redraw, simplify, or geometrically approximate the star motif.
- Swap the star's core color against the wrong background (cream core on light, or black core on dark/black).
- Substitute AdvertisingBold and Playfair Display for each other.
- Try to render the wordmark's diacritics as live Unicode characters in AdvertisingBold (the font doesn't contain them).
- Use the diamond divider for section headers or the star divider for minor breaks (see Section 6).
- Invent new star+wordmark+background pairings without checking the approved-lockups sheets first.
- Recolor the seal's embossed star to a flat palette hex value.

---

## 10. Open Items

These were flagged during asset collection and are not yet resolved — check with the brand owner before treating them as settled:

1. **`patterndivider.svg`'s specific use case** relative to `bigmoondivider.svg` — both are larger/more decorative than the two small dividers, but which one is used when is unconfirmed.

---

## Asset Manifest

```
assets/
├── colorpalette/
│   └── colorpalette.svg + .png
├── logo/
│   ├── logolightmode.svg + .png       (black core — light backgrounds)
│   ├── logored.svg + .png             (cream core — dark/black backgrounds)
│   ├── logoredborder.svg + .png
│   ├── logowhite.svg + .png
│   └── logowhiteborder.svg + .png
├── wordmark/
│   ├── wordmarkblack.svg + .png
│   ├── wordmarkred.svg + .png
│   ├── wordmarkwhite.svg + .png
│   ├── wordmarkarabicblack.svg + .png
│   └── wordmarkarabicwhite.svg + .png
│   └── wordmarkarabicred.svg + .png
├── lockups/
│   ├── brand_color_usages.svg + .png
│   └── website_color_usages.svg + .png
├── dividers/
│   ├── dividersmall.svg + .png        (minor/inline breaks)
│   ├── logodividersmall.svg + .png    (section headers)
│   ├── bigmoondivider.svg + .png
│   └── patterndivider.svg + .png
├── seals/
│   ├── sealblack.svg + .png
│   ├── sealred.svg + .png
│   └── sealwhite.svg + .png
├── pattern/
│   └── pattern.svg + .png
└── fonts/
    ├── AdvertisingBold.ttf             (English wordmark only)
    ├── PlayfairDisplay-Regular.ttf
    ├── PlayfairDisplay-Italic.ttf
    ├── PlayfairDisplay-Bold.ttf
    ├── PlayfairDisplay-BoldItalic.ttf
    ├── PlayfairDisplay-Black.ttf
    ├── PlayfairDisplay-BlackItalic.ttf
    ├── Montserrat-VariableFont_wght.ttf
    ├── Montserrat-Italic-VariableFont_wght.ttf
    ├── NotoKufiArabic-VariableFont_wght.ttf
    └── NotoNaskhArabic-VariableFont_wght.ttf
```

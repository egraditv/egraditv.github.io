"""Dessine le logo EGRADI TV en vectoriel (SVG), d'après le logo de la chaîne.

    python outils/dessiner_logo.py

Crée logo.svg (badge seul) et logo-complet.svg (badge + « EGRADI TV ») à la racine de l'application.
"""
import math
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
CX, CY = 256, 256


def pt(angle, r, cx=CX, cy=CY):
    a = math.radians(angle)
    return cx + r * math.cos(a), cy + r * math.sin(a)


def arc(a1, a2, r):
    """Arc dans le sens horaire de a1 à a2 (degrés, 0 = droite, 90 = bas)."""
    x1, y1 = pt(a1, r)
    x2, y2 = pt(a2, r)
    grand = 1 if (a2 - a1) % 360 > 180 else 0
    return f"M{x1:.1f} {y1:.1f} A{r} {r} 0 {grand} 1 {x2:.1f} {y2:.1f}"


DEFS = """
  <defs>
    <linearGradient id="rouge" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#ff2a1a"/><stop offset=".55" stop-color="#e30613"/><stop offset="1" stop-color="#8e0f5a"/>
    </linearGradient>
    <linearGradient id="bleu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a2f8f"/><stop offset=".45" stop-color="#1e6fd0"/><stop offset="1" stop-color="#2ec5ff"/>
    </linearGradient>
    <radialGradient id="blanc" cx=".38" cy=".3" r=".8">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef1f6"/><stop offset="1" stop-color="#c9d0dc"/>
    </radialGradient>
    <radialGradient id="bille" cx=".35" cy=".3" r=".75">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#d9dde3"/><stop offset=".7" stop-color="#8d939c"/><stop offset="1" stop-color="#5f656e"/>
    </radialGradient>
    <radialGradient id="fond" cx=".5" cy=".4" r=".7">
      <stop offset="0" stop-color="#16244d"/><stop offset="1" stop-color="#070c1c"/>
    </radialGradient>
    <filter id="ombre" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity=".45"/>
    </filter>
  </defs>"""


def badge():
    r_anneau, ep = 196, 34
    # Anneau : rouge à gauche et en haut, bleu à droite et en bas, ouvert en bas à gauche pour la queue du « e »
    rouge = arc(128, 312, r_anneau)
    bleu = arc(318, 102 + 360, r_anneau)
    # « e » : disque blanc, bille grise, fente de l'ouverture, queue qui sort de l'anneau
    r_e = 150
    fx1, fy1 = CX + 4, CY + 38          # départ de la fente (centre)
    fx2 = CX + r_e + 4                  # bord droit
    queue = (f"M{pt(100, r_e)[0]:.1f} {pt(100, r_e)[1]:.1f} "
             f"Q {CX - 120:.1f} {CY + 200:.1f} {CX - 196:.1f} {CY + 150:.1f} "
             f"Q {CX - 150:.1f} {CY + 150:.1f} {pt(150, r_e - 6)[0]:.1f} {pt(150, r_e - 6)[1]:.1f} Z")
    return f"""
  <circle cx="{CX}" cy="{CY}" r="236" fill="url(#fond)"/>
  <g filter="url(#ombre)">
    <path d="{rouge}" fill="none" stroke="url(#rouge)" stroke-width="{ep}" stroke-linecap="round"/>
    <path d="{bleu}" fill="none" stroke="url(#bleu)" stroke-width="{ep}" stroke-linecap="round"/>
    <path d="{queue}" fill="url(#blanc)"/>
    <circle cx="{CX}" cy="{CY}" r="{r_e}" fill="url(#blanc)"/>
    <!-- ouverture du « e » : fente sombre + retrait du bas à droite -->
    <path d="M{fx1} {fy1 - 9} H{fx2} V{fy1 + 9} H{fx1} a9 9 0 0 1 0 -18Z" fill="#0b1226"/>
    <path d="M{fx2} {fy1 + 9} V{CY + 92} A{r_e} {r_e} 0 0 0 {CX + 128} {fy1 + 9}Z" fill="#0b1226" opacity=".9"/>
    <circle cx="{CX + 2}" cy="{CY - 44}" r="56" fill="url(#bille)"/>
    <ellipse cx="{CX - 16}" cy="{CY - 66}" rx="16" ry="10" fill="#fff" opacity=".85" transform="rotate(-30 {CX - 16} {CY - 66})"/>
  </g>"""


def ecrire(nom, contenu, hauteur=512):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 {hauteur}" width="512" height="{hauteur}">{DEFS}{contenu}\n</svg>\n'
    (RACINE / nom).write_text(svg, encoding="utf-8")
    print("écrit", nom)


ecrire("logo.svg", badge())
ecrire("logo-complet.svg", badge() + """
  <text x="256" y="586" text-anchor="middle" font-family="'Arial Black', 'Segoe UI Black', Impact, sans-serif"
        font-size="62" font-weight="900" letter-spacing="5" fill="#ffffff" stroke="#070c1c" stroke-width="6" paint-order="stroke">EGRADI <tspan fill="#2ec5ff">TV</tspan></text>""", hauteur=620)

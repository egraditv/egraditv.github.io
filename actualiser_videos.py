"""Met à jour la liste des vidéos d'EGRADI TV (videos.js) depuis la chaîne YouTube.

Utilisation : double-cliquez sur « Actualiser les videos.bat », ou lancez
    python actualiser_videos.py
"""
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

DOSSIER = Path(__file__).resolve().parent
CONFIG = (DOSSIER / "config.js").read_text(encoding="utf-8")
CHAINE = re.search(r'youtubeChaineId:\s*"([^"]+)"', CONFIG).group(1)
FLUX = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHAINE}"
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015",
      "media": "http://search.yahoo.com/mrss/"}


def main():
    req = urllib.request.Request(FLUX, headers={"User-Agent": "Mozilla/5.0 EGRADI-TV"})
    with urllib.request.urlopen(req, timeout=30) as r:
        racine = ET.fromstring(r.read())
    videos = []
    for e in racine.findall("a:entry", NS):
        desc = e.find("media:group/media:description", NS)
        videos.append({
            "id": e.find("yt:videoId", NS).text,
            "titre": e.find("a:title", NS).text.strip(),
            "date": e.find("a:published", NS).text[:10],
            "description": (desc.text or "").strip()[:400] if desc is not None else "",
        })
    if not videos:
        sys.exit("Aucune vidéo trouvée : liste non modifiée.")
    contenu = ("// Généré par actualiser_videos.py — ne pas modifier à la main.\n"
               "window.EGRADI_VIDEOS = " + json.dumps(videos, ensure_ascii=False, indent=1) + ";\n")
    (DOSSIER / "videos.js").write_text(contenu, encoding="utf-8")
    print(f"{len(videos)} vidéos enregistrées dans videos.js (la plus récente : {videos[0]['date']}).")


if __name__ == "__main__":
    main()

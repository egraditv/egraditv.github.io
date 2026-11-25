"""Met à jour la liste des vidéos d'EGRADI TV (videos.js) depuis la chaîne YouTube.

Utilisation : double-cliquez sur « Actualiser les videos.bat », ou lancez
    python actualiser_videos.py

Deux sources, sans clé d'API :
  1. le flux RSS de la chaîne : les 15 dernières vidéos, avec date et description exactes ;
  2. la liste publique des mises en ligne : jusqu'à 100 vidéos. La date y est relative
     (« il y a 2 sem. ») : on prend la date écrite dans le titre (« Le 06.11.2026 ») quand il y en a une,
     sinon une date approximative.
Si la source 2 échoue (YouTube change souvent sa page), on garde au moins les 15 vidéos du RSS.
"""
import datetime as dt
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

DOSSIER = Path(__file__).resolve().parent
CONFIG = (DOSSIER / "config.js").read_text(encoding="utf-8")
CHAINE = re.search(r'youtubeChaineId:\s*"([^"]+)"', CONFIG).group(1)
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015",
      "media": "http://search.yahoo.com/mrss/"}
ENTETES = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36",
           "Accept-Language": "fr-FR,fr;q=0.9", "Cookie": "CONSENT=YES+1"}
MAX_VIDEOS = 100


def lire(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=ENTETES), timeout=30) as r:
        return r.read()


def depuis_rss():
    racine = ET.fromstring(lire(f"https://www.youtube.com/feeds/videos.xml?channel_id={CHAINE}"))
    videos = []
    for e in racine.findall("a:entry", NS):
        desc = e.find("media:group/media:description", NS)
        videos.append({
            "id": e.find("yt:videoId", NS).text,
            "titre": e.find("a:title", NS).text.strip(),
            "date": e.find("a:published", NS).text[:10],
            "description": (desc.text or "").strip()[:400] if desc is not None else "",
        })
    return videos


MOIS = {"janvier": 1, "fevrier": 2, "février": 2, "mars": 3, "avril": 4, "mai": 5, "juin": 6, "juillet": 7,
        "aout": 8, "août": 8, "septembre": 9, "octobre": 10, "novembre": 11, "decembre": 12, "décembre": 12}


def date_approchee(titre, relatif, aujourdhui, precedente):
    """Date écrite dans le titre, sinon date relative, sinon celle de la vidéo précédente (liste du plus récent au plus ancien)."""
    m = re.search(r"(\d{1,2})[./-](\d{1,2})[./-](20\d{2})", titre)
    if m:
        try:
            return dt.date(int(m[3]), int(m[2]), int(m[1])).isoformat()
        except ValueError:
            pass
    m = re.search(r"(\d{1,2})\s+([a-zéû]+)\s+(20\d{2})", titre.lower())
    if m and m[2] in MOIS:
        try:
            return dt.date(int(m[3]), MOIS[m[2]], int(m[1])).isoformat()
        except ValueError:
            pass
    m = re.search(r"il y a (\d+)\s*(min|heure|h|jour|j|sem|mois|an)", relatif or "")
    if not m:
        return precedente or aujourdhui.isoformat()
    n, unite = int(m[1]), m[2]
    jours = {"min": 0, "heure": 0, "h": 0, "jour": 1, "j": 1, "sem": 7, "mois": 30, "an": 365}[unite] * n
    return (aujourdhui - dt.timedelta(days=jours)).isoformat()


def depuis_liste():
    page = lire(f"https://www.youtube.com/playlist?list={'UU' + CHAINE[2:]}&hl=fr&gl=CD").decode("utf-8")
    donnees = json.loads(re.search(r"var ytInitialData = (\{.*?\});</script>", page).group(1))
    blocs = []

    def parcourir(o):
        if isinstance(o, dict):
            if "lockupViewModel" in o:
                blocs.append(o["lockupViewModel"])
            for v in o.values():
                parcourir(v)
        elif isinstance(o, list):
            for v in o:
                parcourir(v)

    parcourir(donnees)
    aujourdhui = dt.date.today()
    videos = []
    for b in blocs:
        md = b.get("metadata", {}).get("lockupMetadataViewModel", {})
        titre = md.get("title", {}).get("content")
        if not b.get("contentId") or not titre:
            continue
        textes = json.dumps(md.get("metadata", {}), ensure_ascii=False)
        relatif = re.search(r"il y a [^\"]+", textes)
        precedente = videos[-1]["date"] if videos else None
        videos.append({"id": b["contentId"], "titre": titre.strip(),
                       "date": date_approchee(titre, relatif and relatif[0], aujourdhui, precedente), "description": ""})
    return videos


def main():
    rss = depuis_rss()
    try:
        liste = depuis_liste()
    except Exception as e:  # la page YouTube a changé : on garde les anciennes vidéos déjà connues
        print("Liste complète indisponible, anciennes vidéos conservées :", e)
        liste = []
    if not liste:
        ancien = (DOSSIER / "videos.js").read_text(encoding="utf-8") if (DOSSIER / "videos.js").exists() else ""
        if "[" in ancien:
            liste = json.loads(ancien[ancien.index("["):ancien.rindex("]") + 1])
    connues = {v["id"] for v in rss}
    videos = rss + [v for v in liste if v["id"] not in connues]
    videos = videos[:MAX_VIDEOS]
    if not videos:
        sys.exit("Aucune vidéo trouvée : liste non modifiée.")
    contenu = ("// Généré par actualiser_videos.py — ne pas modifier à la main.\n"
               "window.EGRADI_VIDEOS = " + json.dumps(videos, ensure_ascii=False, indent=1) + ";\n")
    (DOSSIER / "videos.js").write_text(contenu, encoding="utf-8")
    print(f"{len(videos)} vidéos enregistrées dans videos.js ({len(rss)} du RSS, la plus récente : {videos[0]['date']}).")


if __name__ == "__main__":
    main()

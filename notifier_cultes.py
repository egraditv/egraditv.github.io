"""Notifications EGRADI TV (OneSignal) pour tous les téléphones abonnés.

- Sans argument : programme les notifications des cultes du jour (lus dans config.js → programmes),
  30 minutes avant puis au début de chaque culte (heure de Kinshasa).
- Avec la variable MESSAGE : envoie tout de suite une annonce spéciale (bouton « Run workflow » sur GitHub).

L'App ID est lu dans config.js (notifications.onesignalAppId).
La clé secrète va dans le dépôt GitHub (Settings → Secrets and variables → Actions) :
  ONESIGNAL_API_KEY  (la clé API de OneSignal, à garder secrète)
Tant qu'elle manque, le script ne fait rien.
"""
import datetime as dt
import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request
import uuid

APP_ID = os.environ.get("ONESIGNAL_APP_ID", "").strip() or (
    re.search(r'onesignalAppId:\s*"([^"]*)"', pathlib.Path(__file__).with_name("config.js").read_text(encoding="utf-8")) or [None, ""]
)[1]  # sinon, l'App ID écrit dans config.js
CLE = re.sub(r"^(Key|Basic)\s+", "", os.environ.get("ONESIGNAL_API_KEY", "").strip().strip('"').strip("'")).strip()
SITE = "https://spirittshim.github.io/EGRADI-TV/"
KINSHASA = dt.timezone(dt.timedelta(hours=1))  # UTC+1, pas d'heure d'été
CLE_REFUSEE = False
JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]  # ordre de weekday()


def envoyer(titre, texte, lien, quand=None, cle_unique=None):
    corps = {
        "app_id": APP_ID,
        "target_channel": "push",
        "included_segments": ["Total Subscriptions"],
        "headings": {"en": titre, "fr": titre},
        "contents": {"en": texte, "fr": texte},
        "url": lien,
    }
    if quand:
        corps["send_after"] = quand.astimezone(dt.timezone.utc).strftime("%Y-%m-%d %H:%M:%S GMT+0000")
    if cle_unique:  # évite les doublons si le robot tourne deux fois le même jour
        corps["idempotency_key"] = str(uuid.uuid5(uuid.NAMESPACE_URL, SITE + cle_unique))
    # Nouvelles clés OneSignal (« os_v2_… ») : « Key » ; anciennes « REST API Key » : « Basic ».
    for schema in ("Key", "Basic"):
        req = urllib.request.Request(
            "https://api.onesignal.com/notifications",
            data=json.dumps(corps).encode("utf-8"),
            headers={"Content-Type": "application/json; charset=utf-8", "Authorization": f"{schema} {CLE}"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                reponse = r.read().decode("utf-8", "replace")[:300]
                print(f"OK ({r.status}) : {titre} → {corps.get('send_after', 'maintenant')} · réponse : {reponse}")
                return True
        except urllib.error.HTTPError as e:
            erreur = e.read().decode("utf-8", "replace")[:400]
            if e.code in (401, 403) and schema == "Key":
                continue  # essayer l'ancien format de clé
            print(f"ERREUR {e.code} : {titre} : {erreur}")
            if e.code in (401, 403):
                print(diagnostic_cle())
                global CLE_REFUSEE
                CLE_REFUSEE = True
            return False
    return False


def diagnostic_cle():
    """Décrit la clé reçue SANS l'afficher, pour comprendre une erreur 401."""
    conseils = [f"Clé reçue : {len(CLE)} caractères"]
    if CLE.startswith("os_v2_"):
        conseils.append("format récent (os_v2_…) : correct, mais OneSignal la refuse → elle a peut-être été supprimée, ou elle appartient à une autre application OneSignal")
    elif len(CLE) < 40:
        conseils.append("TROP COURTE : ce n'est sans doute pas la clé secrète (peut-être le nom de la clé ou son « Key ID »). La vraie clé commence par « os_v2_app_ » et fait plus de 100 caractères")
    if any(c.isspace() for c in CLE):
        conseils.append("elle contient des espaces ou des retours à la ligne")
    return "Diagnostic : " + " ; ".join(conseils) + "."


def lire_programmes():
    texte = pathlib.Path(__file__).with_name("config.js").read_text(encoding="utf-8")
    bloc = re.search(r"programmes:\s*\[(.*?)\]", texte, re.S)
    motif = re.compile(r'jour:\s*"([^"]+)",\s*titre:\s*"([^"]+)",\s*heure:\s*"([^"]*)"')
    return [dict(zip(("jour", "titre", "heure"), m)) for m in motif.findall(bloc.group(1) if bloc else "")]


def main():
    if not APP_ID or not CLE:
        print("Notifications pas encore activées : ajoutez ONESIGNAL_APP_ID et ONESIGNAL_API_KEY dans les réglages du dépôt.")
        return 0

    message = os.environ.get("MESSAGE", "").strip()
    if message:
        titre = os.environ.get("TITRE", "").strip() or "EGRADI TV"
        return 0 if envoyer(titre, message, SITE + "#accueil") else 1

    maintenant = dt.datetime.now(KINSHASA)
    jour = JOURS[maintenant.weekday()]
    cultes = [p for p in lire_programmes() if p["jour"] == jour]
    if not cultes:
        print(f"{jour} : pas de culte au programme.")
        return 0

    erreurs = 0
    for p in cultes:
        h = re.match(r"(\d{1,2})\s*[h:]\s*(\d{2})?", p["heure"])
        if not h:
            print(f"Heure inconnue pour « {p['titre']} » : pas de notification.")
            continue
        debut = maintenant.replace(hour=int(h[1]), minute=int(h[2] or 0), second=0, microsecond=0)
        envois = [
            (debut - dt.timedelta(minutes=30), "avant",
             f"⏰ Dans 30 minutes : {p['titre']}",
             f"Le culte commence à {p['heure']} (heure de Kinshasa). Touchez pour le suivre en direct sur EGRADI TV."),
            (debut, "direct",
             f"🔴 EN DIRECT : {p['titre']}",
             "Le culte commence maintenant ! Touchez pour rejoindre le direct sur EGRADI TV."),
        ]
        for quand, nom, titre, texte in envois:
            if quand <= maintenant + dt.timedelta(minutes=2):
                print(f"Déjà passé : {titre}")
                continue
            if not envoyer(titre, texte, SITE + "#direct", quand, f"{debut:%Y-%m-%d}-{p['jour']}-{p['heure']}-{nom}"):
                erreurs += 1
    if erreurs and CLE_REFUSEE and not os.environ.get("MESSAGE"):
        print("Clé OneSignal refusée : rien n'est envoyé tant que le secret ONESIGNAL_API_KEY n'est pas corrigé.")
        return 0  # pas d'e-mail d'échec chaque matin en attendant la bonne clé
    return 1 if erreurs else 0


if __name__ == "__main__":
    sys.exit(main())

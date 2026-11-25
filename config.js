// Réglages de l'application EGRADI TV — à modifier ici, sans toucher au reste du code.
window.EGRADI = {
  nom: "EGRADI TV",
  slogan: "Église Grâce Divine — en direct de Kinshasa",
  description:
    "EGRADI TV est la chaîne de l'Église Grâce Divine (EGRADI), dirigée par l'Apôtre Augustin Mwimpe. " +
    "Une chaîne évangélique qui parle du nom de Jésus : cultes en direct, prières, enseignements et miracles, depuis Kinshasa.",
  ville: "Kinshasa, République Démocratique du Congo",
  dirigeant: "Apôtre Augustin Mwimpe Moto Kanda na Nzambe",
  bienvenue:
    "La grande famille de l'Église Grâce Divine – Direction Générale vous ouvre grandement ses portes : " +
    "des moments intenses de prière, d'adoration, de délivrance et d'enseignements inspirés par le Saint-Esprit.",
  adresse: [
    "En face de l'Aéroport de Ndjili",
    "3e avenue Police, Cité de Grâce (Badara)",
    "Référence : à proximité du mur des Chinois",
    "Commune de N'sele, Kinshasa, RDC",
  ],
  // Contact (affiché sur le bandeau INFOS de la chaîne). Format international, sans espaces.
  telephone: "+243997751720",
  messageWhatsApp: "Bonjour EGRADI TV, je vous contacte depuis l'application.",
  email: "egrdimwimpe@gmail.com", // adresse publiée sur la page Facebook de l'Apôtre

  // Chiffres affichés sur la page Église (à mettre à jour de temps en temps)
  chiffres: [
    { valeur: "189 k", libelle: "abonnés TikTok" },
    { valeur: "77 k", libelle: "abonnés Facebook" },
    { valeur: "60 k", libelle: "abonnés YouTube" },
    { valeur: "1 500+", libelle: "vidéos publiées" },
  ],
  carte: "https://www.google.com/maps/search/?api=1&query=A%C3%A9roport+de+Ndjili+Kinshasa",

  // Messages du bandeau « INFOS » qui défile en haut de l'application (comme à l'antenne).
  annonces: [
    "Bienvenue sur EGRADI TV, la chaîne de l'Église Grâce Divine",
    "Culte dominical chaque dimanche à 9h00 · 45 minutes de prière le mardi à 11h00 · Mercredi Biyano à 17h00",
    "Jeudi Miracle (École de guérison) à 17h00 · Vendredi prophétique à 17h00",
    "Adresse : en face de l'Aéroport de Ndjili, 3e avenue Police, Cité de Grâce (Badara)",
    "Contact et WhatsApp : +243 997 751 720",
    "Aussi en direct sur Bleu OTT : chaîne EGRADI",
    "Suivez les directs sur Facebook : Apôtre Augustin Mwimpe Officiel",
    "E-mail : egrdimwimpe@gmail.com",
    "Offrandes : M-Pesa +243 817 594 677 · Airtel Money +243 997 751 720 · PayPal egrdimwipe@gmail.com · détails dans « Soutenir l'œuvre »",
  ],

  // Sources du direct, dans l'ordre d'affichage. La première qui a un lien est ouverte par défaut.
  //  - type "hls"    : lien .m3u8 de votre propre serveur de diffusion (OBS → serveur, Restream, Wowza, Flussonic…)
  //  - type "video"  : lien direct vers un flux .mp4 / .webm
  //  - type "iframe" : lien « intégrer / embed » donné par votre hébergeur de direct (Vimeo, Dacast, Castr…)
  //  - type "youtube": le direct de la chaîne YouTube ci-dessous (pas de lien à mettre)
  directs: [
    { nom: "EGRADI TV", type: "hls", url: "" }, // ← collez ici le lien de votre direct
    { nom: "YouTube", type: "youtube" },
  ],

  // Autres endroits où la chaîne passe en direct (bouquets TV, applications OTT).
  // "url" : lien vers l'application ou la page de la chaîne (laisser "" s'il n'y en a pas).
  ailleurs: [
    { nom: "Facebook — Apôtre Augustin Mwimpe", detail: "Les cultes sont aussi diffusés en direct sur la page Facebook", url: "https://www.facebook.com/MWIMPE/live_videos" },
    { nom: "Bleu OTT (Bleusat)", detail: "Cherchez la chaîne « EGRADI » dans l'application Bleu OTT", url: "" },
  ],

  // Compte TikTok affiché dans la page Vidéos (pseudo sans le @)
  tiktok: "augustinmwimpeofficiel",

  // Chaîne YouTube (source des directs et des vidéos)
  youtubeChaineId: "UCI1cpRq68j2i4Y2WxLaY_BQ",
  youtubeUrl: "https://www.youtube.com/@Ap%C3%B4treAugustinMwimpeOfficiel",
  avatar:
    "https://yt3.googleusercontent.com/fWORXldxsl-yotVHv6LwRdl2YgihAmwFyjg_qAyF44RmsobizjDsrfXTLiLI4ZiEOwgzIAIKOsM=s900-c-k-c0x00ffffff-no-rj",
  banniere:
    "https://yt3.googleusercontent.com/y4LQ7q_V4R1Nlcia-4voVe6ylU3FO5X7voG6lImq0zwYOBkFvtBa9Ds5E7t4ZrNcmbtX06osC7c=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",

  reseaux: [
    { nom: "YouTube — Apôtre Augustin Mwimpe Officiel (60 k)", url: "https://www.youtube.com/@Ap%C3%B4treAugustinMwimpeOfficiel" },
    { nom: "Facebook — Apôtre Augustin Mwimpe (77 k)", url: "https://www.facebook.com/MWIMPE" },
    { nom: "TikTok — @augustinmwimpeofficiel (189 k)", url: "https://www.tiktok.com/@augustinmwimpeofficiel" },
  ],

  // Application Android à télécharger depuis le site (fichier dans le dossier telechargement/).
  // Après une nouvelle version de l'APK : remplacez le fichier et changez « version ».
  apk: { fichier: "telechargement/EGRADI-TV.apk", version: "1.0.1", taille: "2,7 Mo" },

  // Page « Soutenir l'œuvre » : offrandes et dîmes par Mobile Money.
  // Ajoutez UNIQUEMENT les numéros officiels de l'église. Tant que la liste est vide,
  // la page propose de demander les numéros sur WhatsApp.
  soutien: {
    texte:
      "Vos offrandes et vos dîmes permettent à EGRADI TV de diffuser la Parole de Dieu en direct, " +
      "depuis Kinshasa jusqu'au monde entier. Merci de soutenir l'œuvre de Dieu.",
    verset: "« Que chacun donne comme il l'a résolu en son cœur, car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7",
    // Informations recopiées de l'écran « Envoyez vos offrandes » diffusé dans les cultes (24/11/2026).
    mobileMoney: [
      { operateur: "M-Pesa (Vodacom)", numero: "+243 817 594 677" },
      { operateur: "Airtel Money", numero: "+243 997 751 720" },
    ],
    banque: {
      nom: "UBA — United Bank for Africa",
      compte: "00030068033502016345369", // « IBA » sur l'écran de l'église
      swift: "UNAFCDKS",
      devise: "USD",
    },
    // PayPal confirmé par l'église le 24/11/2026 : « egrdimwipe » (différent de l'e-mail de contact « egrdimwimpe »).
    paypal: "egrdimwipe@gmail.com",
  },

  // Événements à venir (croisades, conventions, veillées…). Les événements passés sont masqués automatiquement.
  // Exemple : { date: "2026-12-31", heure: "20h00", titre: "Veillée de fin d'année", lieu: "Cité de Grâce (Badara)", affiche: "" },
  evenements: [],

  // Programme de la semaine (d'après les directs publiés sur YouTube).
  // Heures de Kinshasa, écrites « 9h00 », « 17h30 »… (lues par le compte à rebours et le fichier agenda).
  programmes: [
    { jour: "Dimanche", titre: "Culte dominical", heure: "9h00", mot: "dominica" },
    { jour: "Mardi", titre: "45 minutes de prière", heure: "11h00", mot: "prière|priere" },
    { jour: "Mercredi", titre: "Culte d'enseignement « Mercredi Biyano »", heure: "17h00", mot: "biyano|enseignement" },
    { jour: "Jeudi", titre: "Jeudi Miracle — École de guérison", heure: "17h00", mot: "jeudi miracle|guérison|guerison" },
    { jour: "Vendredi", titre: "Vendredi prophétique", heure: "17h00", mot: "vendredi proph" },
  ],
};

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
  // Adresse officielle (texte de l'église, 25/11/2026)
  adresse: [
    "Av. La Police n°3, Quartier Badara",
    "Commune de N'sele, Kinshasa, RDC",
    "Référence : mur ya ba Chinois",
    "Repère : en face de l'Aéroport de Ndjili",
  ],
  // Contact (affiché sur le bandeau INFOS de la chaîne). Format international, sans espaces.
  telephone: "+243997751720", // WhatsApp de l'église (prière, témoignages, offrandes)
  telephone2: "+243907260532", // contact publié par l'église le 25/11/2026
  messageWhatsApp: "Bonjour EGRADI TV, je vous contacte depuis l'application.",
  email: "egrdimwimpe@gmail.com", // adresse publiée sur la page Facebook de l'Apôtre

  // Chiffres affichés sur la page Église (à mettre à jour de temps en temps)
  chiffres: [
    { valeur: "189 k", libelle: "abonnés TikTok" },
    { valeur: "77 k", libelle: "abonnés Facebook" },
    { valeur: "60 k", libelle: "abonnés YouTube" },
    { valeur: "1 500+", libelle: "vidéos publiées" },
  ],
  carte: "https://www.google.com/maps/search/?api=1&query=Badara+N%27sele+A%C3%A9roport+de+Ndjili+Kinshasa",

  // Messages du bandeau « INFOS » qui défile en haut de l'application (comme à l'antenne).
  annonces: [
    "Bienvenue sur EGRADI TV, la chaîne de l'Église Grâce Divine",
    "Dimanche : culte de louange et d'adoration de 08h00 à 13h30",
    "Lundi et mardi : prière « Force contre forces » de 12h00 à 13h00, à Limete, 18e rue Industrielle n°2",
    "Mercredi et vendredi : culte d'enseignement de 16h00 à 19h00",
    "Jeudi Miracles (École de guérison) de 10h00 à 19h00",
    "Samedi : culte de la jeunesse de 15h00 à 18h30",
    "L'Apôtre Augustin Mwimpe reçoit le mercredi et le vendredi de 13h30 à 16h00 · Consultation prophétique le jeudi de 07h00 à 16h00",
    "Adresse : Av. La Police n°3, Q. Badara, C. N'sele · Réf. : mur ya ba Chinois",
    "Contact : +243 907 260 532 · WhatsApp : +243 997 751 720",
    "Retrouvez gratuitement toutes les prédications et émissions sur la chaîne YouTube « Apôtre Augustin Mwimpe officiel »",
    "Aussi en direct sur Bleu OTT : chaîne EGRADI",
    "Suivez les directs sur Facebook : Apôtre Augustin Mwimpe Officiel",
    "E-mail : egrdimwimpe@gmail.com",
    "Offrandes : M-Pesa +243 817 594 677 · Airtel Money +243 997 751 720 · PayPal egrdimwipe@gmail.com · détails dans la rubrique « Offrandes » de l'application",
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
    { nom: "Bleu OTT (Bleusat)", detail: "Cherchez la chaîne « EGRADI » dans l'application Bleu OTT", url: "https://play.google.com/store/apps/details?id=net.bleuint", android: "net.bleuint" },
  ],

  // Bouton « Regarder sur Bleu OTT » de la page Direct : ouvre l'application Bleusat ott international
  // sur Android (ou sa page Play Store si elle n'est pas installée). Mettre null pour cacher le bouton.
  bleuOtt: { android: "net.bleuint", playStore: "https://play.google.com/store/apps/details?id=net.bleuint" },

  // Compte TikTok affiché dans la page Vidéos (pseudo sans le @)
  tiktok: "augustinmwimpeofficiel",

  // Chaîne YouTube (source des directs et des vidéos)
  youtubeChaineId: "UCI1cpRq68j2i4Y2WxLaY_BQ",
  youtubeUrl: "https://www.youtube.com/@Ap%C3%B4treAugustinMwimpeOfficiel",
  avatar:
    "https://yt3.googleusercontent.com/fWORXldxsl-yotVHv6LwRdl2YgihAmwFyjg_qAyF44RmsobizjDsrfXTLiLI4ZiEOwgzIAIKOsM=s900-c-k-c0x00ffffff-no-rj",
  // Photo de présentation de l'accueil (bannière de la chaîne YouTube, affichée en entier).
  // Pour la changer : déposez la nouvelle image dans photos/ (format très large, environ 6 × plus large que haute).
  banniere: { grande: "photos/banniere-apotre-1600.jpg", petite: "photos/banniere-apotre-900.jpg" },

  reseaux: [
    { nom: "YouTube — Apôtre Augustin Mwimpe Officiel (60 k)", url: "https://www.youtube.com/@Ap%C3%B4treAugustinMwimpeOfficiel" },
    { nom: "Facebook — Apôtre Augustin Mwimpe (77 k)", url: "https://www.facebook.com/MWIMPE" },
    { nom: "TikTok — @augustinmwimpeofficiel (189 k)", url: "https://www.tiktok.com/@augustinmwimpeofficiel" },
    { nom: "Instagram — @apotre_augustin_mwimpeofficiel (1,5 k)", url: "https://www.instagram.com/apotre_augustin_mwimpeofficiel/" },
    { nom: "X — @ApotreMwimpe (43)", url: "https://x.com/ApotreMwimpe" },
  ],

  // Statistiques de visite (GoatCounter : gratuit, sans cookies, anonyme). Après avoir créé le compte
  // sur https://www.goatcounter.com (ex. code « egraditv »), écrivez ce code ici : goatcounter: "egraditv".
  statistiques: { goatcounter: "" },

  // Alerte « Le direct commence » : lien d'une Chaîne WhatsApp de l'église (WhatsApp → Actualités → Créer une chaîne).
  // Exemple : "https://whatsapp.com/channel/0029Va…". Tant que c'est vide, le bouton n'apparaît pas.
  whatsappChaine: "",

  // Notifications sur les téléphones (service gratuit OneSignal, https://onesignal.com).
  // Collez ici l'« App ID » de OneSignal : le bouton « 🔔 Recevoir une notification à chaque culte » apparaît alors
  // sur l'accueil. Les notifications partent toutes seules 30 min avant et au début de chaque culte du programme
  // (GitHub Action « Notifications des cultes », qui utilise la clé secrète ONESIGNAL_API_KEY du dépôt).
  notifications: {
    onesignalAppId: "0ab94a3a-83d4-47da-a351-d922c7536a44",
    safariWebId: "web.onesignal.auto.002ea938-3ebd-4740-ada1-6c17c5eb4600",
  },

  // Application Android à télécharger depuis le site (fichier dans le dossier telechargement/).
  // Après une nouvelle version de l'APK : remplacez le fichier et changez « version ».
  apk: { fichier: "telechargement/EGRADI-TV.apk", version: "1.0.1", taille: "2,7 Mo" },

  // Page « Offrandes » : offrandes et dîmes (Mobile Money, banque, PayPal).
  // Logos et QR codes dans le dossier offrandes/ (logo-<id>.png ou .svg, qr-<id>.svg ; ids : mpesa, airtel, banque, paypal).
  // Ajoutez UNIQUEMENT les numéros officiels de l'église. Tant que la liste est vide,
  // la page propose de demander les numéros sur WhatsApp.
  soutien: {
    texte:
      "Vos offrandes et vos dîmes permettent à EGRADI TV de diffuser la Parole de Dieu en direct, " +
      "depuis Kinshasa jusqu'au monde entier. Merci de soutenir l'œuvre de Dieu.",
    verset: "« Que chacun donne comme il l'a résolu en son cœur, car Dieu aime celui qui donne avec joie. » — 2 Corinthiens 9:7",
    // Informations recopiées de l'écran « Envoyez vos offrandes » diffusé dans les cultes (24/11/2026).
    mobileMoney: [
      { id: "mpesa", operateur: "M-Pesa (Vodacom)", numero: "+243 817 594 677" },
      { id: "airtel", operateur: "Airtel Money", numero: "+243 997 751 720" },
    ],
    banque: {
      nom: "UBA — United Bank for Africa",
      compte: "00030068033502016345369", // « IBA » sur l'écran de l'église
      swift: "UNAFCDKS",
      devise: "USD",
    },
    // PayPal confirmé par l'église le 24/11/2026 : « egrdimwipe » (différent de l'e-mail de contact « egrdimwimpe »).
    paypal: "egrdimwipe@gmail.com",
    // Logos officiels fournis par l'utilisateur le 25/11/2026 (PayPal : logo officiel, Wikimedia Commons).
    logos: {
      mpesa: "offrandes/logo-mpesa.png",
      airtel: "offrandes/logo-airtel.png",
      banque: "offrandes/logo-banque.png",
      paypal: "offrandes/logo-paypal.svg",
    },
  },

  // Événements à venir (croisades, conventions, veillées…). Les événements passés sont masqués automatiquement.
  // Exemple : { date: "2026-12-31", heure: "20h00", titre: "Veillée de fin d'année", lieu: "Cité de Grâce (Badara)", affiche: "" },
  evenements: [],

  // Page Église → « Nos pasteurs ». « recherche » : mot cherché dans les titres des vidéos pour « Voir ses prédications ».
  // « photo » : adresse d'une image (ou fichier dans le dossier photos/) ; vide = initiales.
  pasteurs: [
    {
      nom: "Apôtre Augustin Mwimpe",
      role: "Pasteur principal · Représentant légal de l'Église Grâce Divine",
      photo: "https://yt3.googleusercontent.com/fWORXldxsl-yotVHv6LwRdl2YgihAmwFyjg_qAyF44RmsobizjDsrfXTLiLI4ZiEOwgzIAIKOsM=s400-c-k-c0x00ffffff-no-rj",
      description: "L'homme de Dieu « Moto Kanda na Nzambe » conduit les cultes, l'École de guérison du Jeudi Miracle et le Vendredi prophétique.",
      recherche: "mwimpe",
    },
    {
      nom: "Pasteur Joao Masaki",
      role: "Pasteur · Prédicateur",
      photo: "",
      description: "",
      recherche: "masaki",
    },
  ],

  // Galerie (page Église) : photos ajoutées ici en premier (fichiers dans photos/ ou adresses d'images),
  // puis automatiquement les images des derniers cultes publiés sur YouTube.
  galerie: { photos: [], imagesDesCultes: 12 },

  // Programme de la semaine (d'après les directs publiés sur YouTube).
  // Heures de Kinshasa, écrites « 9h00 », « 17h30 »… (lues par le compte à rebours et le fichier agenda).
  // Programme des cultes (texte officiel de l'église, 25/11/2026). Heure : « début – fin », heure de Kinshasa.
  // « mot » sert à retrouver la dernière vidéo de ce culte ; « lieu » s'affiche si le culte n'a pas lieu à l'église.
  programmes: [
    { jour: "Dimanche", titre: "Culte de louange & adoration", heure: "08h00 – 13h30", mot: "dominica|louange|adoration" },
    { jour: "Lundi", titre: "Prière « Force contre forces »", heure: "12h00 – 13h00", mot: "force|prière|priere", lieu: "Limete, 18e rue Industrielle n°2" },
    { jour: "Mardi", titre: "Prière « Force contre forces »", heure: "12h00 – 13h00", mot: "force|prière|priere", lieu: "Limete, 18e rue Industrielle n°2" },
    { jour: "Mercredi", titre: "Culte d'enseignement", heure: "16h00 – 19h00", mot: "biyano|enseignement|mercredi" },
    { jour: "Jeudi", titre: "Jeudi Miracles — École de guérison", heure: "10h00 – 19h00", mot: "jeudi miracle|guérison|guerison" },
    { jour: "Vendredi", titre: "Culte d'enseignement", heure: "16h00 – 19h00", mot: "vendredi|enseignement" },
    { jour: "Samedi", titre: "Culte de la jeunesse", heure: "15h00 – 18h30", mot: "jeunesse|samedi" },
  ],

  // L'Apôtre reçoit les fidèles (affiché sur la page Programme)
  receptions: [
    { jours: "Mercredi et vendredi", heure: "13h30 – 16h00", titre: "L'Apôtre Augustin Mwimpe reçoit" },
    { jours: "Jeudi", heure: "07h00 – 16h00", titre: "Consultation prophétique" },
  ],
};

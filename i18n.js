// Traductions de l'interface EGRADI TV : français (fr), lingala (ln), anglais (en).
// Les textes de config.js (programme, description…) restent en français.
// Lingala : traduction à faire relire par un locuteur de l'église avant diffusion large.
(() => {
  const T = {
    fr: {
      nav_accueil: "Accueil", nav_direct: "Direct", nav_videos: "Vidéos", nav_programme: "Programme", nav_eglise: "Église",
      hero_direct: "Regarder le direct", hero_revoir: "Revoir les cultes",
      derniers: "Derniers cultes et directs", tout_voir: "Tout voir →", pasteur: "Pasteur principal", decouvrir: "Découvrir l'église →",
      tuile_priere: "Demande de prière", tuile_temoignage: "Témoignage", tuile_soutien: "Offrandes", tuile_agenda: "Agenda",
      direct_titre: "En direct de Kinshasa", ouvrir_yt: "Ouvrir sur YouTube", bleu_ott: "📺 Regarder sur Bleu OTT", aussi: "EGRADI TV est aussi en direct sur", dernier_direct: "Dernier direct",
      economie: "Économie de données",
      economie_hls: "Économie de données activée : le direct est lu dans la qualité la plus basse.",
      economie_yt: "Sur YouTube, touchez ⚙ puis « Qualité » → 144p pour consommer moins de données.",
      note_yt: "Si aucun direct n'est en cours sur YouTube, un message d'indisponibilité s'affiche. Regardez alors le dernier culte ci-dessous.",
      note_autre: "Si l'image ne vient pas, le direct n'a peut-être pas encore commencé : réessayez dans quelques minutes ou passez sur YouTube.",
      direct_indispo: "Le direct n'est pas disponible pour le moment.",
      videos_titre: "Vidéos", recherche_ph: "Rechercher un culte, une prédication…", aucune_video: "Aucune vidéo trouvée.",
      cat_tout: "Tout", cat_directs: "Directs", cat_dominical: "Culte dominical", cat_miracle: "Jeudi Miracle", cat_prophetique: "Vendredi prophétique",
      cat_enseignement: "Enseignement", cat_priere: "Prière", cat_predications: "Prédications",
      etiquette_direct: "DIRECT", etiquette_nouveau: "NOUVEAU",
      tiktok_titre: "Sur TikTok", tiktok_btn: "▶ Afficher les vidéos TikTok", tiktok_ouvrir: "Ouvrir dans TikTok",
      archives_titre: "Toutes les archives de la chaîne", archives_note: "Plus de 1 500 vidéos : faites défiler la liste dans le lecteur.", archives_btn: "▶ Ouvrir les archives",
      programme_titre: "Programme de la semaine", heures_note: "Heures de Kinshasa (UTC+1).", revoir_dernier: "▶ Revoir le dernier", auj: "auj.",
      agenda_btn: "📅 Ajouter les cultes à mon agenda", agenda_ok: "Ouvrez le fichier pour ajouter les cultes à votre agenda ✓",
      evenements_titre: "Événements à venir", aucun_evenement: "Aucun événement annoncé pour le moment. Suivez le bandeau INFOS et nos réseaux.",
      prochain: "Prochain culte", aujourdhui_sur: "Aujourd'hui sur EGRADI TV", suivre_direct: "Suivre en direct", dans: "Dans", en_cours: "EN COURS",
      flash_tag: "CULTE DU JOUR", flash_aujourdhui: "Aujourd'hui à", flash_commence: "Commence dans", flash_live: "EN DIRECT MAINTENANT",
      flash_suivre: "Cliquez ici pour suivre le culte", flash_rejoindre: "Rejoignez-nous en direct", flash_bouton: "Suivre le culte",
      notif_btn: "🔔 Recevoir une notification à chaque culte", notif_ok: "Notifications activées ✓ Vous serez prévenu à chaque culte.",
      notif_refus: "Les notifications sont bloquées : autorisez-les dans les réglages du téléphone ou du navigateur.",
      eglise_titre: "L'Église Grâce Divine", dirigee_par: "Dirigée par :", representant: "représentant légal de l'Église Grâce Divine",
      contact_titre: "Nous contacter", appeler: "📞 Appeler", trouver_titre: "Nous trouver", carte: "📍 Ouvrir la carte", suivez: "Suivez-nous",
      priere_titre: "Prière & témoignage",
      priere_intro: "Confiez-nous votre sujet de prière ou partagez ce que Dieu a fait pour vous. Votre message est envoyé directement à l'équipe de l'église.",
      f_type: "Type de message", type_priere: "Demande de prière", type_temoignage: "Témoignage", type_grace: "Action de grâce",
      f_nom: "Votre nom", f_ville: "Ville / pays", f_tel: "Téléphone (facultatif)", f_message: "Votre message",
      envoyer_wa: "💬 Envoyer par WhatsApp", envoyer_mail: "✉️ Envoyer par e-mail",
      priere_note: "Le message s'ouvre dans WhatsApp ou votre messagerie : il ne reste qu'à appuyer sur Envoyer.",
      champs_requis: "Merci d'indiquer votre nom et votre message.",
      soutien_titre: "Envoyez vos offrandes", copier: "Copier", copie: "Numéro copié ✓",
      soutien_wa: "💬 Demander les numéros sur WhatsApp", soutien_merci: "Que Dieu vous bénisse abondamment pour votre générosité.",
      partager: "Partager", lien_copie: "Lien copié ✓", installee: "EGRADI TV est installée ✓", droits: "Tous droits réservés.", langue: "Langue",
      afficher_plus: "Afficher plus", pasteurs_titre: "Nos pasteurs", galerie_titre: "Galerie", voir_predications: "▶ Voir ses prédications", voir_video: "▶ Voir la vidéo", alerte_direct: "🔔 Être prévenu des directs (WhatsApp)", verset_titre: "📖 Verset du jour", confidentialite: "Politique de confidentialité", mm_titre: "Mobile Money", banque_titre: "Virement bancaire", banque_compte: "N° de compte (IBAN)", banque_devise: "Devise", paypal_compte: "Compte PayPal", paypal_note: "Dans PayPal : Envoyer → collez cette adresse.", copie_ok: "Copié ✓", mode_audio: "Mode audio", mode_audio_long: "🎧 Mode audio (écouter seulement)", audio_activer: "🎧 Mode audio", audio_quitter: "📺 Revoir l'image", audio_active: "🎧 Mode audio : petite image, son normal", audio_desactive: "📺 Image normale", audio_note: "Petite image, son normal : beaucoup moins de données. Gardez l'écran allumé.", en_direct: "en direct", cat_maliste: "⭐ Ma liste", maliste_ajouter: "☆ Ma liste", maliste_retirer: "★ Dans ma liste", maliste_ajoute: "Ajoutée à ma liste ⭐", maliste_retire: "Retirée de ma liste", maliste_vide: "Votre liste est vide. Ouvrez une vidéo et touchez « ☆ Ma liste » pour la garder ici.", continuer_titre: "▶ Continuer à regarder", reprise: "Reprise à", depuis_debut: "⟲ Depuis le début", hors_ligne: "Pas de connexion Internet : les vidéos et le direct reviendront dès que le réseau sera rétabli.", en_ligne: "Connexion rétablie ✓", off_choisir: "Choisissez votre moyen d'envoi", off_numero: "Numéro", off_qr: "Scannez ce code avec un autre téléphone pour ouvrir ce moyen d'envoi.", off_qr_tout_titre: "Partagez cette page", off_qr_tout: "Scannez ce code pour ouvrir les offrandes EGRADI TV sur un autre téléphone.", off_etapes_mm: "Dans votre menu Mobile Money, choisissez « Envoyer de l'argent », puis entrez ce numéro et le montant.", off_etapes_banque: "Faites un virement depuis votre banque ou votre application bancaire avec ces coordonnées.", off_bandeau: "💝 Envoyez vos offrandes", off_bandeau_sous: "M-Pesa · Airtel Money · Banque UBA · PayPal",
      notice_btn: "📄 Lire la notice d'utilisation (PDF, 1,7 Mo)", presentation_titre: "🎬 Découvrez l'application en vidéo", presentation_note: "4 min · Comment installer et utiliser EGRADI TV · environ 12 Mo", appli_titre: "L'application EGRADI TV", appli_android: "📲 Télécharger pour Android",
      appli_detail: "Gratuite · Android 7.0 ou plus · ",
      appli_iphone: "Sur iPhone : dans Safari, touchez Partager ⬆ puis « Sur l'écran d'accueil ».",
    },
    ln: {
      nav_accueil: "Ebandeli", nav_direct: "Live", nav_videos: "Bavideo", nav_programme: "Programu", nav_eglise: "Lingomba",
      hero_direct: "Tala live", hero_revoir: "Tala lisusu mayangani",
      derniers: "Mayangani ya suka", tout_voir: "Tala nyonso →", pasteur: "Mobateli monene", decouvrir: "Yeba lingomba →",
      tuile_priere: "Losambo", tuile_temoignage: "Litatoli", tuile_soutien: "Makabo", tuile_agenda: "Manaka",
      direct_titre: "Live uta na Kinshasa", ouvrir_yt: "Fungola na YouTube", bleu_ott: "📺 Tala na Bleu OTT", aussi: "EGRADI TV ezali mpe live na", dernier_direct: "Live ya suka",
      economie: "Kobatela data",
      economie_hls: "Kobatela data ebandi: live ezali kolekisama na qualité ya se.",
      economie_yt: "Na YouTube, finá ⚙ sima « Qualité » → 144p mpo osilisa data moke.",
      note_yt: "Soki live ezali te na YouTube, okomona nsango ete ezali te. Tala liyangani ya suka awa na se.",
      note_autre: "Soki elili eyei te, live ebandi naino te: meka lisusu sima ya miniti moke to kende na YouTube.",
      direct_indispo: "Live ezali te sikoyo.",
      videos_titre: "Bavideo", recherche_ph: "Luka liyangani, mateya…", aucune_video: "Video moko te emonani.",
      cat_tout: "Nyonso", cat_directs: "Ba live", cat_dominical: "Liyangani ya lomingo", cat_miracle: "Jeudi Miracle", cat_prophetique: "Vendredi prophétique", // noms des programmes, gardés tels quels
      cat_enseignement: "Mateya", cat_priere: "Losambo", cat_predications: "Mateya ya Liloba",
      etiquette_direct: "LIVE", etiquette_nouveau: "SIKA",
      tiktok_titre: "Na TikTok", tiktok_btn: "▶ Lakisa bavideo ya TikTok", tiktok_ouvrir: "Fungola na TikTok",
      archives_titre: "Bavideo nyonso ya kala", archives_note: "Bavideo koleka 1 500: tambola na liste kati na lecteur.", archives_btn: "▶ Fungola bavideo ya kala",
      programme_titre: "Programu ya poso", heures_note: "Ngonga ya Kinshasa (UTC+1).", revoir_dernier: "▶ Tala oyo ya suka", auj: "lelo",
      agenda_btn: "📅 Bakisa mayangani na manaka na ngai", agenda_ok: "Fungola fisyé mpo obakisa mayangani na manaka na yo ✓",
      evenements_titre: "Makambo ekoya", aucun_evenement: "Likambo moko te esakolami sikoyo. Landa bandeau INFOS mpe ba réseaux na biso.",
      prochain: "Liyangani ekoya", aujourdhui_sur: "Lelo na EGRADI TV", suivre_direct: "Landa live", dans: "Na", en_cours: "EZALI KOSALEMA",
      flash_tag: "LIYANGANI YA LELO", flash_aujourdhui: "Lelo na ngonga", flash_commence: "Ekobanda na", flash_live: "EZALI LIVE SIKOYO",
      flash_suivre: "Finá awa mpo na kolanda liyangani", flash_rejoindre: "Yaka kolanda biso live", flash_bouton: "Landa liyangani",
      notif_btn: "🔔 Zwa sango na liyangani nyonso", notif_ok: "Bansango ebandi ✓ Okoyeba ntango liyangani ekobanda.",
      notif_refus: "Bansango epekisami : ndima yango na bisaleli ya telefone to ya navigateur.",
      eglise_titre: "Lingomba Grâce Divine", dirigee_par: "Mokambi:", representant: "momonisi ya mibeko ya Lingomba Grâce Divine",
      contact_titre: "Benga biso", appeler: "📞 Benga", trouver_titre: "Esika tozali", carte: "📍 Fungola karte", suivez: "Landa biso",
      priere_titre: "Losambo & litatoli",
      priere_intro: "Tindela biso likambo olingi tobondela, to yebisa biso makambo Nzambe asali na bomoi na yo. Nsango na yo ekokende mbala moko epai ya bandeko ya lingomba.",
      f_type: "Lolenge ya nsango", type_priere: "Losambo", type_temoignage: "Litatoli", type_grace: "Matondi",
      f_nom: "Kombo na yo", f_ville: "Engumba / mboka", f_tel: "Telefone (soki olingi)", f_message: "Nsango na yo",
      envoyer_wa: "💬 Tinda na WhatsApp", envoyer_mail: "✉️ Tinda na e-mail",
      priere_note: "Nsango ekofungwama na WhatsApp to na e-mail: otya kaka « Tinda ».",
      champs_requis: "Palado, koma kombo na yo mpe nsango na yo.",
      soutien_titre: "Tinda makabo na yo", copier: "Kopia", copie: "Nimero ekopiami ✓",
      soutien_wa: "💬 Senga banimero na WhatsApp", soutien_merci: "Nzambe apambola yo mingi mpo na motema malamu na yo.",
      partager: "Kabola", lien_copie: "Lien ekopiami ✓", installee: "EGRADI TV etyami ✓", droits: "Makoki nyonso ebatelami.", langue: "Lokota",
      afficher_plus: "Lakisa mosusu", pasteurs_titre: "Bapasteur na biso", galerie_titre: "Bafoto", voir_predications: "▶ Tala mateya na ye", voir_video: "▶ Tala video", alerte_direct: "🔔 Yeba ntango live ebandi (WhatsApp)", verset_titre: "📖 Liloba ya lelo", confidentialite: "Politique ya kobatela makambo na yo", mm_titre: "Mobile Money", banque_titre: "Kotinda na banki", banque_compte: "Nimero ya compte (IBAN)", banque_devise: "Mbongo", paypal_compte: "Compte PayPal", paypal_note: "Na PayPal: Tinda → tya adresse oyo.", copie_ok: "Ekopiami ✓", mode_audio: "Koyoka kaka", mode_audio_long: "🎧 Koyoka kaka (son)", audio_activer: "🎧 Koyoka kaka", audio_quitter: "📺 Kotala lisusu", audio_active: "🎧 Koyoka kaka : elilingi moke, son malamu", audio_desactive: "📺 Elilingi ya malamu", audio_note: "Elilingi moke, son malamu : ezali kolya données moke. Tika écran ezala pole.", en_direct: "na live", cat_maliste: "⭐ Liste na ngai", maliste_ajouter: "☆ Liste na ngai", maliste_retirer: "★ Ezali na liste", maliste_ajoute: "Ebakisami na liste na yo ⭐", maliste_retire: "Elongolami na liste", maliste_vide: "Liste na yo ezali mpamba. Fungola video mpe finga « ☆ Liste na ngai » mpo na kobomba yango awa.", continuer_titre: "▶ Kokoba kotala", reprise: "Ezongeli na", depuis_debut: "⟲ Kobanda ebandeli", hors_ligne: "Internet ezali te : bavideo mpe live ekozonga soki réseau ezongi.", en_ligne: "Internet ezongi ✓", off_choisir: "Pona ndenge ya kotinda", off_numero: "Nimero", off_qr: "Scanner code oyo na telefone mosusu mpo na kofungola ndenge oyo ya kotinda.", off_qr_tout_titre: "Kabola lokasa oyo", off_qr_tout: "Scanner code oyo mpo na kofungola makabo ya EGRADI TV na telefone mosusu.", off_etapes_mm: "Na menu ya Mobile Money, pona « Kotinda mbongo », sima tya nimero oyo mpe motuya.", off_etapes_banque: "Tinda mbongo uta na banki na yo to application ya banki na makambo oyo.", off_bandeau: "💝 Tinda makabo na yo", off_bandeau_sous: "M-Pesa · Airtel Money · Banki UBA · PayPal",
      notice_btn: "📄 Tángá buku ya kosalela (PDF, na lifalanse, 1,7 Mo)", presentation_titre: "🎬 Talá application na video", presentation_note: "Miniti 4 · na lifalanse · ndenge ya kotia mpe kosalela EGRADI TV · pene na 12 Mo", appli_titre: "Application EGRADI TV", appli_android: "📲 Kitisa mpo na Android",
      appli_detail: "Ofele · Android 7.0 to likolo · ",
      appli_iphone: "Na iPhone: na Safari, finá Kabola ⬆ sima « Sur l'écran d'accueil ».",
    },
    en: {
      nav_accueil: "Home", nav_direct: "Live", nav_videos: "Videos", nav_programme: "Schedule", nav_eglise: "Church",
      hero_direct: "Watch live", hero_revoir: "Replay services",
      derniers: "Latest services and lives", tout_voir: "See all →", pasteur: "Senior pastor", decouvrir: "Discover the church →",
      tuile_priere: "Prayer request", tuile_temoignage: "Testimony", tuile_soutien: "Offerings", tuile_agenda: "Events",
      direct_titre: "Live from Kinshasa", ouvrir_yt: "Open on YouTube", bleu_ott: "📺 Watch on Bleu OTT", aussi: "EGRADI TV is also live on", dernier_direct: "Latest live",
      economie: "Data saver",
      economie_hls: "Data saver on: the live plays in the lowest quality.",
      economie_yt: "On YouTube, tap ⚙ then “Quality” → 144p to use less data.",
      note_yt: "If no live is running on YouTube, an “unavailable” message appears. Watch the latest service below instead.",
      note_autre: "If the picture doesn't appear, the live may not have started yet: try again in a few minutes or switch to YouTube.",
      direct_indispo: "The live is not available right now.",
      videos_titre: "Videos", recherche_ph: "Search a service, a sermon…", aucune_video: "No video found.",
      cat_tout: "All", cat_directs: "Lives", cat_dominical: "Sunday service", cat_miracle: "Miracle Thursday", cat_prophetique: "Prophetic Friday",
      cat_enseignement: "Teaching", cat_priere: "Prayer", cat_predications: "Sermons",
      etiquette_direct: "LIVE", etiquette_nouveau: "NEW",
      tiktok_titre: "On TikTok", tiktok_btn: "▶ Show TikTok videos", tiktok_ouvrir: "Open in TikTok",
      archives_titre: "All channel archives", archives_note: "Over 1,500 videos: scroll the list inside the player.", archives_btn: "▶ Open archives",
      programme_titre: "Weekly schedule", heures_note: "Kinshasa time (UTC+1).", revoir_dernier: "▶ Watch the latest", auj: "today",
      agenda_btn: "📅 Add services to my calendar", agenda_ok: "Open the file to add the services to your calendar ✓",
      evenements_titre: "Upcoming events", aucun_evenement: "No events announced yet. Follow the INFOS banner and our social media.",
      prochain: "Next service", aujourdhui_sur: "Today on EGRADI TV", suivre_direct: "Watch live", dans: "In", en_cours: "LIVE NOW",
      flash_tag: "TODAY'S SERVICE", flash_aujourdhui: "Today at", flash_commence: "Starts in", flash_live: "LIVE NOW",
      flash_suivre: "Tap here to follow the service", flash_rejoindre: "Join us live", flash_bouton: "Watch the service",
      notif_btn: "🔔 Get a notification for every service", notif_ok: "Notifications on ✓ You will be alerted for every service.",
      notif_refus: "Notifications are blocked: allow them in your phone or browser settings.",
      eglise_titre: "Divine Grace Church", dirigee_par: "Led by:", representant: "legal representative of the Divine Grace Church",
      contact_titre: "Contact us", appeler: "📞 Call", trouver_titre: "Find us", carte: "📍 Open map", suivez: "Follow us",
      priere_titre: "Prayer & testimony",
      priere_intro: "Share your prayer request or tell us what God has done for you. Your message goes straight to the church team.",
      f_type: "Message type", type_priere: "Prayer request", type_temoignage: "Testimony", type_grace: "Thanksgiving",
      f_nom: "Your name", f_ville: "City / country", f_tel: "Phone (optional)", f_message: "Your message",
      envoyer_wa: "💬 Send via WhatsApp", envoyer_mail: "✉️ Send by e-mail",
      priere_note: "The message opens in WhatsApp or your mail app: just press Send.",
      champs_requis: "Please enter your name and your message.",
      soutien_titre: "Send your offerings", copier: "Copy", copie: "Number copied ✓",
      soutien_wa: "💬 Ask for the numbers on WhatsApp", soutien_merci: "May God richly bless you for your generosity.",
      partager: "Share", lien_copie: "Link copied ✓", installee: "EGRADI TV is installed ✓", droits: "All rights reserved.", langue: "Language",
      afficher_plus: "Show more", pasteurs_titre: "Our pastors", galerie_titre: "Gallery", voir_predications: "▶ See his sermons", voir_video: "▶ Watch the video", alerte_direct: "🔔 Get live alerts (WhatsApp)", verset_titre: "📖 Verse of the day", confidentialite: "Privacy policy", mm_titre: "Mobile Money", banque_titre: "Bank transfer", banque_compte: "Account no. (IBAN)", banque_devise: "Currency", paypal_compte: "PayPal account", paypal_note: "In PayPal: Send → paste this address.", copie_ok: "Copied ✓", mode_audio: "Audio mode", mode_audio_long: "🎧 Audio mode (listen only)", audio_activer: "🎧 Audio mode", audio_quitter: "📺 Show video", audio_active: "🎧 Audio mode: small picture, full sound", audio_desactive: "📺 Normal picture", audio_note: "Small picture, full sound: much less data. Keep the screen on.", en_direct: "live", cat_maliste: "⭐ My list", maliste_ajouter: "☆ My list", maliste_retirer: "★ In my list", maliste_ajoute: "Added to my list ⭐", maliste_retire: "Removed from my list", maliste_vide: "Your list is empty. Open a video and tap “☆ My list” to keep it here.", continuer_titre: "▶ Continue watching", reprise: "Resuming at", depuis_debut: "⟲ From the start", hors_ligne: "No Internet connection: videos and the live stream will come back once the network returns.", en_ligne: "Back online ✓", off_choisir: "Choose how to give", off_numero: "Number", off_qr: "Scan this code with another phone to open this giving option.", off_qr_tout_titre: "Share this page", off_qr_tout: "Scan this code to open EGRADI TV offerings on another phone.", off_etapes_mm: "In your Mobile Money menu, choose \"Send money\", then enter this number and the amount.", off_etapes_banque: "Make a transfer from your bank or banking app with these details.", off_bandeau: "💝 Send your offerings", off_bandeau_sous: "M-Pesa · Airtel Money · UBA Bank · PayPal",
      notice_btn: "📄 Read the user guide (PDF, in French, 1.7 MB)", presentation_titre: "🎬 Discover the app on video", presentation_note: "4 min · in French · how to install and use EGRADI TV · about 12 MB", appli_titre: "The EGRADI TV app", appli_android: "📲 Download for Android",
      appli_detail: "Free · Android 7.0 or later · ",
      appli_iphone: "On iPhone: in Safari, tap Share ⬆ then “Add to Home Screen”.",
    },
  };

  const LANGUES = { fr: "FR", ln: "LN", en: "EN" }; // libellés courts pour tenir sur un téléphone
  const NOMS = { fr: "Français", ln: "Lingála", en: "English" };
  let langue = localStorage.getItem("egradi-langue");
  if (!T[langue]) langue = (navigator.language || "fr").startsWith("en") ? "en" : "fr";

  window.EGRADI_LANGUE = langue;
  window.EGRADI_LOCALE = langue === "en" ? "en-GB" : "fr-FR"; // pas de format de date lingala dans les navigateurs
  window.t = (cle) => (T[langue] && T[langue][cle]) || T.fr[cle] || cle;

  function appliquer() {
    document.documentElement.lang = langue;
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    const choix = document.getElementById("langue");
    if (choix) {
      choix.innerHTML = Object.entries(LANGUES).map(([k, v]) => `<option value="${k}" title="${NOMS[k]}">${v}</option>`).join("");
      choix.value = langue;
      choix.title = t("langue");
      choix.addEventListener("change", () => {
        localStorage.setItem("egradi-langue", choix.value);
        location.reload();
      });
    }
  }
  window.EGRADI_TRADUIRE = appliquer;
})();

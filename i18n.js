// Traductions de l'interface EGRADI TV : français (fr), lingala (ln), anglais (en).
// Les textes de config.js (programme, description…) restent en français.
// Lingala : traduction à faire relire par un locuteur de l'église avant diffusion large.
(() => {
  const T = {
    fr: {
      nav_accueil: "Accueil", nav_direct: "Direct", nav_videos: "Vidéos", nav_programme: "Programme", nav_eglise: "Église",
      hero_direct: "Regarder le direct", hero_revoir: "Revoir les cultes",
      derniers: "Derniers cultes et directs", tout_voir: "Tout voir →", pasteur: "Pasteur principal", decouvrir: "Découvrir l'église →",
      tuile_priere: "Demande de prière", tuile_temoignage: "Témoignage", tuile_soutien: "Soutenir l'œuvre", tuile_agenda: "Agenda",
      direct_titre: "En direct de Kinshasa", ouvrir_yt: "Ouvrir sur YouTube", aussi: "EGRADI TV est aussi en direct sur", dernier_direct: "Dernier direct",
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
      eglise_titre: "L'Église Grâce Divine", dirigee_par: "Dirigée par :", representant: "représentant légal de l'Église Grâce Divine",
      contact_titre: "Nous contacter", appeler: "📞 Appeler", trouver_titre: "Nous trouver", carte: "📍 Ouvrir la carte", suivez: "Suivez-nous",
      priere_titre: "Prière & témoignage",
      priere_intro: "Confiez-nous votre sujet de prière ou partagez ce que Dieu a fait pour vous. Votre message est envoyé directement à l'équipe de l'église.",
      f_type: "Type de message", type_priere: "Demande de prière", type_temoignage: "Témoignage", type_grace: "Action de grâce",
      f_nom: "Votre nom", f_ville: "Ville / pays", f_tel: "Téléphone (facultatif)", f_message: "Votre message",
      envoyer_wa: "💬 Envoyer par WhatsApp", envoyer_mail: "✉️ Envoyer par e-mail",
      priere_note: "Le message s'ouvre dans WhatsApp ou votre messagerie : il ne reste qu'à appuyer sur Envoyer.",
      champs_requis: "Merci d'indiquer votre nom et votre message.",
      soutien_titre: "Soutenir l'œuvre de Dieu", copier: "Copier", copie: "Numéro copié ✓",
      soutien_wa: "💬 Demander les numéros sur WhatsApp", soutien_merci: "Que Dieu vous bénisse abondamment pour votre générosité.",
      partager: "Partager", lien_copie: "Lien copié ✓", installee: "EGRADI TV est installée ✓", droits: "Tous droits réservés.", langue: "Langue",
    },
    ln: {
      nav_accueil: "Ebandeli", nav_direct: "Live", nav_videos: "Bavideo", nav_programme: "Programu", nav_eglise: "Lingomba",
      hero_direct: "Tala live", hero_revoir: "Tala lisusu mayangani",
      derniers: "Mayangani ya suka", tout_voir: "Tala nyonso →", pasteur: "Mobateli monene", decouvrir: "Yeba lingomba →",
      tuile_priere: "Losambo", tuile_temoignage: "Litatoli", tuile_soutien: "Sunga mosala", tuile_agenda: "Manaka",
      direct_titre: "Live uta na Kinshasa", ouvrir_yt: "Fungola na YouTube", aussi: "EGRADI TV ezali mpe live na", dernier_direct: "Live ya suka",
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
      eglise_titre: "Lingomba Grâce Divine", dirigee_par: "Mokambi:", representant: "momonisi ya mibeko ya Lingomba Grâce Divine",
      contact_titre: "Benga biso", appeler: "📞 Benga", trouver_titre: "Esika tozali", carte: "📍 Fungola karte", suivez: "Landa biso",
      priere_titre: "Losambo & litatoli",
      priere_intro: "Tindela biso likambo olingi tobondela, to yebisa biso makambo Nzambe asali na bomoi na yo. Nsango na yo ekokende mbala moko epai ya bandeko ya lingomba.",
      f_type: "Lolenge ya nsango", type_priere: "Losambo", type_temoignage: "Litatoli", type_grace: "Matondi",
      f_nom: "Kombo na yo", f_ville: "Engumba / mboka", f_tel: "Telefone (soki olingi)", f_message: "Nsango na yo",
      envoyer_wa: "💬 Tinda na WhatsApp", envoyer_mail: "✉️ Tinda na e-mail",
      priere_note: "Nsango ekofungwama na WhatsApp to na e-mail: otya kaka « Tinda ».",
      champs_requis: "Palado, koma kombo na yo mpe nsango na yo.",
      soutien_titre: "Sunga mosala ya Nzambe", copier: "Kopia", copie: "Nimero ekopiami ✓",
      soutien_wa: "💬 Senga banimero na WhatsApp", soutien_merci: "Nzambe apambola yo mingi mpo na motema malamu na yo.",
      partager: "Kabola", lien_copie: "Lien ekopiami ✓", installee: "EGRADI TV etyami ✓", droits: "Makoki nyonso ebatelami.", langue: "Lokota",
    },
    en: {
      nav_accueil: "Home", nav_direct: "Live", nav_videos: "Videos", nav_programme: "Schedule", nav_eglise: "Church",
      hero_direct: "Watch live", hero_revoir: "Replay services",
      derniers: "Latest services and lives", tout_voir: "See all →", pasteur: "Senior pastor", decouvrir: "Discover the church →",
      tuile_priere: "Prayer request", tuile_temoignage: "Testimony", tuile_soutien: "Support the ministry", tuile_agenda: "Events",
      direct_titre: "Live from Kinshasa", ouvrir_yt: "Open on YouTube", aussi: "EGRADI TV is also live on", dernier_direct: "Latest live",
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
      eglise_titre: "Divine Grace Church", dirigee_par: "Led by:", representant: "legal representative of the Divine Grace Church",
      contact_titre: "Contact us", appeler: "📞 Call", trouver_titre: "Find us", carte: "📍 Open map", suivez: "Follow us",
      priere_titre: "Prayer & testimony",
      priere_intro: "Share your prayer request or tell us what God has done for you. Your message goes straight to the church team.",
      f_type: "Message type", type_priere: "Prayer request", type_temoignage: "Testimony", type_grace: "Thanksgiving",
      f_nom: "Your name", f_ville: "City / country", f_tel: "Phone (optional)", f_message: "Your message",
      envoyer_wa: "💬 Send via WhatsApp", envoyer_mail: "✉️ Send by e-mail",
      priere_note: "The message opens in WhatsApp or your mail app: just press Send.",
      champs_requis: "Please enter your name and your message.",
      soutien_titre: "Support God's work", copier: "Copy", copie: "Number copied ✓",
      soutien_wa: "💬 Ask for the numbers on WhatsApp", soutien_merci: "May God richly bless you for your generosity.",
      partager: "Share", lien_copie: "Link copied ✓", installee: "EGRADI TV is installed ✓", droits: "All rights reserved.", langue: "Language",
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

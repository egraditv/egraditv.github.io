// Nouveautés du 26/11/2026 : Bible intégrée, « J'ai envoyé mon offrande », anniversaire, thème clair, lieux de culte.
// Rien n'est envoyé à un serveur : les réglages restent sur le téléphone, les messages partent par WhatsApp.
(() => {
  const C = window.EGRADI;
  const A = window.EGRADI_APP;
  const $ = (s) => document.querySelector(s);
  const { esc, toast } = A;
  const L = window.EGRADI_LANGUE === "en" ? "en" : window.EGRADI_LANGUE === "ln" ? "ln" : "fr";
  const tel = (C.telephone || "").replace(/\D/g, "");
  const whatsapp = (texte) => window.open(`https://wa.me/${tel}?text=${encodeURIComponent(texte)}`, "_blank", "noopener");

  // Textes de ces nouveautés (le lingala est à faire relire, comme le reste de l'application)
  const TXT = {
    fr: {
      bible: "Bible", bible_err: "Impossible de charger ce chapitre. Vérifiez la connexion Internet.", bible_charge: "Chargement…",
      prec: "‹ Précédent", suiv: "Suivant ›", lu: "✓ J'ai lu ce chapitre", lire_verset: "📖 Lire le passage",
      off_titre: "Vous avez envoyé votre offrande ?", off_note: "Prévenez l'église sur WhatsApp : l'équipe confirme la réception. Rien n'est enregistré dans l'application.",
      off_montant: "Montant (ex. 20 USD, 50 000 FC)", off_nom: "Votre nom", off_bouton: "✅ J'ai envoyé mon offrande",
      off_msg: "🙏 OFFRANDE ENVOYÉE — application EGRADI TV", off_moyen: "Moyen", off_m: "Montant", off_n: "Nom", off_fin: "Merci de confirmer la réception. Que Dieu vous bénisse !",
      anniv_lien: "🎂 Recevoir une bénédiction le jour de mon anniversaire", anniv_titre: "Votre anniversaire",
      anniv_texte: "Le jour de votre anniversaire, l'application vous souhaitera une bonne fête avec une bénédiction. La date reste seulement sur ce téléphone.",
      anniv_prenom: "Votre prénom (facultatif)", anniv_jour: "Jour", anniv_mois: "Mois", anniv_ok: "Enregistrer", anniv_suppr: "Effacer",
      anniv_enregistre: "C'est noté : rendez-vous le jour de votre anniversaire 🎂", anniv_efface: "Date d'anniversaire effacée",
      anniv_bonne: "Joyeux anniversaire", anniv_benediction: "« Que l'Éternel te bénisse, et qu'il te garde ! Que l'Éternel fasse luire sa face sur toi, et qu'il t'accorde sa grâce ! Que l'Éternel tourne sa face vers toi, et qu'il te donne la paix ! »",
      anniv_ref: "Nombres 6:24-26", anniv_grace: "🙌 Rendre grâce avec l'église", anniv_partager: "Partager",
      anniv_msg: "🎂 Aujourd'hui c'est mon anniversaire ! Rendez grâce à Dieu avec moi.",
      theme_clair: "Thème clair", theme_sombre: "Thème sombre",
      viendrai: "🙋 Je viendrai", viendrai_msg: "🙋 JE VIENDRAI — application EGRADI TV", viendrai_nb: "Nous serons : ___ personne(s)", viendrai_nom: "Nom : ",
      lieux_titre: "Nos lieux de culte", lieu_itineraire: "📍 Itinéraire",
      mois: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    },
    ln: {
      bible: "Biblia", bible_err: "Tokoki te kofungola mokapo oyo. Tala soki Internet ezali.", bible_charge: "Ezali koya…",
      prec: "‹ Oyo eleki", suiv: "Oyo elandi ›", lu: "✓ Natángi mokapo oyo", lire_verset: "📖 Tánga eteni",
      off_titre: "Otindi likabo na yo ?", off_note: "Yebisa lingomba na WhatsApp : ekipi ekondimisa ete ezwami. Eloko moko te ebombamaka na application.",
      off_montant: "Motuya (ndakisa 20 USD, 50 000 FC)", off_nom: "Kombo na yo", off_bouton: "✅ Natindi likabo na ngai",
      off_msg: "🙏 LIKABO ETINDAMI — application EGRADI TV", off_moyen: "Lolenge", off_m: "Motuya", off_n: "Kombo", off_fin: "Botala soki ezwami. Nzambe apambola bino !",
      anniv_lien: "🎂 Zwa lipamboli na mokolo ya mbotama na ngai", anniv_titre: "Mokolo ya mbotama na yo",
      anniv_texte: "Na mokolo ya mbotama na yo, application ekotindela yo esengo elongo na lipamboli. Dati etikalaka kaka na telefone oyo.",
      anniv_prenom: "Kombo na yo (soki olingi)", anniv_jour: "Mokolo", anniv_mois: "Sanza", anniv_ok: "Bomba", anniv_suppr: "Longola",
      anniv_enregistre: "Ebombami : tokokutana na mokolo ya mbotama na yo 🎂", anniv_efface: "Dati ya mbotama elongolami",
      anniv_bonne: "Bonne fête ya mbotama", anniv_benediction: "« Que l'Éternel te bénisse, et qu'il te garde ! Que l'Éternel fasse luire sa face sur toi, et qu'il t'accorde sa grâce ! Que l'Éternel tourne sa face vers toi, et qu'il te donne la paix ! »",
      anniv_ref: "Nombres 6:24-26", anniv_grace: "🙌 Kumisa Nzambe elongo na lingomba", anniv_partager: "Kabola",
      anniv_msg: "🎂 Lelo ezali mokolo ya mbotama na ngai ! Kumisa Nzambe elongo na ngai.",
      theme_clair: "Langi ya pole", theme_sombre: "Langi ya molili",
      viendrai: "🙋 Nakoya", viendrai_msg: "🙋 NAKOYA — application EGRADI TV", viendrai_nb: "Tokozala : ___ bato", viendrai_nom: "Kombo : ",
      lieux_titre: "Bisika tosambelaka", lieu_itineraire: "📍 Nzela",
      mois: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    },
    en: {
      bible: "Bible", bible_err: "This chapter could not be loaded. Check your Internet connection.", bible_charge: "Loading…",
      prec: "‹ Previous", suiv: "Next ›", lu: "✓ I read this chapter", lire_verset: "📖 Read the passage",
      off_titre: "Have you sent your offering?", off_note: "Let the church know on WhatsApp: the team will confirm receipt. Nothing is stored in the app.",
      off_montant: "Amount (e.g. 20 USD)", off_nom: "Your name", off_bouton: "✅ I have sent my offering",
      off_msg: "🙏 OFFERING SENT — EGRADI TV app", off_moyen: "Method", off_m: "Amount", off_n: "Name", off_fin: "Please confirm receipt. God bless you!",
      anniv_lien: "🎂 Receive a blessing on my birthday", anniv_titre: "Your birthday",
      anniv_texte: "On your birthday, the app will wish you a happy birthday with a blessing. The date stays only on this phone.",
      anniv_prenom: "Your first name (optional)", anniv_jour: "Day", anniv_mois: "Month", anniv_ok: "Save", anniv_suppr: "Delete",
      anniv_enregistre: "Saved: see you on your birthday 🎂", anniv_efface: "Birthday deleted",
      anniv_bonne: "Happy birthday", anniv_benediction: "“The LORD bless thee, and keep thee: the LORD make his face shine upon thee, and be gracious unto thee: the LORD lift up his countenance upon thee, and give thee peace.”",
      anniv_ref: "Numbers 6:24-26", anniv_grace: "🙌 Give thanks with the church", anniv_partager: "Share",
      anniv_msg: "🎂 Today is my birthday! Give thanks to God with me.",
      theme_clair: "Light theme", theme_sombre: "Dark theme",
      viendrai: "🙋 I'll come", viendrai_msg: "🙋 I WILL COME — EGRADI TV app", viendrai_nb: "We will be: ___ person(s)", viendrai_nom: "Name: ",
      lieux_titre: "Our places of worship", lieu_itineraire: "📍 Directions",
      mois: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    },
  }[L];
  window.EGRADI_TXT2 = TXT;

  // =====================================================================
  // 1) BIBLE INTÉGRÉE — Louis Segond 1910 (français, lingala) / King James (anglais), domaine public.
  //    Texte fourni par api.getbible.net ; les chapitres lus sont gardés sur le téléphone (hors connexion).
  // =====================================================================
  // [nom Louis Segond, nom anglais, nombre de chapitres] — dans l'ordre des 66 livres
  const LIVRES = [
    ["Genèse", "Genesis", 50], ["Exode", "Exodus", 40], ["Lévitique", "Leviticus", 27], ["Nombres", "Numbers", 36], ["Deutéronome", "Deuteronomy", 34],
    ["Josué", "Joshua", 24], ["Juges", "Judges", 21], ["Ruth", "Ruth", 4], ["1 Samuel", "1 Samuel", 31], ["2 Samuel", "2 Samuel", 24],
    ["1 Rois", "1 Kings", 22], ["2 Rois", "2 Kings", 25], ["1 Chroniques", "1 Chronicles", 29], ["2 Chroniques", "2 Chronicles", 36], ["Esdras", "Ezra", 10],
    ["Néhémie", "Nehemiah", 13], ["Esther", "Esther", 10], ["Job", "Job", 42], ["Psaumes", "Psalms", 150], ["Proverbes", "Proverbs", 31],
    ["Ecclésiaste", "Ecclesiastes", 12], ["Cantique des cantiques", "Song of Solomon", 8], ["Ésaïe", "Isaiah", 66], ["Jérémie", "Jeremiah", 52], ["Lamentations", "Lamentations", 5],
    ["Ézéchiel", "Ezekiel", 48], ["Daniel", "Daniel", 12], ["Osée", "Hosea", 14], ["Joël", "Joel", 3], ["Amos", "Amos", 9],
    ["Abdias", "Obadiah", 1], ["Jonas", "Jonah", 4], ["Michée", "Micah", 7], ["Nahum", "Nahum", 3], ["Habacuc", "Habakkuk", 3],
    ["Sophonie", "Zephaniah", 3], ["Aggée", "Haggai", 2], ["Zacharie", "Zechariah", 14], ["Malachie", "Malachi", 4], ["Matthieu", "Matthew", 28],
    ["Marc", "Mark", 16], ["Luc", "Luke", 24], ["Jean", "John", 21], ["Actes", "Acts", 28], ["Romains", "Romans", 16],
    ["1 Corinthiens", "1 Corinthians", 16], ["2 Corinthiens", "2 Corinthians", 13], ["Galates", "Galatians", 6], ["Éphésiens", "Ephesians", 6], ["Philippiens", "Philippians", 4],
    ["Colossiens", "Colossians", 4], ["1 Thessaloniciens", "1 Thessalonians", 5], ["2 Thessaloniciens", "2 Thessalonians", 3], ["1 Timothée", "1 Timothy", 6], ["2 Timothée", "2 Timothy", 4],
    ["Tite", "Titus", 3], ["Philémon", "Philemon", 1], ["Hébreux", "Hebrews", 13], ["Jacques", "James", 5], ["1 Pierre", "1 Peter", 5],
    ["2 Pierre", "2 Peter", 3], ["1 Jean", "1 John", 5], ["2 Jean", "2 John", 1], ["3 Jean", "3 John", 1], ["Jude", "Jude", 1],
    ["Apocalypse", "Revelation", 22],
  ];
  const VERSION = L === "en" ? { code: "kjv", nom: "King James Version" } : { code: "ls1910", nom: "Louis Segond 1910" };
  const nomLivre = (i) => (L === "en" ? LIVRES[i][1] : LIVRES[i][0]);
  const normal = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  const INDEX = {};
  LIVRES.forEach(([fr, en], i) => { for (const n of [fr, en]) { INDEX[normal(n)] = i; INDEX[normal(n).replace(/s$/, "")] = i; } });
  Object.assign(INDEX, { psaume: 18, ps: 18, cantique: 21, actesdesapotres: 43, song: 21, songofsongs: 21, apoc: 65 });

  // « Jean 3:16 », « Psaume 23:1 », « 2 Corinthiens 9:7 », « Nombres 6:24-26 » → { livre, chapitre, verset }
  function lireReference(ref) {
    const m = /^\s*([1-3]?\s*[^\d:]+?)\s+(\d+)(?:\s*[:.,]\s*(\d+))?/.exec(ref || "");
    if (!m) return null;
    const livre = INDEX[normal(m[1])] ?? INDEX[normal(m[1]).replace(/s$/, "")];
    return livre === undefined ? null : { livre, chapitre: +m[2], verset: m[3] ? +m[3] : 0 };
  }
  window.EGRADI_LIRE_REF = lireReference;

  const fenetre = document.createElement("dialog");
  fenetre.className = "fenetre-bible";
  fenetre.setAttribute("aria-label", TXT.bible);
  fenetre.innerHTML = `
    <div class="bible-entete">
      <select id="bible-livre" aria-label="${esc(TXT.bible)}">${LIVRES.map((_, i) => `<option value="${i}">${esc(nomLivre(i))}</option>`).join("")}</select>
      <select id="bible-chapitre" aria-label="Chapitre"></select>
      <button type="button" class="fermer" id="bible-fermer" aria-label="Fermer">✕</button>
    </div>
    <div id="bible-texte" class="bible-texte" tabindex="0"></div>
    <div class="bible-pied">
      <button type="button" class="bouton petit" id="bible-prec">${esc(TXT.prec)}</button>
      <span class="bible-version">${esc(VERSION.nom)}</span>
      <button type="button" class="bouton petit" id="bible-suiv">${esc(TXT.suiv)}</button>
    </div>
    <button type="button" class="bouton principal bible-lu" id="bible-lu" hidden>${esc(TXT.lu)}</button>`;
  document.body.append(fenetre);
  const selLivre = fenetre.querySelector("#bible-livre"), selChap = fenetre.querySelector("#bible-chapitre");
  let position = { livre: 42, chapitre: 3 }, demande = 0, apresLecture = null;

  async function chapitre(livre, c) {
    const cle = `egradi-bible-${VERSION.code}-${livre + 1}-${c}`;
    try { const d = JSON.parse(localStorage.getItem(cle) || "null"); if (d) return d; } catch {}
    const r = await fetch(`https://api.getbible.net/v2/${VERSION.code}/${livre + 1}/${c}.json`);
    if (!r.ok) throw new Error(r.status);
    const j = await r.json();
    const versets = (j.verses || []).map((v) => [v.verse, String(v.text).replace(/\s+/g, " ").trim()]);
    if (!versets.length) throw new Error("vide");
    // On garde les 60 derniers chapitres lus, pour les relire sans connexion
    try {
      localStorage.setItem(cle, JSON.stringify(versets));
      const liste = JSON.parse(localStorage.getItem("egradi-bible-liste") || "[]").filter((x) => x !== cle);
      liste.push(cle);
      while (liste.length > 60) localStorage.removeItem(liste.shift());
      localStorage.setItem("egradi-bible-liste", JSON.stringify(liste));
    } catch {}
    return versets;
  }

  async function afficherChapitre(livre, c, verset) {
    livre = Math.max(0, Math.min(65, livre));
    c = Math.max(1, Math.min(LIVRES[livre][2], c));
    position = { livre, chapitre: c };
    selLivre.value = livre;
    selChap.innerHTML = Array.from({ length: LIVRES[livre][2] }, (_, k) => `<option value="${k + 1}">${k + 1}</option>`).join("");
    selChap.value = c;
    fenetre.querySelector("#bible-prec").disabled = livre === 0 && c === 1;
    fenetre.querySelector("#bible-suiv").disabled = livre === 65 && c === LIVRES[65][2];
    const zone = fenetre.querySelector("#bible-texte");
    zone.innerHTML = `<p class="note">${esc(TXT.bible_charge)}</p>`;
    const n = ++demande;
    try {
      const versets = await chapitre(livre, c);
      if (n !== demande) return;
      zone.innerHTML = `<h3>${esc(nomLivre(livre))} ${c}</h3>` +
        versets.map(([v, t]) => `<p id="bv-${v}"${verset && v === verset ? ' class="choisi"' : ""}><sup>${v}</sup> ${esc(t)}</p>`).join("");
      const cible = verset && zone.querySelector(`#bv-${verset}`);
      if (cible) cible.scrollIntoView({ block: "center" }); else zone.scrollTop = 0;
    } catch {
      if (n === demande) zone.innerHTML = `<p class="note">${esc(TXT.bible_err)}</p>`;
    }
  }

  // Ouvre la Bible ; « fin » : fonction appelée par le bouton « J'ai lu » (plan de lecture)
  function ouvrirBible(livre, c, verset, fin) {
    apresLecture = fin || null;
    fenetre.querySelector("#bible-lu").hidden = !fin;
    if (!fenetre.open) fenetre.showModal();
    afficherChapitre(livre, c, verset);
  }
  window.EGRADI_BIBLE = ouvrirBible;
  selLivre.addEventListener("change", () => afficherChapitre(+selLivre.value, 1));
  selChap.addEventListener("change", () => afficherChapitre(position.livre, +selChap.value));
  fenetre.querySelector("#bible-prec").addEventListener("click", () => {
    const { livre, chapitre: c } = position;
    if (c > 1) afficherChapitre(livre, c - 1); else if (livre > 0) afficherChapitre(livre - 1, LIVRES[livre - 1][2]);
  });
  fenetre.querySelector("#bible-suiv").addEventListener("click", () => {
    const { livre, chapitre: c } = position;
    if (c < LIVRES[livre][2]) afficherChapitre(livre, c + 1); else if (livre < 65) afficherChapitre(livre + 1, 1);
  });
  fenetre.querySelector("#bible-fermer").addEventListener("click", () => fenetre.close());
  fenetre.querySelector("#bible-lu").addEventListener("click", () => { const f = apresLecture; fenetre.close(); f?.(); });
  fenetre.addEventListener("click", (e) => e.target === fenetre && fenetre.close());

  // Références cliquables : verset du jour et verset de la page Offrandes
  function rendreCliquable(el, ref) {
    const r = lireReference(ref);
    if (!el || !r) return;
    el.classList.add("ref-biblique");
    el.setAttribute("role", "button");
    el.tabIndex = 0;
    el.title = TXT.lire_verset;
    const ouvrir = () => ouvrirBible(r.livre, r.chapitre, r.verset);
    el.addEventListener("click", ouvrir);
    el.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ouvrir()));
  }
  rendreCliquable($("#verset-ref"), $("#verset-ref")?.textContent);
  const versetOffrande = $("#soutien-verset");
  if (versetOffrande) {
    const ref = (versetOffrande.textContent.match(/—\s*(.+)$/) || [])[1];
    if (ref) {
      versetOffrande.innerHTML = esc(versetOffrande.textContent.replace(/—\s*.+$/, "— ")) + `<cite>${esc(ref)}</cite>`;
      rendreCliquable(versetOffrande.querySelector("cite"), ref);
    }
  }

  // Plan « La Bible en 260 jours » : le chapitre s'ouvre dans l'application (avec « J'ai lu »)
  const lienLecture = $("#lecture-lire");
  if (lienLecture) {
    lienLecture.addEventListener("click", (e) => {
      const texte = $("#lecture-chapitre").textContent.replace(/^[^:]*:\s*/, "");
      const r = lireReference(texte);
      if (!r) return; // sinon le lien BibleGateway s'ouvre comme avant
      e.preventDefault();
      ouvrirBible(r.livre, r.chapitre, 0, () => $("#lecture-lu")?.click());
    });
  }

  // =====================================================================
  // 2) OFFRANDES : « J'ai envoyé mon offrande » → message WhatsApp prêt à envoyer
  // =====================================================================
  const detail = $("#detail-offrande");
  if (detail && tel) {
    const bloc = document.createElement("form");
    bloc.className = "bloc formulaire offrande-envoyee";
    bloc.noValidate = true;
    bloc.innerHTML = `
      <h3>${esc(TXT.off_titre)}</h3>
      <p class="note">${esc(TXT.off_note)}</p>
      <label>${esc(TXT.off_montant)}<input name="montant" inputmode="text" autocomplete="off" maxlength="40"></label>
      <label>${esc(TXT.off_nom)}<input name="nom" autocomplete="name" maxlength="60"></label>
      <button class="bouton whatsapp" type="submit">${esc(TXT.off_bouton)}</button>`;
    detail.after(bloc);
    bloc.addEventListener("submit", (e) => {
      e.preventDefault();
      const moyen = $("#choix-offrande [aria-selected='true']")?.textContent.trim() || "";
      const montant = bloc.montant.value.trim(), nom = bloc.nom.value.trim();
      whatsapp([TXT.off_msg, "", moyen && `${TXT.off_moyen} : ${moyen}`, montant && `${TXT.off_m} : ${montant}`, nom && `${TXT.off_n} : ${nom}`, "", TXT.off_fin]
        .filter((l) => typeof l === "string").join("\n").replace(/\n{3,}/g, "\n\n"));
    });
  }

  // =====================================================================
  // 3) ÉVÉNEMENTS : « Je viendrai » → message WhatsApp (appelé depuis plus.js)
  // =====================================================================
  window.EGRADI_VIENDRAI = (ev) => {
    const quand = new Date(ev.date + "T12:00:00").toLocaleDateString(window.EGRADI_LOCALE, { weekday: "long", day: "numeric", month: "long" });
    whatsapp([TXT.viendrai_msg, "", `« ${ev.titre} »`, `${quand}${ev.heure ? " · " + ev.heure : ""}${ev.lieu ? " · " + ev.lieu : ""}`, "", TXT.viendrai_nb, TXT.viendrai_nom].join("\n"));
  };

  // =====================================================================
  // 4) ANNIVERSAIRE : bénédiction le jour J (date gardée seulement sur le téléphone)
  // =====================================================================
  const CLE_ANNIV = "egradi-anniversaire";
  const lireAnniv = () => { try { return JSON.parse(localStorage.getItem(CLE_ANNIV) || "null"); } catch { return null; } };
  const lienAnniv = document.createElement("button");
  lienAnniv.type = "button";
  lienAnniv.className = "lien-anniv";
  lienAnniv.textContent = TXT.anniv_lien;
  ($("#notif-zone") || $("#prochain")).after(lienAnniv);

  const dlgAnniv = document.createElement("dialog");
  dlgAnniv.className = "guide-iphone dlg-anniv";
  const jours = Array.from({ length: 31 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("");
  const mois = TXT.mois.map((m, i) => `<option value="${i + 1}">${esc(m)}</option>`).join("");
  dlgAnniv.innerHTML = `
    <button class="fermer" type="button" aria-label="Fermer">✕</button>
    <h3>🎂 ${esc(TXT.anniv_titre)}</h3>
    <p class="note">${esc(TXT.anniv_texte)}</p>
    <form class="formulaire" method="dialog">
      <label>${esc(TXT.anniv_prenom)}<input name="prenom" autocomplete="given-name" maxlength="30"></label>
      <div class="anniv-date">
        <label>${esc(TXT.anniv_jour)}<select name="jour">${jours}</select></label>
        <label>${esc(TXT.anniv_mois)}<select name="mois">${mois}</select></label>
      </div>
      <div class="actions"><button class="bouton principal" value="ok">${esc(TXT.anniv_ok)}</button><button class="bouton" value="effacer">${esc(TXT.anniv_suppr)}</button></div>
    </form>`;
  document.body.append(dlgAnniv);
  dlgAnniv.querySelector(".fermer").addEventListener("click", () => dlgAnniv.close());
  lienAnniv.addEventListener("click", () => {
    const a = lireAnniv(), f = dlgAnniv.querySelector("form");
    f.prenom.value = a?.prenom || ""; f.jour.value = a?.jour || 1; f.mois.value = a?.mois || 1;
    dlgAnniv.showModal();
  });
  dlgAnniv.addEventListener("close", () => {
    const f = dlgAnniv.querySelector("form");
    if (dlgAnniv.returnValue === "ok") {
      localStorage.setItem(CLE_ANNIV, JSON.stringify({ prenom: f.prenom.value.trim(), jour: +f.jour.value, mois: +f.mois.value }));
      toast(TXT.anniv_enregistre);
    } else if (dlgAnniv.returnValue === "effacer") {
      localStorage.removeItem(CLE_ANNIV);
      toast(TXT.anniv_efface);
    }
    dlgAnniv.returnValue = "";
    afficherAnniv();
  });

  function afficherAnniv() {
    document.querySelector(".carte-anniv")?.remove();
    const a = lireAnniv();
    const k = new Date(Date.now() + 3600000); // date de Kinshasa
    const local = new Date();
    const estLeJour = a && ((k.getUTCDate() === a.jour && k.getUTCMonth() + 1 === a.mois) || (local.getDate() === a.jour && local.getMonth() + 1 === a.mois));
    lienAnniv.hidden = !!estLeJour;
    if (!estLeJour) return;
    const carte = document.createElement("div");
    carte.className = "carte-anniv";
    carte.innerHTML = `
      <p class="anniv-titre">🎂 ${esc(TXT.anniv_bonne)}${a.prenom ? ", " + esc(a.prenom) : ""} !</p>
      <blockquote>${esc(TXT.anniv_benediction)}</blockquote>
      <cite>${esc(TXT.anniv_ref)}</cite>
      <div class="actions">
        <a class="bouton principal" href="#priere" data-grace>${esc(TXT.anniv_grace)}</a>
        <button class="bouton" type="button" data-partager>${esc(TXT.anniv_partager)}</button>
      </div>`;
    $("#flash-culte").before(carte);
    rendreCliquable(carte.querySelector("cite"), TXT.anniv_ref);
    carte.querySelector("[data-grace]").addEventListener("click", () => {
      const f = $("#form-priere");
      if (f) { f.type.value = "grace"; if (a.prenom && !f.nom.value) f.nom.value = a.prenom; }
    });
    carte.querySelector("[data-partager]").addEventListener("click", () =>
      A.partager(`${TXT.anniv_msg} ${TXT.anniv_benediction} — ${TXT.anniv_ref} · EGRADI TV`, location.href.split("#")[0]));
  }
  afficherAnniv();

  // =====================================================================
  // 5) THÈME CLAIR / SOMBRE (bouton ☀️ / 🌙 en haut, choix mémorisé)
  // =====================================================================
  const boutonTheme = document.createElement("button");
  boutonTheme.type = "button";
  boutonTheme.className = "icone-bouton bouton-theme";
  const appliquerTheme = () => {
    const clair = document.documentElement.dataset.theme === "clair";
    boutonTheme.textContent = clair ? "🌙" : "☀️";
    boutonTheme.title = clair ? TXT.theme_sombre : TXT.theme_clair;
    boutonTheme.setAttribute("aria-label", boutonTheme.title);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", clair ? "#ffffff" : "#0a1022");
  };
  boutonTheme.addEventListener("click", () => {
    const clair = document.documentElement.dataset.theme !== "clair";
    if (clair) document.documentElement.dataset.theme = "clair"; else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("egradi-theme", clair ? "clair" : "sombre"); } catch {}
    appliquerTheme();
    toast(clair ? TXT.theme_clair : TXT.theme_sombre);
  });
  $("#taille-texte")?.after(boutonTheme);
  appliquerTheme();

  // =====================================================================
  // 6) NOS LIEUX DE CULTE (page Église) : le siège + les autres lieux de config.js (« lieux »)
  // =====================================================================
  const lieux = C.lieux || [];
  const adresse = $("#adresse");
  if (lieux.length && adresse) {
    const blocPrincipal = adresse.closest(".bloc");
    const titre = blocPrincipal.previousElementSibling;
    if (titre?.matches("h2")) titre.textContent = "⛪ " + TXT.lieux_titre;
    const premier = lieux[0];
    if (premier?.nom) adresse.insertAdjacentHTML("beforebegin", `<h3 class="lieu-nom">${esc(premier.nom)}</h3>${premier.quand ? `<p class="lieu-quand">${esc(premier.quand)}</p>` : ""}`);
    blocPrincipal.insertAdjacentHTML("afterend", lieux.slice(1).map((l) => `
      <div class="bloc lieu">
        <h3 class="lieu-nom">${esc(l.nom)}</h3>
        ${l.quand ? `<p class="lieu-quand">${esc(l.quand)}</p>` : ""}
        <address>${(l.adresse || []).map(esc).join("<br>")}</address>
        ${l.carte ? `<div class="actions"><a class="bouton" href="${esc(l.carte)}" target="_blank" rel="noopener">${esc(TXT.lieu_itineraire)}</a></div>` : ""}
      </div>`).join(""));
  }
})();

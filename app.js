(() => {
  const C = window.EGRADI;
  const VIDEOS = window.EGRADI_VIDEOS || [];
  const $ = (s) => document.querySelector(s);
  const tr = window.t || ((k) => k); // traductions (i18n.js)
  const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  const CATEGORIES = [
    { nom: tr("cat_tout"), mot: "" },
    { nom: tr("cat_directs"), mot: "^direct" },
    { nom: tr("cat_dominical"), mot: "dominica" },
    { nom: tr("cat_miracle"), mot: "jeudi miracle|guérison|guerison" },
    { nom: tr("cat_prophetique"), mot: "vendredi proph" },
    { nom: tr("cat_enseignement"), mot: "biyano|enseignement" },
    { nom: tr("cat_priere"), mot: "pri[eè]re" },
    { nom: tr("cat_predications"), mot: "pr[ée]dication" },
    { nom: tr("cat_maliste"), mot: "", favoris: true },
  ];

  const correspond = (titre, mot) => !mot || new RegExp(mot, "i").test(titre);
  const dateFr = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString(window.EGRADI_LOCALE || "fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const titrePropre = (t) => t.replace(/^Direct\s*:\s*/i, "");
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  window.EGRADI_TRADUIRE?.();

  // ---------- Mémoire du téléphone : « Ma liste » et reprise de lecture (rien n'est envoyé) ----------
  // { favoris: [id…], pos: {id: secondes}, duree: {id: secondes}, quand: {id: horodatage}, infos: {id: {id,titre,date}} }
  const CLE_MEMOIRE = "egradi-memoire";
  const memo = (() => {
    const vide = () => ({ favoris: [], pos: {}, duree: {}, quand: {}, infos: {} });
    try { return Object.assign(vide(), JSON.parse(localStorage.getItem(CLE_MEMOIRE) || "{}")); }
    catch { return vide(); }
  })();
  function sauverMemoire() {
    // On garde les 40 dernières vidéos regardées (et toutes celles de « Ma liste »)
    const ids = Object.keys(memo.quand).sort((a, b) => memo.quand[b] - memo.quand[a]);
    for (const id of ids.slice(40)) if (!memo.favoris.includes(id)) { delete memo.pos[id]; delete memo.duree[id]; delete memo.quand[id]; delete memo.infos[id]; }
    try { localStorage.setItem(CLE_MEMOIRE, JSON.stringify(memo)); } catch {}
  }
  const estFavori = (id) => memo.favoris.includes(id);
  const videoDe = (id) => VIDEOS.find((v) => v.id === id) || memo.infos[id];
  const minutes = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
  // Une vidéo « commencée » : au moins 30 s regardées et pas finie
  const commencee = (id) => memo.pos[id] >= 30 && (!memo.duree[id] || memo.pos[id] < memo.duree[id] - 45);

  // ---------- Remplissage à partir de config.js ----------
  $("#slogan").textContent = C.slogan;
  $("#avatar").src = C.avatar;
  // Photo de présentation : affichée en entier en haut de l'accueil (version légère sur téléphone).
  const ban = C.banniere || {};
  const banImg = $("#hero-banniere-img");
  banImg.src = ban.grande;
  if (ban.petite) { banImg.srcset = `${ban.petite} 900w, ${ban.grande} 1559w`; banImg.sizes = "(max-width: 1100px) 100vw, 1100px"; }
  $("#hero-fond").src = ban.petite || ban.grande;
  $("#hero-banniere").addEventListener("click", () => {
    const d = document.createElement("dialog");
    d.className = "visionneuse";
    d.innerHTML = `<img src="${esc(ban.grande)}" alt="${esc(banImg.alt)}"><button type="button" class="visionneuse-fermer" aria-label="Fermer">✕</button>`;
    d.addEventListener("click", () => d.close());
    d.addEventListener("close", () => d.remove());
    document.body.append(d);
    d.showModal();
  });
  $("#description").textContent = C.description;
  $("#bienvenue").textContent = C.bienvenue;
  $("#dirigeant").textContent = C.dirigeant;
  $("#adresse").innerHTML = C.adresse.map(esc).join("<br>");
  $("#lien-carte").href = C.carte;
  if (C.telephone) {
    const chiffres = C.telephone.replace(/\D/g, "");
    // +243997751720 → +243 997 751 720
    $("#numero").textContent = C.telephone.replace(/^\+(\d{3})(\d{3})(\d{3})(\d{3})$/, "+$1 $2 $3 $4");
    $("#lien-appel").href = `tel:+${chiffres}`;
    $("#lien-whatsapp").href = `https://wa.me/${chiffres}?text=${encodeURIComponent(C.messageWhatsApp || "")}`;
  } else {
    $(".contact").previousElementSibling.hidden = true;
    $(".contact").hidden = true;
  }
  $("#lien-youtube-direct").href = C.youtubeUrl + "/streams";
  // Lien vers une application Android : l'ouvre si elle est installée, sinon sa page Play Store.
  const estAndroid = /Android/i.test(navigator.userAgent);
  const lienAppli = (paquet, playStore) =>
    estAndroid && paquet
      ? `intent://#Intent;package=${paquet};S.browser_fallback_url=${encodeURIComponent(playStore)};end`
      : playStore;
  if (C.bleuOtt?.playStore) {
    $("#lien-bleu-ott").href = lienAppli(C.bleuOtt.android, C.bleuOtt.playStore);
    $("#lien-bleu-ott").hidden = false;
    if (estAndroid && C.bleuOtt.android) $("#lien-bleu-ott").removeAttribute("target");
  }
  if (C.email) {
    $("#lien-email").href = `mailto:${C.email}?subject=${encodeURIComponent("Contact depuis l'application EGRADI TV")}`;
    $("#lien-email").hidden = false;
    $("#email-texte").textContent = C.email;
  }
  $("#chiffres").innerHTML = (C.chiffres || [])
    .map((c) => `<div><strong>${esc(c.valeur)}</strong><span>${esc(c.libelle)}</span></div>`)
    .join("");
  $("#dirigeant-accueil").textContent = C.dirigeant;
  $("#bienvenue-accueil").textContent = C.bienvenue;
  $("#annee").textContent = new Date().getFullYear();

  // Bandeau INFOS : le texte est doublé pour défiler sans coupure.
  const annonces = C.annonces || [];
  if (annonces.length) {
    const html = annonces.map((a) => `<span>${esc(a)}</span>`).join("");
    $("#bandeau-texte").innerHTML = html + html;
    $("#bandeau-texte").style.setProperty("--duree", `${Math.max(25, annonces.join("").length * 0.18)}s`);
  } else {
    $(".bandeau").hidden = true;
  }

  // Message éphémère en bas de l'écran
  let minuterieToast;
  function toast(texte) {
    const t = $("#toast");
    t.textContent = texte;
    t.classList.add("visible");
    clearTimeout(minuterieToast);
    minuterieToast = setTimeout(() => t.classList.remove("visible"), 2500);
  }
  async function partager(titre, url) {
    if (navigator.share) {
      try { await navigator.share({ title: titre, text: titre, url }); } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast(tr("lien_copie"));
    } catch {
      toast(url);
    }
  }
  // Logos des réseaux (dessinés en SVG : rien à télécharger). Le réseau est reconnu d'après l'adresse du lien.
  const LOGOS = {
    youtube: '<path fill="#fff" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>',
    facebook: '<path fill="#fff" d="M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.76 0 2.07.15 2.61.3v3.32c-.28-.03-.78-.04-1.39-.04-1.97 0-2.73.75-2.73 2.69v1.3h3.92l-.67 3.67h-3.25v8.25C19.4 23.24 24 18.18 24 12.04c0-6.63-5.37-12-12-12S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65z"/>',
    tiktok: '<path fill="#25f4ee" transform="translate(-.7 -.6)" d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fe2c55" transform="translate(.7 .6)" d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fff" d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
    instagram: '<rect x="2.2" y="2.2" width="19.6" height="19.6" rx="5.6" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="12" cy="12" r="4.6" fill="none" stroke="#fff" stroke-width="2.2"/><circle cx="17.6" cy="6.4" r="1.4" fill="#fff"/>',
    x: '<path fill="#fff" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.25 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z"/>',
  };
  const reseauDe = (url) => {
    const h = (() => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; } })();
    if (/youtube\.com$|youtu\.be$/.test(h)) return "youtube";
    if (/facebook\.com$|fb\.com$/.test(h)) return "facebook";
    if (/tiktok\.com$/.test(h)) return "tiktok";
    if (/instagram\.com$/.test(h)) return "instagram";
    if (/^x\.com$|twitter\.com$/.test(h)) return "x";
    return "";
  };
  $("#reseaux").innerHTML = C.reseaux
    .map((r) => {
      const res = reseauDe(r.url);
      const logo = res
        ? `<span class="logo-reseau logo-${res}" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20">${LOGOS[res]}</svg></span>`
        : "";
      return `<a class="reseau" href="${esc(r.url)}" target="_blank" rel="noopener">${logo}<span class="nom-reseau">${esc(r.nom)}</span></a>`;
    })
    .join("");

  const ailleurs = C.ailleurs || [];
  if (!ailleurs.length) $("#bloc-ailleurs").hidden = true;
  $("#ailleurs").innerHTML = ailleurs
    .map((a) => {
      const contenu = `<strong>📺 ${esc(a.nom)}</strong>${a.detail ? `<br><span class="heure">${esc(a.detail)}</span>` : ""}`;
      return a.url
        ? `<a href="${esc(lienAppli(a.android, a.url))}"${estAndroid && a.android ? "" : ' target="_blank"'} rel="noopener">${contenu}</a>`
        : `<div class="carte-ailleurs">${contenu}</div>`;
    })
    .join("");

  // ---------- Cartes vidéo ----------
  function carte(v) {
    const b = document.createElement("button");
    b.className = "video";
    b.type = "button";
    const estDirect = /^direct/i.test(v.titre);
    const recent = Date.now() - new Date(v.date + "T12:00:00") < 3 * 86400000;
    b.innerHTML = `
      <div class="miniature">
        <img loading="lazy" src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="">
        ${estDirect ? `<span class="etiquette direct">${tr("etiquette_direct")}</span>` : ""}
        ${recent ? `<span class="etiquette nouveau">${tr("etiquette_nouveau")}</span>` : ""}
        ${estFavori(v.id) ? `<span class="etoile" title="${tr("cat_maliste")}">★</span>` : ""}
        ${memo.pos[v.id] && memo.duree[v.id] ? `<span class="progression"><span style="width:${Math.min(100, Math.round((memo.pos[v.id] / memo.duree[v.id]) * 100))}%"></span></span>` : ""}
      </div>
      <div class="video-infos">
        <p class="video-titre">${esc(titrePropre(v.titre))}</p>
        <p class="video-date">${dateFr(v.date)}</p>
      </div>`;
    b.addEventListener("click", () => ouvrirVideo(v));
    return b;
  }
  function remplir(conteneur, liste) {
    conteneur.replaceChildren(...liste.map(carte));
    if (!liste.length) conteneur.innerHTML = `<p class="vide">${tr("aucune_video")}</p>`;
  }

  // ---------- Lecteur ----------
  // L'API YouTube (chargée à la première vidéo) permet de retenir où l'on s'est arrêté.
  const fenetre = $("#fenetre-video");
  let videoCourante = null;
  let joueur = null;
  let minuterieLecture = null;
  let apiYT = null;
  function chargerApiYT() {
    if (window.YT?.Player) return Promise.resolve();
    if (!apiYT) apiYT = new Promise((ok, echec) => {
      const avant = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { avant?.(); ok(); };
      const sc = document.createElement("script");
      sc.src = "https://www.youtube.com/iframe_api";
      sc.onerror = () => { apiYT = null; echec(); };
      document.head.append(sc);
    });
    return apiYT;
  }
  function noterPosition() {
    if (!joueur || !videoCourante) return;
    try {
      const t = joueur.getCurrentTime?.(), d = joueur.getDuration?.();
      if (typeof t === "number" && t > 0) {
        const id = videoCourante.id;
        memo.pos[id] = Math.floor(t);
        if (d > 0) memo.duree[id] = Math.floor(d);
        memo.quand[id] = Date.now();
        sauverMemoire();
      }
    } catch {}
  }
  function ouvrirVideo(v, depuisDebut) {
    if (!v) return;
    videoCourante = v;
    memo.infos[v.id] = { id: v.id, titre: v.titre, date: v.date };
    memo.quand[v.id] = Date.now();
    sauverMemoire();
    const depart = !depuisDebut && commencee(v.id) ? memo.pos[v.id] : 0;
    $("#fenetre-titre").textContent = titrePropre(v.titre);
    $("#fenetre-date").textContent = dateFr(v.date);
    $("#depuis-debut").hidden = !depart;
    majBoutonListe();
    // Fond du mode audio : la miniature de la vidéo, floutée
    $("#fenetre-video .lecteur").style.setProperty("--fond", `url("https://i.ytimg.com/vi/${v.id}/hqdefault.jpg")`);
    $("#audio-titre-video").textContent = titrePropre(v.titre);
    $("#audio-temps").textContent = "";
    $("#audio-lecture").textContent = "⏸";
    // Nouveau cadre à chaque vidéo : l'API YouTube s'y rattache proprement
    const ancien = $("#lecteur-video");
    const f = ancien.cloneNode(false);
    f.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&enablejsapi=1&start=${depart}&origin=${encodeURIComponent(location.origin)}`;
    ancien.replaceWith(f);
    if (!fenetre.open) fenetre.showModal();
    if (depart) toast(`${tr("reprise")} ${minutes(depart)}`);
    joueur = null;
    chargerApiYT().then(() => {
      if (videoCourante !== v || !f.isConnected) return;
      joueur = new YT.Player(f, {
        events: {
          onStateChange: (e) => {
            $("#audio-lecture").textContent = e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING ? "⏸" : "▶";
            if (e.data === YT.PlayerState.PAUSED) noterPosition();
            if (e.data === YT.PlayerState.ENDED) { delete memo.pos[v.id]; sauverMemoire(); }
          },
        },
      });
    }).catch(() => {});
    clearInterval(minuterieLecture);
    minuterieLecture = setInterval(noterPosition, 5000);
  }
  function majBoutonListe() {
    const b = $("#ma-liste");
    const dedans = !!(videoCourante && estFavori(videoCourante.id));
    b.textContent = dedans ? tr("maliste_retirer") : tr("maliste_ajouter");
    b.setAttribute("aria-pressed", dedans);
  }
  $("#ma-liste").addEventListener("click", () => {
    if (!videoCourante) return;
    const id = videoCourante.id;
    memo.favoris = estFavori(id) ? memo.favoris.filter((x) => x !== id) : [id, ...memo.favoris];
    memo.infos[id] = { id, titre: videoCourante.titre, date: videoCourante.date };
    sauverMemoire();
    majBoutonListe();
    toast(estFavori(id) ? tr("maliste_ajoute") : tr("maliste_retire"));
  });
  $("#depuis-debut").addEventListener("click", () => videoCourante && ouvrirVideo(videoCourante, true));

  // ---------- Mode audio ----------
  // La vidéo reste visible mais devient une petite vignette : YouTube envoie alors une image de très basse
  // qualité (beaucoup moins de données) et le son reste normal. De grands boutons remplacent l'image.
  const modeAudio = () => localStorage.getItem("egradi-audio") === "1";
  function appliquerAudio() {
    const a = modeAudio();
    $("#fenetre-video .lecteur").classList.toggle("audio", a);
    $("#audio-commandes").hidden = !a;
    $("#bouton-audio").textContent = a ? tr("audio_quitter") : tr("audio_activer");
    $("#bouton-audio").setAttribute("aria-pressed", a);
    $("#audio-direct").checked = a;
  }
  function changerAudio(a) {
    localStorage.setItem("egradi-audio", a ? "1" : "0");
    appliquerAudio();
    if (sourceActive) jouerSource(sourceActive);
    toast(a ? tr("audio_active") : tr("audio_desactive"));
  }
  $("#bouton-audio").addEventListener("click", () => changerAudio(!modeAudio()));
  const commande = (fn) => { try { fn(joueur); } catch {} };
  $("#audio-lecture").addEventListener("click", () =>
    commande((j) => (j.getPlayerState() === YT.PlayerState.PLAYING ? j.pauseVideo() : j.playVideo())));
  $("#audio-recul").addEventListener("click", () => commande((j) => j.seekTo(Math.max(0, j.getCurrentTime() - 15), true)));
  $("#audio-avance").addEventListener("click", () => commande((j) => j.seekTo(j.getCurrentTime() + 15, true)));
  setInterval(() => {
    if (!fenetre.open || !modeAudio() || !joueur?.getCurrentTime) return;
    try { $("#audio-temps").textContent = `${minutes(joueur.getCurrentTime())} / ${minutes(joueur.getDuration() || 0)}`; } catch {}
  }, 1000);
  fenetre.addEventListener("close", () => {
    noterPosition();
    clearInterval(minuterieLecture);
    joueur = null;
    $("#lecteur-video").src = "about:blank";
    rafraichirListes();
  });
  $("#fermer").addEventListener("click", () => fenetre.close());
  fenetre.addEventListener("click", (e) => e.target === fenetre && fenetre.close());
  $("#partager").addEventListener("click", () => {
    if (videoCourante) partager(`${titrePropre(videoCourante.titre)} — EGRADI TV`, `https://youtu.be/${videoCourante.id}`);
  });
  $("#partager-app").addEventListener("click", () =>
    partager("EGRADI TV — Église Grâce Divine, en direct de Kinshasa", location.href.split("#")[0])
  );

  // ---------- Accueil : prochain culte ----------
  remplir($("#dernieres"), VIDEOS.slice(0, 6));
  function majContinuer() {
    const liste = Object.keys(memo.pos)
      .filter(commencee)
      .sort((a, b) => (memo.quand[b] || 0) - (memo.quand[a] || 0))
      .map(videoDe).filter(Boolean).slice(0, 6);
    $("#bloc-continuer").hidden = !liste.length;
    if (liste.length) remplir($("#continuer"), liste);
  }
  majContinuer();
  // Les heures du programme sont celles de Kinshasa (UTC+1, sans heure d'été) : on compte toujours
  // en heure de Kinshasa, pour que le compte à rebours soit juste aussi pour la diaspora.
  // « Heure de Kinshasa » = horloge UTC décalée d'une heure, lue avec les méthodes getUTC*.
  const UNE_HEURE = 3600000;
  const kinshasa = () => new Date(Date.now() + UNE_HEURE);
  const aujourdhui = JOURS[kinshasa().getUTCDay()];

  // Lit une heure écrite « 9h », « 09h30 » ou « 18:00 ». Renvoie null si l'heure n'est pas encore connue.
  function lireHeure(texte) {
    const m = /(\d{1,2})\s*[h:]\s*(\d{2})?/i.exec(texte || "");
    return m ? { h: +m[1], m: +(m[2] || 0) } : null;
  }
  function prochainCulte() {
    const maintenant = kinshasa();
    let meilleur = null;
    for (const p of C.programmes) {
      const h = lireHeure(p.heure);
      const ecart = (JOURS.indexOf(p.jour) - maintenant.getUTCDay() + 7) % 7;
      const jour = [maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate() + ecart];
      let debut = new Date(Date.UTC(...jour, h ? h.h : 23, h ? h.m : 59));
      // Un culte est « en cours » pendant 2 h après son début ; ensuite on passe à la semaine suivante
      if (h && maintenant - debut > 2 * UNE_HEURE) debut = new Date(debut.getTime() + 7 * 24 * UNE_HEURE);
      if (!meilleur || debut < meilleur.debut) meilleur = { p, debut, heureConnue: !!h };
    }
    return meilleur;
  }
  function afficherProchain() {
    const n = prochainCulte();
    if (!n) return ($("#prochain").hidden = true);
    const maintenant = kinshasa();
    const ecart = n.debut - maintenant;
    const memeJour = n.debut.toISOString().slice(0, 10) === maintenant.toISOString().slice(0, 10);
    let quand;
    if (n.heureConnue && ecart <= 0) quand = `<span class="badge-live"><span class="point"></span> ${tr("en_cours")}</span>`;
    else if (n.heureConnue) {
      const j = Math.floor(ecart / 86400000), h = Math.floor((ecart % 86400000) / 3600000), m = Math.floor((ecart % 3600000) / 60000);
      quand = `${tr("dans")} <span class="compte">${j ? j + " j " : ""}${h} h ${String(m).padStart(2, "0")} min</span>`;
    } else quand = "";
    $("#prochain").innerHTML = `
      <div>
        <p class="sur-titre">${memeJour ? tr("aujourdhui_sur") : tr("prochain")}</p>
        <h3>${esc(n.p.titre)}</h3>
        <span class="quand">${esc(n.p.jour)} · ${esc(n.p.heure)}${quand ? " — " + quand : ""}</span>
      </div>
      <a class="bouton principal" href="#direct"><span class="point"></span> ${tr("suivre_direct")}</a>`;
  }
  afficherProchain();
  setInterval(afficherProchain, 30000);

  // ---------- Accueil : FLASH « culte du jour » ----------
  // Les jours de culte, un bandeau animé annonce le culte en haut de l'accueil :
  // avant le début → compte à rebours ; pendant 2 h → « EN DIRECT MAINTENANT ». Un clic ouvre le direct.
  function cultesDuJour() {
    const maintenant = kinshasa();
    return C.programmes
      .filter((p) => p.jour === JOURS[maintenant.getUTCDay()] && lireHeure(p.heure))
      .map((p) => {
        const h = lireHeure(p.heure);
        const debut = new Date(Date.UTC(maintenant.getUTCFullYear(), maintenant.getUTCMonth(), maintenant.getUTCDate(), h.h, h.m));
        return { p, debut, ecart: debut - maintenant };
      })
      .filter((c) => c.ecart > -2 * UNE_HEURE) // terminé 2 h après le début
      .sort((a, b) => a.debut - b.debut);
  }
  function afficherFlash() {
    const el = $("#flash-culte");
    const c = cultesDuJour()[0];
    if (!c) { el.hidden = true; el.className = "flash-culte"; return; }
    const live = c.ecart <= 0;
    let quand;
    if (live) quand = `<span class="flash-etat"><span class="point"></span> ${tr("flash_live")}</span>`;
    else {
      const h = Math.floor(c.ecart / 3600000), m = Math.ceil((c.ecart % 3600000) / 60000);
      const reste = h ? `${h} h ${String(m).padStart(2, "0")} min` : `${m} min`;
      quand = `<span class="flash-etat">${tr("flash_commence")} <strong class="compte">${reste}</strong></span>`;
    }
    el.className = "flash-culte" + (live ? " en-direct" : c.ecart < 30 * 60000 ? " imminent" : "");
    el.setAttribute("aria-label", `${tr("flash_tag")} : ${c.p.titre}, ${c.p.heure}. ${tr("flash_suivre")}`);
    el.innerHTML = `
      <span class="flash-eclat" aria-hidden="true"></span>
      <span class="flash-tag"><span class="flash-eclair" aria-hidden="true">⚡</span> ${tr("flash_tag")}</span>
      <span class="flash-corps">
        <span class="flash-titre">${esc(c.p.titre)}</span>
        <span class="flash-infos">${tr("flash_aujourdhui")} ${esc(c.p.heure)} · ${quand}</span>
        <span class="flash-appel">👉 ${live ? tr("flash_rejoindre") : tr("flash_suivre")}</span>
      </span>
      <span class="flash-bouton"><span class="point"></span> ${tr("flash_bouton")}</span>`;
    el.hidden = false;
  }
  afficherFlash();
  setInterval(afficherFlash, 20000);

  // ---------- Direct ----------
  // Sources : votre propre flux (HLS, vidéo, page intégrée) et/ou YouTube. Voir « directs » dans config.js.
  const SOURCES = (C.directs || [{ nom: "YouTube", type: "youtube" }]).filter((s) => s.type === "youtube" || s.url);
  const NOTES = {
    youtube: tr("note_yt"),
    autre: tr("note_autre"),
  };
  let hls = null;
  let sourceActive = null;

  function arreterDirect() {
    if (hls) { hls.destroy(); hls = null; }
    $("#zone-direct").replaceChildren();
  }

  function message(texte) {
    const p = document.createElement("div");
    p.className = "message-direct";
    p.textContent = texte;
    $("#zone-direct").replaceChildren(p);
  }

  // Mode audio sur la page Direct : petite vignette + texte (le direct n'a pas d'avance / recul)
  function habillerAudio(zone) {
    zone.classList.toggle("audio", modeAudio());
    zone.style.setProperty("--fond", `url("${C.banniere?.petite || "logo-512.png"}")`);
    if (!modeAudio()) return;
    const d = document.createElement("div");
    d.className = "audio-commandes";
    d.innerHTML = `<p class="audio-titre">🎧 ${tr("mode_audio")}</p><p class="audio-nom">EGRADI TV — ${tr("en_direct")}</p><p class="audio-note">${tr("audio_note")}</p>`;
    zone.append(d);
  }

  function jouerSource(s) {
    sourceActive = s;
    arreterDirect();
    $("#sources-direct").querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.nom === s.nom));
    const eco = economie();
    $("#note-direct").textContent = (s.type === "youtube" ? NOTES.youtube : NOTES.autre) +
      (eco ? " " + (s.type === "hls" ? tr("economie_hls") : tr("economie_yt")) : "");
    const zone = $("#zone-direct");

    if (s.type === "youtube" || s.type === "iframe") {
      const f = document.createElement("iframe");
      f.title = `${s.nom} en direct`;
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      f.src = s.type === "youtube"
        ? `https://www.youtube.com/embed/live_stream?channel=${C.youtubeChaineId}&autoplay=1`
        : s.url;
      zone.replaceChildren(f);
      habillerAudio(zone);
      return;
    }

    const v = document.createElement("video");
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    v.muted = true; // les navigateurs bloquent la lecture automatique avec le son ; un clic le remet
    zone.replaceChildren(v);
    habillerAudio(zone);
    v.addEventListener("error", () => message(tr("direct_indispo")));

    if (s.type === "video" || v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = s.url; // vidéo directe, ou HLS natif (iPhone, Safari, certains Android)
    } else if (window.Hls?.isSupported()) {
      hls = new Hls({ liveDurationInfinity: true, capLevelToPlayerSize: true });
      if (economie() || modeAudio()) {
        // qualité la plus basse (débit le plus faible) pour économiser les données mobiles
        hls.on(Hls.Events.MANIFEST_PARSED, (_, d) => {
          const plusBas = d.levels.reduce((m, l, i) => (l.bitrate < d.levels[m].bitrate ? i : m), 0);
          hls.autoLevelCapping = plusBas;
          hls.currentLevel = plusBas;
        });
      }
      hls.loadSource(s.url);
      hls.attachMedia(v);
      hls.on(Hls.Events.ERROR, (_, d) => {
        if (d.fatal) message(tr("direct_indispo"));
      });
    } else {
      message("Ce navigateur ne sait pas lire ce direct. Essayez la source YouTube.");
    }
    v.play?.().catch(() => {});
  }

  $("#sources-direct").innerHTML = SOURCES.length > 1
    ? SOURCES.map((s) => `<button role="tab" data-nom="${esc(s.nom)}">${s.type === "youtube" ? "▶ " : "📡 "}${esc(s.nom)}</button>`).join("")
    : "";
  $("#sources-direct").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) jouerSource(SOURCES.find((s) => s.nom === b.dataset.nom));
  });

  // Interrupteur « Économie de données » (mémorisé sur le téléphone)
  const economie = () => localStorage.getItem("egradi-economie") === "1";
  $("#economie").checked = economie();
  $("#audio-direct").addEventListener("change", (e) => changerAudio(e.target.checked));
  appliquerAudio();
  $("#economie").addEventListener("change", (e) => {
    localStorage.setItem("egradi-economie", e.target.checked ? "1" : "0");
    if (sourceActive) jouerSource(sourceActive);
  });

  function chargerDirect() {
    if (sourceActive || !SOURCES.length) return;
    // hls.js arrive en « defer » : on attend qu'il soit chargé si besoin.
    if (document.readyState === "loading") return document.addEventListener("DOMContentLoaded", chargerDirect, { once: true });
    jouerSource(SOURCES[0]);
  }
  function quitterDirect() {
    if (!sourceActive) return;
    arreterDirect();
    sourceActive = null;
  }
  remplir($("#dernier-direct"), VIDEOS.filter((v) => /^direct/i.test(v.titre)).slice(0, 1));

  // ---------- Vidéos : recherche + filtres ----------
  let categorie = CATEGORIES[0];
  // Affichage par paquets de 24 vidéos (bouton « Afficher plus ») pour économiser les données
  const PAQUET = 24;
  let nbAffichees = PAQUET;
  function filtrer(garderNombre) {
    if (garderNombre !== true) nbAffichees = PAQUET;
    const q = $("#recherche").value.trim().toLowerCase();
    const source = categorie.favoris ? memo.favoris.map(videoDe).filter(Boolean) : VIDEOS;
    const resultat = source.filter((v) => correspond(v.titre, categorie.mot) && (!q || v.titre.toLowerCase().includes(q)));
    remplir($("#liste-videos"), resultat.slice(0, nbAffichees));
    if (categorie.favoris && !resultat.length) $("#liste-videos").innerHTML = `<p class="vide">${tr("maliste_vide")}</p>`;
    $("#plus-videos").hidden = resultat.length <= nbAffichees;
    $("#plus-videos").textContent = `${tr("afficher_plus")} (${resultat.length - nbAffichees})`;
  }
  $("#plus-videos").addEventListener("click", () => {
    nbAffichees += PAQUET;
    filtrer(true);
  });
  $("#filtres").innerHTML = CATEGORIES.map(
    (c, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}">${esc(c.nom)}</button>`
  ).join("");
  $("#filtres").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    categorie = CATEGORIES[b.dataset.i];
    $("#filtres").querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b));
    filtrer();
  });
  $("#recherche").addEventListener("input", filtrer);
  filtrer();
  // Après une vidéo : barres de progression, étoiles et « Continuer à regarder » à jour
  function rafraichirListes() {
    majContinuer();
    remplir($("#dernieres"), VIDEOS.slice(0, 6));
    filtrer(true);
  }

  // ---------- Programme ----------
  $("#liste-programmes").innerHTML = C.programmes
    .map((p) => {
      const derniere = VIDEOS.find((v) => correspond(v.titre, p.mot));
      return `<li class="${p.jour === aujourdhui ? "aujourdhui" : ""}">
        <span class="jour">${esc(p.jour)}${p.jour === aujourdhui ? " · " + tr("auj") : ""}</span>
        <span><span class="titre">${esc(p.titre)}</span><span class="heure">${esc(p.heure)}</span></span>
        ${derniere ? `<a class="revoir" href="#" data-id="${derniere.id}">${tr("revoir_dernier")}</a>` : "<span></span>"}
      </li>`;
    })
    .join("");
  $("#liste-programmes").addEventListener("click", (e) => {
    const a = e.target.closest("a[data-id]");
    if (!a) return;
    e.preventDefault();
    ouvrirVideo(VIDEOS.find((v) => v.id === a.dataset.id));
  });

  // ---------- Navigation entre les vues ----------
  function afficher() {
    const id = (location.hash || "#accueil").slice(1);
    const vue = document.getElementById(id)?.classList.contains("vue") ? id : "accueil";
    document.querySelectorAll(".vue").forEach((s) => s.classList.toggle("active", s.id === vue));
    document.querySelectorAll(".barre-nav a").forEach((a) => a.classList.toggle("active", a.dataset.vue === vue));
    if (vue === "direct") chargerDirect();
    else quitterDirect(); // coupe le direct (et les données mobiles) quand on change de page
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", afficher);
  afficher();

  window.EGRADI_APP = { toast, esc, ouvrirVideo, lireHeure, JOURS };

  // ---------- Archives : toute la chaîne YouTube (playlist des mises en ligne) ----------
  $("#charger-archives").addEventListener("click", () => {
    const liste = C.youtubeChaineId.replace(/^UC/, "UU");
    const f = document.createElement("iframe");
    f.title = "Archives EGRADI TV";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    f.src = `https://www.youtube-nocookie.com/embed/videoseries?list=${liste}&rel=0`;
    $("#zone-archives").replaceChildren(f);
  });

  // ---------- TikTok : profil intégré (chargé seulement à la demande, pour économiser les données) ----------
  if (C.tiktok) {
    const urlTiktok = `https://www.tiktok.com/@${C.tiktok}`;
    $("#tiktok-pseudo").textContent = "@" + C.tiktok;
    $("#lien-tiktok").href = urlTiktok;
    $("#charger-tiktok").addEventListener("click", () => {
      $("#zone-tiktok").innerHTML = `
        <blockquote class="tiktok-embed" cite="${esc(urlTiktok)}" data-unique-id="${esc(C.tiktok)}" data-embed-type="creator" style="max-width:780px;min-width:288px;margin:0 auto">
          <section><a target="_blank" rel="noopener" href="${esc(urlTiktok)}">@${esc(C.tiktok)}</a></section>
        </blockquote>`;
      const s = document.createElement("script");
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.append(s);
    });
  } else {
    $("#bloc-tiktok").hidden = true;
  }

  // ---------- Hors connexion : un bandeau prévient l'utilisateur ----------
  function majReseau(changement) {
    const hors = !navigator.onLine;
    $("#hors-ligne").hidden = !hors;
    if (changement && !hors) toast(tr("en_ligne"));
  }
  window.addEventListener("online", () => majReseau(true));
  window.addEventListener("offline", () => majReseau(true));
  majReseau(false);

  // ---------- Application installable (hors ligne) ----------
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  let demandeInstallation = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    demandeInstallation = e;
    $("#installer").hidden = false;
  });
  $("#installer").addEventListener("click", async () => {
    if (!demandeInstallation) return;
    demandeInstallation.prompt();
    const { outcome } = await demandeInstallation.userChoice;
    if (outcome === "accepted") toast(tr("installee"));
    demandeInstallation = null;
    $("#installer").hidden = true;
  });

  // ---------- Fin de l'écran de démarrage ----------
  // « ?sans-intro » dans l'adresse : pas d'écran de démarrage (captures d'écran de la notice et de la vidéo)
  if (new URLSearchParams(location.search).has("sans-intro")) {
    const d = $("#demarrage");
    d.style.transition = "none";
    d.classList.add("fini");
    document.querySelectorAll(".vue").forEach((v) => (v.style.animation = "none"));
  }
  const debut = performance.now();
  window.addEventListener("load", () =>
    setTimeout(() => $("#demarrage").classList.add("fini"), Math.max(0, 900 - (performance.now() - debut)))
  );
  setTimeout(() => $("#demarrage").classList.add("fini"), 4000); // sécurité si une image tarde
})();

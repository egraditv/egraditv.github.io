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
  ];

  const correspond = (titre, mot) => !mot || new RegExp(mot, "i").test(titre);
  const dateFr = (iso) =>
    new Date(iso + "T12:00:00").toLocaleDateString(window.EGRADI_LOCALE || "fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const titrePropre = (t) => t.replace(/^Direct\s*:\s*/i, "");
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  window.EGRADI_TRADUIRE?.();

  // ---------- Remplissage à partir de config.js ----------
  $("#slogan").textContent = C.slogan;
  $("#avatar").src = C.avatar;
  $("#hero-fond").src = C.banniere;
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
  $("#reseaux").innerHTML = C.reseaux
    .map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nom)}</a>`)
    .join("");

  const ailleurs = C.ailleurs || [];
  if (!ailleurs.length) $("#bloc-ailleurs").hidden = true;
  $("#ailleurs").innerHTML = ailleurs
    .map((a) => {
      const contenu = `<strong>📺 ${esc(a.nom)}</strong>${a.detail ? `<br><span class="heure">${esc(a.detail)}</span>` : ""}`;
      return a.url
        ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${contenu}</a>`
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
  const fenetre = $("#fenetre-video");
  let videoCourante = null;
  function ouvrirVideo(v) {
    videoCourante = v;
    $("#fenetre-titre").textContent = titrePropre(v.titre);
    $("#fenetre-date").textContent = dateFr(v.date);
    $("#lecteur-video").src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`;
    fenetre.showModal();
  }
  fenetre.addEventListener("close", () => ($("#lecteur-video").src = "about:blank"));
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
      return;
    }

    const v = document.createElement("video");
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    v.muted = true; // les navigateurs bloquent la lecture automatique avec le son ; un clic le remet
    zone.replaceChildren(v);
    v.addEventListener("error", () => message(tr("direct_indispo")));

    if (s.type === "video" || v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = s.url; // vidéo directe, ou HLS natif (iPhone, Safari, certains Android)
    } else if (window.Hls?.isSupported()) {
      hls = new Hls({ liveDurationInfinity: true, capLevelToPlayerSize: true });
      if (economie()) {
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
    const resultat = VIDEOS.filter((v) => correspond(v.titre, categorie.mot) && (!q || v.titre.toLowerCase().includes(q)));
    remplir($("#liste-videos"), resultat.slice(0, nbAffichees));
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
  const debut = performance.now();
  window.addEventListener("load", () =>
    setTimeout(() => $("#demarrage").classList.add("fini"), Math.max(0, 900 - (performance.now() - debut)))
  );
  setTimeout(() => $("#demarrage").classList.add("fini"), 4000); // sécurité si une image tarde
})();

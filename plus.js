// Pages et fonctions complémentaires : prière & témoignage, soutien Mobile Money, événements, rappels d'agenda.
(() => {
  const C = window.EGRADI;
  const A = window.EGRADI_APP;
  const tr = window.t || ((k) => k);
  const $ = (s) => document.querySelector(s);
  const { esc, toast } = A;
  const chiffresTel = (C.telephone || "").replace(/\D/g, "");

  // ---------- Statistiques anonymes (seulement si un code GoatCounter est renseigné) ----------
  const gc = C.statistiques?.goatcounter;
  if (gc && /^[a-z0-9-]+$/i.test(gc)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${gc}.goatcounter.com/count`;
    document.head.append(s);
    // Compter aussi les changements de page internes (#direct, #videos…)
    window.addEventListener("hashchange", () =>
      window.goatcounter?.count?.({ path: location.pathname + location.hash.replace("#", "") })
    );
  }

  // ---------- Alerte des directs : Chaîne WhatsApp ----------
  if (C.whatsappChaine) {
    for (const id of ["#alerte-direct", "#alerte-direct-2"]) {
      const a = $(id);
      if (a) { a.href = C.whatsappChaine; a.parentElement.hidden = false; }
    }
  }

  // ---------- Notifications « culte du jour » (OneSignal, gratuit) ----------
  // S'active seulement quand config.js → notifications.onesignalAppId est rempli.
  // Les envois sont automatiques (GitHub Action « Notifications des cultes ») : 30 min avant et au début de chaque culte.
  const appId = C.notifications?.onesignalAppId;
  const zone = $("#notif-zone");
  if (appId && zone && "Notification" in window) {
    const bouton = $("#notif-activer"), etat = $("#notif-etat");
    // Le message « bloquées » ne s'affiche qu'après un appui sur le bouton (pas d'avertissement au chargement).
    const majEtat = (abonne, apresAppui = false) => {
      bouton.hidden = abonne;
      etat.textContent = abonne ? tr("notif_ok") : apresAppui && Notification.permission === "denied" ? tr("notif_refus") : "";
    };
    zone.hidden = false; // le bouton apparaît tout de suite ; l'appui attend que OneSignal soit prêt
    let pret = null;
    bouton.addEventListener("click", () => {
      bouton.disabled = true;
      window.OneSignalDeferred.push(async () => {
        try { const os = await pret; await os?.demander(); } catch {} finally { bouton.disabled = false; }
      });
    });
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    const s = document.createElement("script");
    s.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    s.defer = true;
    document.head.append(s);
    window.OneSignalDeferred.push(async (OneSignal) => {
      const sw = new URL("sw.js", location.href); // même service worker que l'application (il importe celui de OneSignal)
      pret = OneSignal.init({
        appId,
        ...(C.notifications.safariWebId ? { safari_web_id: C.notifications.safariWebId } : {}),
        serviceWorkerPath: sw.pathname.slice(1),
        serviceWorkerParam: { scope: sw.pathname.replace(/sw\.js$/, "") },
        allowLocalhostAsSecureOrigin: true,
      }).then(() => ({
        demander: async () => {
          await OneSignal.Notifications.requestPermission();
          if (Notification.permission === "granted") await OneSignal.User.PushSubscription.optIn();
          majEtat(OneSignal.User.PushSubscription.optedIn, true);
        },
      }));
      try { await pret; } catch { return; } // OneSignal indisponible (hors du site officiel, réseau…)
      majEtat(OneSignal.User.PushSubscription.optedIn);
      OneSignal.User.PushSubscription.addEventListener("change", (e) => majEtat(e.current.optedIn));
    });
  }

  // ---------- Nos pasteurs ----------
  const VIDEOS = window.EGRADI_VIDEOS || [];
  const initiales = (nom) => nom.split(/\s+/).slice(-2).map((m) => m[0]).join("").toUpperCase();
  $("#liste-pasteurs").innerHTML = (C.pasteurs || [])
    .map((p, i) => {
      const nb = p.recherche ? VIDEOS.filter((v) => v.titre.toLowerCase().includes(p.recherche.toLowerCase())).length : 0;
      return `<article class="pasteur">
        ${p.photo ? `<img src="${esc(p.photo)}" alt="${esc(p.nom)}" loading="lazy" width="88" height="88">` : `<span class="pasteur-initiales">${esc(initiales(p.nom))}</span>`}
        <div>
          <h3>${esc(p.nom)}</h3>
          <p class="sur-titre">${esc(p.role || "")}</p>
          ${p.description ? `<p class="pasteur-texte">${esc(p.description)}</p>` : ""}
          ${nb ? `<button class="bouton petit" data-pasteur="${i}">${tr("voir_predications")} (${nb})</button>` : ""}
        </div>
      </article>`;
    })
    .join("");
  $("#liste-pasteurs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pasteur]");
    if (!b) return;
    const p = C.pasteurs[b.dataset.pasteur];
    location.hash = "#videos";
    const champ = $("#recherche");
    champ.value = p.recherche;
    champ.dispatchEvent(new Event("input"));
  });
  if (!(C.pasteurs || []).length) $("#liste-pasteurs").previousElementSibling.hidden = true;

  // ---------- Galerie : photos choisies + images des derniers cultes ----------
  const G = C.galerie || {};
  const cultes = VIDEOS.filter((v) => /culte|direct|miracle|proph|pri[eè]re|biyano/i.test(v.titre)).slice(0, G.imagesDesCultes ?? 12);
  const elements = [
    ...(G.photos || []).map((p) => (typeof p === "string" ? { src: p, legende: "" } : p)),
    ...cultes.map((v) => ({ src: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, grande: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`, legende: v.titre.replace(/^Direct\s*:\s*/i, ""), video: v.id })),
  ];
  $("#galerie").innerHTML = elements
    .map((el, i) => `<button class="galerie-item" data-i="${i}" aria-label="${esc(el.legende || "Photo")}"><img src="${esc(el.src)}" alt="" loading="lazy"></button>`)
    .join("");
  if (!elements.length) $("#galerie").previousElementSibling.hidden = true;
  const visio = $("#visionneuse");
  $("#galerie").addEventListener("click", (e) => {
    const b = e.target.closest(".galerie-item");
    if (!b) return;
    const el = elements[b.dataset.i];
    const img = $("#visionneuse-img");
    img.onerror = () => { img.onerror = null; img.src = el.src; }; // la grande image n'existe pas toujours
    img.src = el.grande || el.src;
    $("#visionneuse-legende").textContent = el.legende || "";
    const lien = $("#visionneuse-video");
    lien.hidden = !el.video;
    lien.onclick = () => { visio.close(); A.ouvrirVideo(VIDEOS.find((v) => v.id === el.video)); };
    visio.showModal();
  });
  $("#fermer-visionneuse").addEventListener("click", () => visio.close());
  visio.addEventListener("click", (e) => e.target === visio && visio.close());

  // ---------- Verset du jour (change chaque jour à minuit, heure de Kinshasa) ----------
  const VERSETS = window.EGRADI_VERSETS || [];
  if (VERSETS.length) {
    const jourKinshasa = Math.floor((Date.now() + 3600000) / 86400000);
    const v = VERSETS[jourKinshasa % VERSETS.length];
    const [ref, texte] = window.EGRADI_LANGUE === "en" ? v.en : v.fr;
    $("#verset-texte").textContent = `« ${texte} »`;
    $("#verset-ref").textContent = ref;
    $("#verset-partager").addEventListener("click", async () => {
      const message = `📖 ${texte}\n— ${ref}\n\n${tr("verset_titre").replace("📖 ", "")} · EGRADI TV\n${location.href.split("#")[0]}`;
      if (navigator.share) {
        try { await navigator.share({ text: message }); } catch {}
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      }
    });
  } else {
    $("#verset-jour").hidden = true;
  }

  // ---------- Télécharger l'application ----------
  // Caché quand on est déjà DANS l'application installée (APK ou écran d'accueil).
  const dejaInstallee =
    matchMedia("(display-mode: standalone)").matches || navigator.standalone === true || document.referrer.startsWith("android-app://");
  const iphone = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (C.apk && !dejaInstallee) {
    $("#bloc-appli").hidden = false;
    $("#installer-iphone").hidden = false; // visible partout : sur un autre appareil, le guide montre un QR code
    if (iphone) {
      $("#telecharger-apk").hidden = true;
      $("#appli-detail").textContent = tr("appli_iphone");

    } else {
      $("#appli-detail").textContent = tr("appli_detail") + `v${C.apk.version} · ${C.apk.taille}`;
      for (const a of [$("#telecharger-apk"), $("#eglise-apk a")]) {
        a.href = C.apk.fichier;
        a.setAttribute("download", `EGRADI-TV-${C.apk.version}.apk`);
      }
      $("#eglise-apk").hidden = false;
    }
    if (iphone) {
      $("#eglise-apk").hidden = false;
      $("#eglise-apk a").hidden = true;
    }
  }

  // ---------- Guide d'installation iPhone ----------
  // Sur iPhone, l'installation se fait avec Safari : on prévient si la page est ouverte dans un autre
  // navigateur (Chrome, Firefox) ou dans WhatsApp / Facebook / Instagram.
  const autreNavigateur = /CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Instagram|WhatsApp|Line\//i.test(navigator.userAgent);
  const guide = $("#guide-iphone");
  function ouvrirGuideIphone() {
    $("#guide-iphone-safari").hidden = !(iphone && autreNavigateur);
    $("#guide-iphone-qr").hidden = iphone;
    guide.showModal();
  }
  $("#installer-iphone").addEventListener("click", ouvrirGuideIphone);
  $("#eglise-iphone").addEventListener("click", ouvrirGuideIphone);
  $("#fermer-guide-iphone").addEventListener("click", () => guide.close());
  guide.addEventListener("click", (e) => e.target === guide && guide.close());
  $("#copier-lien-iphone").addEventListener("click", async () => {
    const lien = location.origin + location.pathname;
    try { await navigator.clipboard.writeText(lien); toast(tr("lien_copie")); } catch { toast(lien); }
  });
  // ---------- Guide d'installation Android (APK) ----------
  const android = /Android/i.test(navigator.userAgent);
  const telephone = iphone || android;
  const guideAndroid = $("#guide-android");
  function ouvrirGuideAndroid() {
    if (!C.apk) return;
    const a = $("#guide-android-apk");
    a.href = C.apk.fichier;
    a.setAttribute("download", `EGRADI-TV-${C.apk.version}.apk`);
    $("#guide-android-detail").textContent = tr("appli_detail") + `v${C.apk.version} · ${C.apk.taille}`;
    guideAndroid.showModal();
  }
  $("#fermer-guide-android").addEventListener("click", () => guideAndroid.close());
  guideAndroid.addEventListener("click", (e) => e.target === guideAndroid && guideAndroid.close());
  // Sur un téléphone Android, le bouton « Télécharger » ouvre d'abord le guide (le téléchargement est dedans)
  if (android) {
    for (const a of [$("#telecharger-apk"), $("#eglise-apk a")]) {
      a.addEventListener("click", (e) => { e.preventDefault(); ouvrirGuideAndroid(); });
    }
  }

  // ---------- Sur ordinateur : QR code pour installer sur le téléphone ----------
  const guideOrdi = $("#guide-ordinateur");
  $("#fermer-guide-ordinateur").addEventListener("click", () => guideOrdi.close());
  guideOrdi.addEventListener("click", (e) => e.target === guideOrdi && guideOrdi.close());

  // « ?installer » dans l'adresse (QR code, message WhatsApp…) : la bonne installation selon le téléphone
  if (!dejaInstallee && new URLSearchParams(location.search).has("installer")) {
    if (iphone) ouvrirGuideIphone();
    else if (android) ouvrirGuideAndroid();
    else guideOrdi.showModal();
  }

  // ---------- Prière & témoignage : le message part par WhatsApp ou e-mail, rien n'est stocké ----------
  const form = $("#form-priere");
  const TYPES = { priere: "🙏 DEMANDE DE PRIÈRE", temoignage: "✨ TÉMOIGNAGE", grace: "🙌 ACTION DE GRÂCE" };

  // Les tuiles de l'accueil peuvent présélectionner le type (ex. « Témoignage »)
  document.querySelectorAll('.tuile[href="#priere"]').forEach((a) =>
    a.addEventListener("click", () => (form.type.value = a.dataset.type || "priere"))
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const canal = e.submitter?.dataset.canal || "whatsapp";
    const d = Object.fromEntries(new FormData(form));
    if (!d.nom.trim() || !d.message.trim()) {
      toast(tr("champs_requis"));
      (d.nom.trim() ? form.message : form.nom).focus();
      return;
    }
    const lignes = [
      `${TYPES[d.type]} — application EGRADI TV`,
      "",
      `Nom : ${d.nom.trim()}`,
      d.ville.trim() ? `Ville / pays : ${d.ville.trim()}` : null,
      d.tel.trim() ? `Téléphone : ${d.tel.trim()}` : null,
      "",
      d.message.trim(),
    ].filter((l) => l !== null); // les lignes vides "" servent de séparateurs
    const texte = lignes.join("\n");
    if (canal === "email" && C.email) {
      location.href = `mailto:${C.email}?subject=${encodeURIComponent(TYPES[d.type] + " — " + d.nom.trim())}&body=${encodeURIComponent(texte)}`;
    } else {
      window.open(`https://wa.me/${chiffresTel}?text=${encodeURIComponent(texte)}`, "_blank", "noopener");
    }
  });
  if (!C.email) form.querySelector('[data-canal="email"]').hidden = true;

  // ---------- Offrandes : Mobile Money, banque, PayPal ----------
  const S = C.soutien || {};
  $("#soutien-texte").textContent = S.texte || "";
  $("#soutien-verset").textContent = S.verset || "";
  $("#soutien-verset").hidden = !S.verset;
  const mm = S.mobileMoney || [];
  // Une ligne « libellé : valeur [Copier] »
  const ligne = (libelle, valeur) =>
    `<div class="ligne-copie"><span class="lc-libelle">${esc(libelle)}</span><span class="lc-valeur">${esc(valeur)}</span>` +
    `<button class="bouton petit" data-copier="${esc(valeur)}">${tr("copier")}</button></div>`;

  // Les moyens d'envoi : chacun a un logo (offrandes/logo-<id>.svg) et un QR code (offrandes/qr-<id>.svg)
  // qui ouvre l'application directement sur ce moyen (…/?offrande=<id>#soutien).
  const OPTIONS = [
    ...mm.map((m) => ({
      id: m.id, nom: m.operateur,
      contenu: ligne(tr("off_numero"), m.numero) + (m.titulaire ? `<p class="lc-note">${esc(m.titulaire)}</p>` : ""),
      etapes: tr("off_etapes_mm"),
    })),
    ...(S.banque ? [{
      id: "banque", nom: S.banque.nom,
      contenu: ligne(tr("banque_compte"), S.banque.compte) +
        (S.banque.swift ? ligne("SWIFT / BIC", S.banque.swift) : "") +
        (S.banque.devise ? `<p class="lc-note">${tr("banque_devise")} : <strong>${esc(S.banque.devise)}</strong></p>` : ""),
      etapes: tr("off_etapes_banque"),
    }] : []),
    ...(S.paypal ? [{ id: "paypal", nom: "PayPal", contenu: ligne(tr("paypal_compte"), S.paypal), etapes: tr("paypal_note") }] : []),
  ].filter((o) => o.id);

  const logo = (id) => (S.logos && S.logos[id]) || `offrandes/logo-${id}.svg`;
  $("#choix-offrande").innerHTML = OPTIONS.map(
    (o) => `<button role="tab" data-offrande="${esc(o.id)}" aria-selected="false">
      <span class="logo-boite"><img src="${esc(logo(o.id))}" alt=""></span><span>${esc(o.nom)}</span></button>`
  ).join("");

  function choisirOffrande(id) {
    const o = OPTIONS.find((x) => x.id === id) || OPTIONS[0];
    if (!o) return;
    $("#choix-offrande").querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.offrande === o.id));
    $("#detail-offrande").innerHTML = `
      <div class="do-entete"><span class="logo-boite grand"><img src="${esc(logo(o.id))}" alt=""></span><h3>${esc(o.nom)}</h3></div>
      <div class="do-corps">
        <div class="do-infos">${o.contenu}<p class="lc-note">${esc(o.etapes)}</p></div>
        <figure class="do-qr">
          <img src="offrandes/qr-${esc(o.id)}.svg" alt="QR code ${esc(o.nom)}" width="160" height="160">
          <figcaption>${tr("off_qr")}</figcaption>
        </figure>
      </div>`;
  }
  $("#choix-offrande").addEventListener("click", (e) => {
    const b = e.target.closest("[data-offrande]");
    if (b) choisirOffrande(b.dataset.offrande);
  });
  // Bouton « Copier » du détail
  $("#detail-offrande").addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copier]");
    if (!btn) return;
    try {
      const v = btn.dataset.copier;
      await navigator.clipboard.writeText(/^\+?[\d\s]+$/.test(v) ? v.replace(/\s/g, "") : v); // numéros : sans espaces
      toast(tr("copie_ok"));
    } catch {
      toast(btn.dataset.copier);
    }
  });
  // Arrivée par un QR code (…/?offrande=mpesa#soutien) ou par un logo de l'accueil
  choisirOffrande(new URLSearchParams(location.search).get("offrande"));
  document.querySelectorAll(".bandeau-offrande img").forEach((img, i) =>
    img.addEventListener("click", () => OPTIONS[i] && choisirOffrande(OPTIONS[i].id))
  );

  // Sans numéros publiés : on propose de les demander sur WhatsApp
  $("#soutien-whatsapp").href = `https://wa.me/${chiffresTel}?text=${encodeURIComponent(
    "Bonjour EGRADI TV, je souhaite soutenir l'œuvre de Dieu. Pouvez-vous m'envoyer les numéros Mobile Money de l'église ?"
  )}`;
  $("#soutien-whatsapp").parentElement.hidden = mm.length > 0;

  // ---------- Événements à venir : affiche, compte à rebours, agenda ----------
  const aujourdhui = () => new Date(Date.now() + 3600000).toISOString().slice(0, 10); // date de Kinshasa
  const pad2 = (n) => String(n).padStart(2, "0");
  function joursAvant(date) {
    return Math.round((new Date(date + "T12:00:00Z") - new Date(aujourdhui() + "T12:00:00Z")) / 86400000);
  }
  function quandEvenement(date) {
    const j = joursAvant(date);
    return j === 0 ? tr("ev_aujourdhui") : j === 1 ? tr("ev_demain") : `${tr("ev_dans")} ${j} ${tr("ev_jours")}`;
  }
  function agendaEvenement(ev) {
    const h = A.lireHeure(ev.heure);
    const date = ev.date.replace(/-/g, "");
    const lignes = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//EGRADI TV//Evenement//FR", "BEGIN:VEVENT",
      `UID:egradi-ev-${date}-${ev.titre.length}@egradi.tv`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`];
    if (h) {
      const fin = new Date(Date.UTC(2000, 0, 1, h.h, h.m) + A.dureeCulte(ev.heure));
      lignes.push(`DTSTART;TZID=Africa/Kinshasa:${date}T${pad2(h.h)}${pad2(h.m)}00`,
        `DTEND;TZID=Africa/Kinshasa:${date}T${pad2(fin.getUTCHours())}${pad2(fin.getUTCMinutes())}00`);
    } else {
      lignes.push(`DTSTART;VALUE=DATE:${date}`);
    }
    lignes.push(`SUMMARY:${ev.titre} — EGRADI TV`, `LOCATION:${(ev.lieu || "").replace(/,/g, "\\,")}`,
      "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", `DESCRIPTION:${ev.titre}`, "END:VALARM", "END:VEVENT", "END:VCALENDAR");
    const url = URL.createObjectURL(new Blob([lignes.join("\r\n")], { type: "text/calendar" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `EGRADI-TV-${ev.date}.ics` });
    document.body.append(a); a.click(); a.remove();
  }
  // Affiche d'un événement : lien d'image (PNG, JPG), chemin dans le site (photos/…), ou lien de partage Google Drive
  // (« https://drive.google.com/file/d/ID/view?usp=sharing » → image directe ; le fichier doit être partagé « Tous les utilisateurs disposant du lien »).
  function lienAffiche(url) {
    const u = (url || "").trim();
    const id = (u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{20,})/) || [])[1];
    return id ? `https://lh3.googleusercontent.com/d/${id}=w1200` : u;
  }
  let evenements = [];
  function afficherEvenements() {
    evenements = (C.evenements || []).filter((ev) => ev.date >= aujourdhui()).sort((a, b) => a.date.localeCompare(b.date))
      .map((ev) => ({ ...ev, affiche: lienAffiche(ev.affiche) }));
    $("#liste-evenements").innerHTML = evenements.length
      ? evenements
          .map((ev, i) => {
            const d = new Date(ev.date + "T12:00:00");
            const jour = d.toLocaleDateString(window.EGRADI_LOCALE, { day: "numeric" });
            const mois = d.toLocaleDateString(window.EGRADI_LOCALE, { month: "short" });
            return `<article class="evenement">
              ${ev.affiche ? `<img src="${esc(ev.affiche)}" alt="${esc(ev.titre)}" loading="lazy" data-affiche="${esc(ev.affiche)}">` : ""}
              <div class="ev-date"><strong>${jour}</strong><span>${mois}</span></div>
              <div><span class="ev-quand">${quandEvenement(ev.date)}</span><h3>${esc(ev.titre)}</h3>
                <p class="heure">${esc(d.toLocaleDateString(window.EGRADI_LOCALE, { weekday: "long" }))}${ev.heure ? " · " + esc(ev.heure) : ""}${ev.lieu ? " · " + esc(ev.lieu) : ""}</p>
                ${ev.description ? `<p>${esc(ev.description)}</p>` : ""}
                <button class="bouton petit" type="button" data-agenda="${i}">${tr("ev_agenda")}</button>
              </div>
            </article>`;
          })
          .join("")
      : `<p class="vide bloc">${tr("aucun_evenement")}</p>`;
    // Accueil : le prochain événement
    const p = evenements[0];
    $("#prochain-evenement").hidden = !p;
    if (p) {
      $("#prochain-evenement").innerHTML = `<span class="sur-titre">${tr("ev_prochain")}</span>
        <strong>${esc(p.titre)}</strong><span>${esc(new Date(p.date + "T12:00:00").toLocaleDateString(window.EGRADI_LOCALE, { weekday: "long", day: "numeric", month: "long" }))}${p.heure ? " · " + esc(p.heure) : ""} — <b>${quandEvenement(p.date)}</b></span>`;
    }
  }
  $("#liste-evenements").addEventListener("click", (e) => {
    const b = e.target.closest("[data-agenda]");
    if (b) return agendaEvenement(evenements[+b.dataset.agenda]);
    const img = e.target.closest("[data-affiche]");
    if (img) {
      const d = document.createElement("dialog");
      d.className = "visionneuse";
      d.innerHTML = `<img src="${esc(img.dataset.affiche)}" alt=""><button type="button" class="visionneuse-fermer" aria-label="Fermer">✕</button>`;
      d.addEventListener("click", () => d.close());
      d.addEventListener("close", () => d.remove());
      document.body.append(d);
      d.showModal();
    }
  });
  afficherEvenements();

  // ---------- La Bible en 260 jours (Nouveau Testament, un chapitre par jour) ----------
  const NT = window.EGRADI_NT || [];
  const CHAPITRES = NT.flatMap(([fr, en, n]) => Array.from({ length: n }, (_, k) => ({ fr, en, c: k + 1 })));
  const CLE_LECTURE = "egradi-lecture";
  const lecture = (() => { try { return Object.assign({ lus: 0, jours: [] }, JSON.parse(localStorage.getItem(CLE_LECTURE) || "{}")); } catch { return { lus: 0, jours: [] }; } })();
  function serie() {
    // jours d'affilée (jusqu'à aujourd'hui ou hier) où au moins un chapitre a été lu
    const jours = new Set(lecture.jours);
    let n = 0, d = new Date(aujourdhui() + "T12:00:00Z");
    if (!jours.has(aujourdhui())) d = new Date(d - 86400000);
    while (jours.has(d.toISOString().slice(0, 10))) { n++; d = new Date(d - 86400000); }
    return n;
  }
  function afficherLecture() {
    if (!CHAPITRES.length) return ($("#bloc-lecture").hidden = true);
    const fini = lecture.lus >= CHAPITRES.length;
    const ch = CHAPITRES[Math.min(lecture.lus, CHAPITRES.length - 1)];
    const en = window.EGRADI_LANGUE === "en";
    $("#lecture-chapitre").textContent = fini ? tr("lecture_fin") : `${tr("lecture_jour")} ${lecture.lus + 1} : ${en ? ch.en : ch.fr} ${ch.c}`;
    $("#lecture-lire").href = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ch.en + " " + ch.c)}&version=${en ? "KJV" : "LSG"}`;
    $("#lecture-lire").hidden = fini;
    $("#lecture-progres").style.width = `${Math.round((lecture.lus / CHAPITRES.length) * 100)}%`;
    $("#lecture-compte").textContent = `${lecture.lus} / ${CHAPITRES.length} ${tr("lecture_progres")}`;
    const s = serie();
    $("#lecture-serie").textContent = s ? `🔥 ${s} ${s > 1 ? tr("lecture_serie") : tr("lecture_serie1")}` : "";
    $("#lecture-lu").textContent = fini ? tr("lecture_recommencer") : tr("lecture_lu");
  }
  $("#lecture-lu").addEventListener("click", () => {
    if (lecture.lus >= CHAPITRES.length) { lecture.lus = 0; lecture.jours = []; }
    else {
      lecture.lus++;
      if (!lecture.jours.includes(aujourdhui())) lecture.jours = [...lecture.jours, aujourdhui()].slice(-400);
      toast(tr("lecture_bravo"));
    }
    try { localStorage.setItem(CLE_LECTURE, JSON.stringify(lecture)); } catch {}
    afficherLecture();
  });
  afficherLecture();

  // ---------- Mise à jour par l'équipe avec Google Sheets (facultatif) ----------
  // Dans config.js, « feuilles » peut contenir les liens CSV publiés d'un tableau Google Sheets :
  //   annonces   : une annonce par ligne (colonne A)                → bandeau INFOS
  //   evenements : colonnes date (AAAA-MM-JJ), heure, titre, lieu, description, affiche → page Programme
  function lireCSV(texte) {
    const lignes = []; let ligne = [], champ = "", guillemets = false;
    for (let i = 0; i < texte.length; i++) {
      const c = texte[i];
      if (guillemets) {
        if (c === '"' && texte[i + 1] === '"') { champ += '"'; i++; }
        else if (c === '"') guillemets = false;
        else champ += c;
      } else if (c === '"') guillemets = true;
      else if (c === ",") { ligne.push(champ); champ = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && texte[i + 1] === "\n") i++; ligne.push(champ); lignes.push(ligne); ligne = []; champ = ""; }
      else champ += c;
    }
    if (champ || ligne.length) { ligne.push(champ); lignes.push(ligne); }
    return lignes.filter((l) => l.some((x) => x.trim()));
  }
  const F = C.feuilles || {};
  if (F.annonces) {
    fetch(F.annonces, { cache: "no-store" }).then((r) => r.ok ? r.text() : Promise.reject()).then((t) => {
      const annonces = lireCSV(t).map((l) => l[0].trim()).filter((a) => a && !/^annonce/i.test(a));
      if (!annonces.length) return;
      const html = annonces.map((a) => `<span>${esc(a)}</span>`).join("");
      $("#bandeau-texte").innerHTML = html + html;
      $(".bandeau").hidden = false;
    }).catch(() => {});
  }
  if (F.evenements) {
    fetch(F.evenements, { cache: "no-store" }).then((r) => r.ok ? r.text() : Promise.reject()).then((t) => {
      const [entete, ...lignes] = lireCSV(t);
      const col = (nom) => entete.findIndex((x) => x.trim().toLowerCase() === nom);
      const ev = lignes.map((l) => ({
        date: (l[col("date")] || "").trim(), heure: (l[col("heure")] || "").trim(), titre: (l[col("titre")] || "").trim(),
        lieu: (l[col("lieu")] || "").trim(), description: (l[col("description")] || "").trim(), affiche: (l[col("affiche")] || "").trim(),
      })).filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date) && e.titre);
      if (ev.length) { C.evenements = ev; afficherEvenements(); }
    }).catch(() => {});
  }

  // ---------- Rappels : fichier agenda (.ics) avec les cultes de la semaine, rappel 30 min avant ----------
  const BYDAY = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  const avecHeure = C.programmes.map((p) => ({ p, h: A.lireHeure(p.heure) })).filter((x) => x.h);
  const bouton = $("#ajouter-agenda");
  bouton.hidden = avecHeure.length === 0; // visible dès qu'au moins une heure est renseignée dans config.js
  bouton.addEventListener("click", () => {
    const pad = (n) => String(n).padStart(2, "0");
    const maintenant = new Date();
    const stamp = maintenant.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
    const lignes = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//EGRADI TV//Programme//FR", "CALSCALE:GREGORIAN"];
    avecHeure.forEach(({ p, h }, i) => {
      const jour = A.JOURS.indexOf(p.jour);
      const d = new Date(maintenant);
      d.setDate(d.getDate() + ((jour - d.getDay() + 7) % 7));
      const date = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
      const fin = new Date(d); fin.setHours(h.h, h.m); fin.setTime(fin.getTime() + A.dureeCulte(p.heure));
      lignes.push(
        "BEGIN:VEVENT",
        `UID:egradi-${i}-${BYDAY[jour]}@egradi.tv`,
        `DTSTAMP:${stamp}`,
        `DTSTART;TZID=Africa/Kinshasa:${date}T${pad(h.h)}${pad(h.m)}00`,
        `DTEND;TZID=Africa/Kinshasa:${date}T${pad(fin.getHours())}${pad(fin.getMinutes())}00`,
        `RRULE:FREQ=WEEKLY;BYDAY=${BYDAY[jour]}`,
        `SUMMARY:${p.titre} — EGRADI TV`,
        `LOCATION:${(p.lieu || (C.adresse || []).join(", ")).replace(/,/g, "\\,")}`,
        `URL:${location.href.split("#")[0]}#direct`,
        "BEGIN:VALARM", "TRIGGER:-PT30M", "ACTION:DISPLAY", `DESCRIPTION:${p.titre} commence dans 30 minutes sur EGRADI TV`, "END:VALARM",
        "END:VEVENT"
      );
    });
    lignes.push("END:VCALENDAR");
    const url = URL.createObjectURL(new Blob([lignes.join("\r\n")], { type: "text/calendar" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "EGRADI-TV-cultes.ics" });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    toast(tr("agenda_ok"));
  });
})();

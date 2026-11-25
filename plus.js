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

  // ---------- Soutenir l'œuvre : numéros Mobile Money ----------
  const S = C.soutien || {};
  $("#soutien-texte").textContent = S.texte || "";
  $("#soutien-verset").textContent = S.verset || "";
  $("#soutien-verset").hidden = !S.verset;
  const mm = S.mobileMoney || [];
  $("#liste-mobile-money").innerHTML = mm
    .map(
      (m) => `<div class="carte-mm">
        <p class="sur-titre">${esc(m.operateur)}</p>
        <p class="mm-numero">${esc(m.numero)}</p>
        ${m.titulaire ? `<p class="mm-titulaire">${esc(m.titulaire)}</p>` : ""}
        <button class="bouton" data-copier="${esc(m.numero)}">${tr("copier")}</button>
      </div>`
    )
    .join("");
  $("#liste-mobile-money").addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copier]");
    if (!b) return;
    try {
      await navigator.clipboard.writeText(b.dataset.copier.replace(/\s/g, ""));
      toast(tr("copie"));
    } catch {
      toast(b.dataset.copier);
    }
  });
  $("#titre-mm").hidden = mm.length === 0;

  // Une ligne « libellé : valeur [Copier] »
  const ligne = (libelle, valeur) =>
    `<div class="ligne-copie"><span class="lc-libelle">${esc(libelle)}</span><span class="lc-valeur">${esc(valeur)}</span>` +
    `<button class="bouton petit" data-copier="${esc(valeur)}">${tr("copier")}</button></div>`;

  // Virement bancaire
  if (S.banque) {
    const b = S.banque;
    $("#carte-banque").innerHTML =
      `<p class="sur-titre">${esc(b.nom)}</p>` +
      ligne(tr("banque_compte"), b.compte) +
      (b.swift ? ligne("SWIFT / BIC", b.swift) : "") +
      (b.devise ? `<p class="lc-note">${tr("banque_devise")} : <strong>${esc(b.devise)}</strong></p>` : "");
    $("#bloc-banque").hidden = false;
  }
  // PayPal
  if (S.paypal) {
    $("#carte-paypal").innerHTML = ligne(tr("paypal_compte"), S.paypal) + `<p class="lc-note">${tr("paypal_note")}</p>`;
    $("#bloc-paypal").hidden = false;
  }
  // Les boutons « Copier » des cartes banque et PayPal
  for (const id of ["#carte-banque", "#carte-paypal"]) {
    $(id).addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-copier]");
      if (!btn) return;
      try {
        await navigator.clipboard.writeText(btn.dataset.copier);
        toast(tr("copie_ok"));
      } catch {
        toast(btn.dataset.copier);
      }
    });
  }

  // Sans numéros publiés : on propose de les demander sur WhatsApp
  $("#soutien-whatsapp").href = `https://wa.me/${chiffresTel}?text=${encodeURIComponent(
    "Bonjour EGRADI TV, je souhaite soutenir l'œuvre de Dieu. Pouvez-vous m'envoyer les numéros Mobile Money de l'église ?"
  )}`;
  $("#soutien-whatsapp").parentElement.hidden = mm.length > 0;

  // ---------- Événements à venir ----------
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const evenements = (C.evenements || []).filter((ev) => ev.date >= aujourdhui).sort((a, b) => a.date.localeCompare(b.date));
  $("#liste-evenements").innerHTML = evenements.length
    ? evenements
        .map((ev) => {
          const d = new Date(ev.date + "T12:00:00");
          const jour = d.toLocaleDateString(window.EGRADI_LOCALE, { day: "numeric" });
          const mois = d.toLocaleDateString(window.EGRADI_LOCALE, { month: "short" });
          return `<article class="evenement">
            ${ev.affiche ? `<img src="${esc(ev.affiche)}" alt="" loading="lazy">` : ""}
            <div class="ev-date"><strong>${jour}</strong><span>${mois}</span></div>
            <div><h3>${esc(ev.titre)}</h3>
              <p class="heure">${esc(d.toLocaleDateString(window.EGRADI_LOCALE, { weekday: "long" }))}${ev.heure ? " · " + esc(ev.heure) : ""}${ev.lieu ? " · " + esc(ev.lieu) : ""}</p>
              ${ev.description ? `<p>${esc(ev.description)}</p>` : ""}
            </div>
          </article>`;
        })
        .join("")
    : `<p class="vide bloc">${tr("aucun_evenement")}</p>`;

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
      const fin = new Date(d); fin.setHours(h.h + 2, h.m);
      lignes.push(
        "BEGIN:VEVENT",
        `UID:egradi-${i}-${BYDAY[jour]}@egradi.tv`,
        `DTSTAMP:${stamp}`,
        `DTSTART;TZID=Africa/Kinshasa:${date}T${pad(h.h)}${pad(h.m)}00`,
        `DTEND;TZID=Africa/Kinshasa:${date}T${pad(fin.getHours())}${pad(fin.getMinutes())}00`,
        `RRULE:FREQ=WEEKLY;BYDAY=${BYDAY[jour]}`,
        `SUMMARY:${p.titre} — EGRADI TV`,
        `LOCATION:${(C.adresse || []).join(", ").replace(/,/g, "\\,")}`,
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

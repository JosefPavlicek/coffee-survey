const firebaseURL = 'https://coffee-survey-534ef-default-rtdb.europe-west1.firebasedatabase.app/';
let currentLang = document.documentElement.lang || "en";

const options = {
  q10: { type: "checkbox", en: ["Physical and mental effects", "Taste and enjoyment", "Social aspect", "Culture and tradition", "Health benefits", "Practical reasons"], cz: ["Fyzické a psychické účinky", "Chuť a požitek", "Sociální aspekt", "Kultura a tradice", "Zdravotní benefity", "Praktické důvody"] },
  q11: { type: "checkbox", en: ["At home", "Café/restaurant", "Visiting friends", "At work/school", "To go"], cz: ["Doma", "Kavárna/restaurace", "Na návštěvě", "V práci/škole", "Káva s sebou"] },
  q12: { type: "radio", en: ["Once a day", "More than once a day", "Few times a week", "Few times a month", "Rarely", "Never"], cz: ["Jednou za den", "Více než jednou za den", "Několikrát do týdne", "Několikrát do měsíce", "Výjimečně", "Nikdy"] },
  q13: { type: "radio", en: ["Once a day", "More than once a day", "Few times a week", "Few times a month", "Rarely", "Never"], cz: ["Jednou za den", "Více než jednou za den", "Několikrát do týdne", "Několikrát do měsíce", "Výjimečně", "Nikdy"] },
  q14: { type: "radio", en: ["Arabica", "Robusta", "I don't know / Doesn't matter"], cz: ["Arabica", "Robusta", "Nevím / Je mi to jedno"] },
  q15: { type: "radio", en: ["With caffeine", "Without caffeine", "Both, depending on situation"], cz: ["S kofeinem", "Bez kofeinu", "Kombinuji dle potřeby"] },
  q16: { type: "radio", en: ["Ground – Turkish", "Ground – from espresso machine", "Filtered", "Instant", "French press", "Coffee capsules"], cz: ["Zrnková – turecká", "Zrnková – z kávovaru", "Filtrovaná", "Instantní", "French press", "Kávové kapsle"] },
  q17: { type: "checkbox", en: ["Ristretto", "Espresso", "Double Espresso", "Lungo/Americano", "Espresso macchiato", "Cappuccino", "Flat white", "Caffe Latte", "Turkish coffee", "Filtered coffee", "Instant coffee"], cz: ["Ristretto", "Espresso", "Double Espresso", "Lungo/Americano", "Espresso macchiato", "Cappuccino", "Flat white", "Caffe Latte", "Turecká káva", "Filtrovaná káva", "Instantní káva"], max: 3 },
  q18: { type: "checkbox", en: ["Milk", "Cream", "Plant milk", "Sugar", "Honey", "Water", "Chocolate", "Dessert", "Nothing"], cz: ["Mléko", "Smetana", "Rostlinné mléko", "Cukr", "Med", "Voda", "Čokoláda", "Dezert", "Nic"], max: 3, allowOther: true },
  q19: { type: "radio", en: ["In person", "Online"], cz: ["Osobní nákup", "Online nákup"], allowOther: true },
  q20: { type: "radio", en: ["Supermarket/hypermarket", "Local roastery / specialty store"], cz: ["Super/hypermarket", "Lokální pražírna / specializovaná prodejna"], allowOther: true },
  q21: { type: "checkbox", en: ["Organic/Bio", "Fair trade", "Rainforest Alliance", "Carbon neutral", "Zero waste", "Artificial Intelligence (AI)"], cz: ["Organická/Bio", "Fair trade", "Certifikace Rainforest Alliance", "Uhlíkově neutrální", "Zero waste", "Umělá inteligence (AI)"] },
  q22: { type: "radio", en: ["Definitely yes", "Rather yes", "Rather no", "Definitely no", "I don't know"], cz: ["Určitě ano", "Spíše ano", "Spíše ne", "Určitě ne", "Nevím"] },
  q22a: { type: "radio", en: ["< 5%", "5% (+ 2 CZK)", "10% (+ 4.50 CZK)", "15% (+ 7 CZK)", "20% (+ 9 CZK)", "25% (+ 11 CZK)", "30% (+ 13.50 CZK)", "35% (+ 16 CZK)", "40% (+ 18 CZK)", "> 40%"], cz: ["< 5 %", "5 % (+ 2 Kč)", "10 % (+ 4,50 Kč)", "15 % (+ 7 Kč)", "20 % (+ 9 Kč)", "25 % (+ 11 Kč)", "30 % (+ 13,50 Kč)", "35 % (+ 16 Kč)", "40 % (+ 18 Kč)", "> 40 %"] },
  q23: { type: "radio", en: ["Definitely yes", "Rather yes", "Rather no", "Definitely no", "I don't know"], cz: ["Určitě ano", "Spíše ano", "Spíše ne", "Určitě ne", "Nevím"] },
  q23a: { type: "radio", en: ["< 5%", "5% (+ 2 CZK)", "10% (+ 4.50 CZK)", "15% (+ 7 CZK)", "20% (+ 9 CZK)", "25% (+ 11 CZK)", "30% (+ 13.50 CZK)", "35% (+ 16 CZK)", "40% (+ 18 CZK)", "> 40%"], cz: ["< 5 %", "5 % (+ 2 Kč)", "10 % (+ 4,50 Kč)", "15 % (+ 7 Kč)", "20 % (+ 9 Kč)", "25 % (+ 11 Kč)", "30 % (+ 13,50 Kč)", "35 % (+ 16 Kč)", "40 % (+ 18 Kč)", "> 40 %"] },
  q24: { type: "radio", en: ["Definitely yes", "Rather yes", "Rather no", "Definitely no", "I don't know"], cz: ["Určitě ano", "Spíše ano", "Spíše ne", "Určitě ne", "Nevím"] },
  q24a: { type: "radio", en: ["< 5%", "5% (+ 2 CZK)", "10% (+ 4.50 CZK)", "15% (+ 7 CZK)", "20% (+ 9 CZK)", "25% (+ 11 CZK)", "30% (+ 13.50 CZK)", "35% (+ 16 CZK)", "40% (+ 18 CZK)", "> 40%"], cz: ["< 5 %", "5 % (+ 2 Kč)", "10 % (+ 4,50 Kč)", "15 % (+ 7 Kč)", "20 % (+ 9 Kč)", "25 % (+ 11 Kč)", "30 % (+ 13,50 Kč)", "35 % (+ 16 Kč)", "40 % (+ 18 Kč)", "> 40 %"] },
  q25: { type: "radio", en: ["Definitely yes", "Rather yes", "Rather no", "Definitely no", "I don't know"], cz: ["Určitě ano", "Spíše ano", "Spíše ne", "Určitě ne", "Nevím"] },
  q25a: { type: "radio", en: ["< 5%", "5% (+ 2 CZK)", "10% (+ 4.50 CZK)", "15% (+ 7 CZK)", "20% (+ 9 CZK)", "25% (+ 11 CZK)", "30% (+ 13.50 CZK)", "35% (+ 16 CZK)", "40% (+ 18 CZK)", "> 40%"], cz: ["< 5 %", "5 % (+ 2 Kč)", "10 % (+ 4,50 Kč)", "15 % (+ 7 Kč)", "20 % (+ 9 Kč)", "25 % (+ 11 Kč)", "30 % (+ 13,50 Kč)", "35 % (+ 16 Kč)", "40 % (+ 18 Kč)", "> 40 %"] },
  q26: { type: "radio", en: ["Definitely yes", "Rather yes", "Rather no", "Definitely no", "I don't know"], cz: ["Určitě ano", "Spíše ano", "Spíše ne", "Určitě ne", "Nevím"] },
  q26a: { type: "radio", en: ["< 5%", "5% (+ 2 CZK)", "10% (+ 4.50 CZK)", "15% (+ 7 CZK)", "20% (+ 9 CZK)", "25% (+ 11 CZK)", "30% (+ 13.50 CZK)", "35% (+ 16 CZK)", "40% (+ 18 CZK)", "> 40%"], cz: ["< 5 %", "5 % (+ 2 Kč)", "10 % (+ 4,50 Kč)", "15 % (+ 7 Kč)", "20 % (+ 9 Kč)", "25 % (+ 11 Kč)", "30 % (+ 13,50 Kč)", "35 % (+ 16 Kč)", "40 % (+ 18 Kč)", "> 40 %"] },
  q27: { type: "radio", en: ["Definitely yes", "Rather yes", "Rather no", "Definitely no", "I don't know"], cz: ["Určitě ano", "Spíše ano", "Spíše ne", "Určitě ne", "Nevím"] },
  q27a: { type: "radio", en: ["< 5%", "5% (+ 2 CZK)", "10% (+ 4.50 CZK)", "15% (+ 7 CZK)", "20% (+ 9 CZK)", "25% (+ 11 CZK)", "30% (+ 13.50 CZK)", "35% (+ 16 CZK)", "40% (+ 18 CZK)", "> 40%"], cz: ["< 5 %", "5 % (+ 2 Kč)", "10 % (+ 4,50 Kč)", "15 % (+ 7 Kč)", "20 % (+ 9 Kč)", "25 % (+ 11 Kč)", "30 % (+ 13,50 Kč)", "35 % (+ 16 Kč)", "40 % (+ 18 Kč)", "> 40 %"] },
  q28: {
    type: "radio",
    en: ["Less than 18", "19-24", "25-34", "35-44", "45-64", "65 and more"],
    cz: ["Méně než 18", "19-24", "25-34", "35-44", "45-64", "65 a víc"]
  },
  q30: {
    type: "radio",
    en: ["Male", "Female"],
    cz: ["Muž", "Žena"]
  },
  q31: {
    type: "radio",
    en: ["Single without children", "Single with children", "In a relationship without children", "In a relationship with children", "Married without children", "Married with children", "Widowed", "Registered partnership without children", "Registered partnership with children"],
    cz: ["Svobodný/a bezdětný", "Svobodný/a s dítětem", "Zadaný/a bezdětný", "Zadaný/a s dítětem", "V manželském svazku bezdětný", "V manželském svazku s dítětem", "Ovdovělý/a", "Registrovaný bez dítěte", "Registrovaný s dítětem"]
  },
  q32: {
    type: "radio",
    en: ["≤ 1000", "1001 - 10,000", "10,001 - 50,000", "50,001 - 100,000", "100,001 ≥"],
    cz: ["≤ 1000", "1001 - 10.000", "10.001 - 50.000", "50.001 - 100.000", "100.001 ≥"]
  },
  q34: {
    type: "radio",
    en: ["Primary education", "Secondary without diploma", "Secondary with diploma", "Higher vocational", "University degree"],
    cz: ["Základní vzdělání", "Středoškolské vzdělání bez maturity", "Středoškolské vzdělání s maturitou", "Vyšší odborné", "Vysokoškolské vzdělání"]
  },
  q35: {
    type: "checkbox",
    en: ["Student", "Employed", "Entrepreneur", "Unemployed", "Retired"],
    cz: ["Student", "Zaměstnaný", "Podnikatel", "Nezaměstnaný", "V důchodu"]
  },
  q36: {
    type: "radio",
    en: ["Less than 5,000 CZK", "5,001 – 21,000", "21,001 – 47,000", "More than 47,000"],
    cz: ["Méně než 5 000 Kč", "5 001 – 21 000", "21 001 – 47 000", "Více než 47 000"]
  }

};

// funkce
function submitSurvey(data) {
  // zachycení i nepovinných textových polí q29, q33 a q37
  const q29Val = document.getElementById("q29")?.value?.trim();
  if (q29Val) data.q29 = q29Val;
  const q33Val = document.getElementById("q33")?.value?.trim();
  if (q33Val) data.q33 = q33Val;
  const q37Val = document.getElementById("q37")?.value?.trim();
  if (q37Val) data.q37 = q37Val;

  fetch(`${firebaseURL}/responses.json`, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(() => {
      alert(currentLang === "cz" ? "Děkujeme! Vaše odpověď byla zaznamenána." : "Thank you! Your response has been recorded.");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Submission error:", error);
      alert(currentLang === "cz"
        ? "Došlo k chybě při odesílání. Zkuste to prosím znovu později."
        : "Oops! Something went wrong while submitting your response. Please try again later.");
    });
}


function renderRadioGroup(containerId, questionKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const opts = options[questionKey][currentLang];
  opts.forEach((opt, i) => {
    const id = `${questionKey}_${i}`;
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
      <input class="form-check-input" type="radio" name="${questionKey}" id="${id}" value="${opt}" required />
      <label class="form-check-label" for="${id}">${opt}</label>
    `;
    container.appendChild(div);
  });
  if (options[questionKey].allowOther) {
    container.innerHTML += `<input type="text" id="${questionKey}_other" class="form-control mt-2" placeholder="Other">`;
  }
}

function renderCheckboxGroup(containerId, questionKey) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const opts = options[questionKey][currentLang];
  const max = options[questionKey].max || opts.length;
  opts.forEach((opt, i) => {
    const id = `${questionKey}_${i}`;
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
      <input class="form-check-input" type="checkbox" name="${questionKey}" id="${id}" value="${opt}" />
      <label class="form-check-label" for="${id}">${opt}</label>
    `;
    container.appendChild(div);
  });
  if (options[questionKey].allowOther) {
    container.innerHTML += `<input type="text" id="${questionKey}_other" class="form-control mt-2" placeholder="Other">`;
  }

  container.addEventListener("change", () => {
    const checkboxes = container.querySelectorAll(`input[type="checkbox"]`);
    const checked = [...checkboxes].filter(cb => cb.checked);
    checkboxes.forEach(cb => {
      cb.disabled = checked.length >= max && !cb.checked;
    });
    updateProgressBar();
  });
}

function updateProgressBar() {
  let total = 0;
  let filled = 0;
  let missing = [];
  const yesValues = currentLang === "cz" ? ["Určitě ano", "Spíše ano"] : ["Definitely yes", "Rather yes"];

  for (const q in options) {
    const type = options[q].type;
    const isSub = q.match(/q\d+a/);
    if (isSub) continue;
    total++;

    const mainAnswer = document.querySelector(`input[name="${q}"]:checked`);
    if (mainAnswer) {
      filled++;
      if (["q22", "q23", "q24", "q25", "q26", "q27"].includes(q) && yesValues.includes(mainAnswer.value)) {
        const sub = `${q}a`;
        const subAnswer = document.querySelector(`input[name="${sub}"]:checked`);
        if (subAnswer) {
          filled++;
        } else {
          missing.push(sub.toUpperCase());
        }
      }
    } else {
      missing.push(q.toUpperCase());
    }
  }

  const optionalTextInputs = ["q29", "q33", "q37"];
  let optionalMissing = 0;
  optionalTextInputs.forEach(q => {
    const val = document.getElementById(q)?.value?.trim();
    if (!val) optionalMissing++;
  });

  const percent = Math.round((filled / (total + 6)) * 100);
  const bar = document.getElementById("progressBar");
  if (bar) {
    bar.style.width = percent + "%";
    bar.setAttribute("aria-valuenow", percent);
    bar.textContent = percent + "%";
  }

  const info = document.getElementById("progressInfo");
  if (info) {
    const missingLabel = currentLang === "cz" ? "Chybí" : "Missing";
    const answeredLabel = currentLang === "cz" ? "Zodpovězeno" : "Answered";
    const optionalLabel = currentLang === "cz" ? "nepovinných otázek chybí" : "optional questions missing";
    if (missing.length > 0) {
      info.innerHTML = `<span class="text-danger">🔴 ${missingLabel}: ${missing.join(", ")}</span><br><span class="text">ℹ️ ${optionalMissing} ${optionalLabel}</span> &nbsp; </span><span class="text-success">✅ ${answeredLabel}: ${filled}/${total + 6}`;
    } else {
      info.innerHTML = `<span class="text-success">✅ ${answeredLabel}: ${filled}/${total + 6}</span><br><span class="text">ℹ️ ${optionalMissing} ${optionalLabel}</span>`;
    }
  }
}


for (const q in options) {
  const type = options[q].type;
  if (type === "radio") renderRadioGroup(q, q);
  if (type === "checkbox") renderCheckboxGroup(q, q);
}

function registerProgressListeners() {
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", updateProgressBar);
  });
}

registerProgressListeners();
updateProgressBar();

document.addEventListener("change", () => {
  const yesValues = currentLang === "cz" ? ["Určitě ano", "Spíše ano"] : ["Definitely yes", "Rather yes"];
  [22, 23, 24, 25, 26, 27].forEach(i => {
    const q = `q${i}`;
    const sub = `q${i}a_block`;
    const val = document.querySelector(`input[name="${q}"]:checked`)?.value;
    document.getElementById(sub).style.display = yesValues.includes(val) ? "block" : "none";
  });
});

document.getElementById("submitBtn").onclick = () => {
  const data = {};
  let firstInvalid = null;
  const yesValues = currentLang === "cz" ? ["Určitě ano", "Spíše ano"] : ["Definitely yes", "Rather yes"];

  for (const q in options) {
    const type = options[q].type;
    const container = document.getElementById(q)?.closest(".p-3");
    container?.classList.remove("border", "border-danger");

    if (q.match(/q\d+a/)) continue; // podmíněné otázky validujeme níže

    if (type === "radio") {
      const val = document.querySelector(`input[name="${q}"]:checked`)?.value;
      if (!val) {
        container?.classList.add("border", "border-danger");
        if (!firstInvalid) firstInvalid = container;
        continue;
      }
      data[q] = val;

      const other = document.getElementById(`${q}_other`)?.value?.trim();
      if (other) data[`${q}_other`] = other;

      if (["q22", "q23", "q24", "q25", "q26", "q27"].includes(q) && yesValues.includes(val)) {
        const subQ = `${q}a`;
        const subVal = document.querySelector(`input[name="${subQ}"]:checked`)?.value;
        const subContainer = document.getElementById(subQ)?.closest(".p-3");
        subContainer?.classList.remove("border", "border-danger");
        if (!subVal) {
          subContainer?.classList.add("border", "border-danger");
          if (!firstInvalid) firstInvalid = subContainer;
          continue;
        }
        data[subQ] = subVal;
      }

    } else if (type === "checkbox") {
      const values = [...document.querySelectorAll(`input[name="${q}"]:checked`)].map(e => e.value);
      if (values.length === 0) {
        container?.classList.add("border", "border-danger");
        if (!firstInvalid) firstInvalid = container;
        continue;
      }
      data[q] = values;

      const other = document.getElementById(`${q}_other`)?.value?.trim();
      if (other) data[`${q}_other`] = other;
    }
  }

  if (firstInvalid) {
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  data.timestamp = new Date().toISOString();
  submitSurvey(data);
};

function switchLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  translate(lang);
  for (const q in options) {
    const type = options[q].type;
    if (type === "radio") renderRadioGroup(q, q);
    if (type === "checkbox") renderCheckboxGroup(q, q);
  }
  registerProgressListeners();
  updateProgressBar();
}

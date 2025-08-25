const frågor = [
  {
    q: "Vad heter Ross andra ex-fru?",
    options: ["Carol", "Emily", "Susan"],
    correct: "Emily",
  },
  {
    q: "Vilken maträtt älskar Joey mest?",
    options: ["Sushi", "Pizza", "Lasagne"],
    correct: "Pizza",
  },
  {
    q: "Vad heter kaffebaren där gänget hänger?",
    options: ["Central Perk", "Coffee House NY", "Manhattan Café"],
    correct: "Central Perk",
  },
  {
    q: "Vilken fåtölj älskar Joey och Chandler?",
    options: ["The Barker Lounge", "The Lazy Boy", "Rosita"],
    correct: "Rosita",
  },
];

let i = 0;
let poäng = 0;
let låst = false;

const quizDiv = document.getElementById("quiz");
const knapp = document.getElementById("next");
const resultat = document.getElementById("resultat");

function skapaAlternativ(text) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "option";
  el.textContent = text;
  el.addEventListener("click", () => hanteraVal(el, text));
  return el;
}

function render() {
  if (i >= frågor.length) {
    quizDiv.innerHTML = `<h2>Slut på quizet!</h2>
      <p>Du fick <strong>${poäng}</strong> av ${frågor.length} rätt.</p>`;
    knapp.style.display = "none";
    resultat.textContent = "";
    return;
  }

  låst = false;
  resultat.textContent = `Fråga ${i + 1} av ${frågor.length}`;
  const f = frågor[i];

  const container = document.createElement("div");
  container.innerHTML = `<h2>${f.q}</h2>`;
  const opts = document.createElement("div");
  opts.className = "options";

  // blanda alternativen lätt
  const blandat = [...f.options].sort(() => Math.random() - 0.5);
  blandat.forEach(opt => opts.appendChild(skapaAlternativ(opt)));

  container.appendChild(opts);
  quizDiv.innerHTML = "";
  quizDiv.appendChild(container);

  knapp.disabled = true;
}

function hanteraVal(el, val) {
  if (låst) return;
  låst = true;

  // markera vald + visa rätt/fel
  const f = frågor[i];
  const alla = Array.from(document.querySelectorAll(".option"));
  alla.forEach(btn => btn.classList.add("disabled"));

  if (val === f.correct) {
    el.classList.add("correct");
    poäng++;
  } else {
    el.classList.add("wrong");
    // highlighta rätt svar
    const rätt = alla.find(b => b.textContent === f.correct);
    if (rätt) rätt.classList.add("correct");
  }

  knapp.disabled = false;
}

knapp.addEventListener("click", () => {
  i++;
  render();
});

render();

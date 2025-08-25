let frågor = [];
let i = 0;
let poäng = 0;
let låst = false;

const quizDiv = document.getElementById("quiz");
const knapp = document.getElementById("next");
const resultat = document.getElementById("resultat");

// ------------- Ladda frågor från JSON -------------
fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    // blanda och ta max 10
    frågor = [...data].sort(() => Math.random() - 0.5).slice(0, 10);
    render(); // kör först när frågorna finns
  })
  .catch(err => {
    console.error(err);
    quizDiv.innerHTML = "<p>Kunde inte ladda frågorna.</p>";
    knapp.style.display = "none";
  });

// ------------- UI / logik -------------
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

  // blanda alternativen
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

  const f = frågor[i];
  const alla = Array.from(document.querySelectorAll(".option"));
  alla.forEach(btn => btn.classList.add("disabled"));

  if (val === f.correct) {
    el.classList.add("correct");
    poäng++;
  } else {
    el.classList.add("wrong");
    const rätt = alla.find(b => b.textContent === f.correct);
    if (rätt) rätt.classList.add("correct");
  }

  knapp.disabled = false;
}

knapp.addEventListener("click", () => {
  i++;
  render();
});

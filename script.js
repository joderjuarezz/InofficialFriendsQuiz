const frågor = [
  { q: "Vad heter Ross andra ex-fru?", a: "Emily" },
  { q: "Vilken maträtt älskar Joey mest?", a: "Pizza" },
  { q: "Vad heter kaffebaren där gänget hänger?", a: "Central Perk" }
];

let index = 0;
let poäng = 0;

const quizDiv = document.getElementById("quiz");
const knapp = document.getElementById("next");
const resultat = document.getElementById("resultat");

function visaFråga() {
  if (index < frågor.length) {
    const fråga = frågor[index];
    quizDiv.innerHTML = `
      <h2>${fråga.q}</h2>
      <input id="svar" placeholder="Ditt svar här">
    `;
  } else {
    quizDiv.innerHTML = "<h2>Slut på quizet!</h2>";
    resultat.innerText = `Du fick ${poäng} av ${frågor.length} rätt.`;
    knapp.style.display = "none";
  }
}

knapp.addEventListener("click", () => {
  const användarSvar = document.getElementById("svar").value.trim();
  if (användarSvar.toLowerCase() === frågor[index].a.toLowerCase()) {
    poäng++;
  }
  index++;
  visaFråga();
});

visaFråga();

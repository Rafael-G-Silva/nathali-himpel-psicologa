/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */
const WHATSAPP = "5547989274781"; // DDI + DDD + número, só dígitos

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ---------- Links do WhatsApp com mensagem pronta ---------- */
document.querySelectorAll(".js-wa").forEach((a) => {
  a.href = waLink(a.dataset.msg);
  a.target = "_blank";
  a.rel = "noopener";
});

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Entradas ao rolar (uma vez) ---------- */
const revealed = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !reduced) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  revealed.forEach((el) => io.observe(el));
} else {
  revealed.forEach((el) => el.classList.add("is-in"));
}

/* ---------- Check-in: a frase responde ---------- */
const FEELINGS = {
  ansiedade: {
    title: "Quando a mente não desacelera",
    text: "Tudo parece urgente, o corpo fica em alerta e o descanso não chega. Na terapia, a gente entende juntos o que alimenta essa ansiedade e constrói formas mais gentis de lidar com ela.",
    topic: "ansiedade"
  },
  tristeza: {
    title: "Quando os dias ficam pesados",
    text: "Sentir-se para baixo por muito tempo não é frescura nem fraqueza. Você merece um espaço para colocar isso em palavras, no seu ritmo e sem julgamento.",
    topic: "tristeza e desânimo"
  },
  cansaco: {
    title: "Quando você carrega o mundo nas costas",
    text: "Dar conta de tudo tem um preço. A terapia ajuda a reconhecer limites, reorganizar prioridades e cuidar de quem vive cuidando de tudo: você.",
    topic: "cansaço e sobrecarga"
  },
  luto: {
    title: "Quando algo importante se vai",
    text: "Perdas de pessoas, relações ou planos pedem tempo e acolhimento. Não existe jeito certo de sentir, e você não precisa atravessar isso só.",
    topic: "luto e perdas"
  },
  relacoes: {
    title: "Quando uma relação machuca",
    text: "Conflitos, términos, dependência emocional ou dificuldade de se expressar. Entender os seus padrões é um caminho para se relacionar de forma mais leve e verdadeira.",
    topic: "relacionamentos"
  },
  autoconhecimento: {
    title: "Quando você quer se entender melhor",
    text: "Não é preciso estar em crise para fazer terapia. Querer se conhecer, entender suas escolhas e o que sente já é um ótimo motivo para começar.",
    topic: "autoconhecimento"
  }
};

const feels = [...document.querySelectorAll(".feel")];
const answer = document.querySelector(".checkin__answer");
const feelTitle = document.getElementById("feelTitle");
const feelText = document.getElementById("feelText");
const feelCta = document.getElementById("feelCta");

feels.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("is-on")) return;
    feels.forEach((b) => {
      const on = b === btn;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    const f = FEELINGS[btn.dataset.feel];
    answer.classList.add("is-switching");
    setTimeout(() => {
      feelTitle.textContent = f.title;
      feelText.textContent = f.text;
      feelCta.href = waLink(`Olá, Náthali! Vi seu site e gostaria de conversar sobre ${f.topic}.`);
      answer.classList.remove("is-switching");
    }, reduced ? 0 : 260);
  });
});

/* ---------- Um minuto para respirar: a moldura respira ---------- */
const frame = document.getElementById("breathFrame");
const state = document.getElementById("breathState");
const breathBtn = document.getElementById("breathBtn");

const PHASES = [
  { label: "Inspire", scale: 1.6, secs: 4 },
  { label: "Segure", scale: 1.6, secs: 4 },
  { label: "Solte", scale: 1, secs: 6 }
];
let breathing = false;
let phaseTimer = null;
let tickTimer = null;
let cycles = 0;

function runPhase(i) {
  const p = PHASES[i];
  frame.style.setProperty("--dur", `${p.secs}s`);
  frame.style.setProperty("--s", reduced ? 1 : p.scale);
  let left = p.secs;
  state.textContent = `${p.label}… ${left}`;
  clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    left -= 1;
    if (left > 0) state.textContent = `${p.label}… ${left}`;
  }, 1000);
  phaseTimer = setTimeout(() => {
    const next = (i + 1) % PHASES.length;
    if (next === 0) cycles += 1;
    runPhase(next);
  }, p.secs * 1000);
}

function stopBreathing() {
  breathing = false;
  clearTimeout(phaseTimer);
  clearInterval(tickTimer);
  frame.style.setProperty("--dur", "1.2s");
  frame.style.setProperty("--s", 1);
  state.textContent = cycles === 0 ? "Pronto quando você estiver."
    : cycles === 1 ? "Um ciclo completo. Que bom." : `${cycles} ciclos completos. Que bom.`;
  breathBtn.textContent = "Respirar de novo";
}

breathBtn.addEventListener("click", () => {
  if (breathing) { stopBreathing(); return; }
  breathing = true;
  cycles = 0;
  breathBtn.textContent = "Pausar";
  const r = frame.getBoundingClientRect();
  if (r.top < 0 || r.bottom > innerHeight) frame.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  runPhase(0);
});

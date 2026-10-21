/* =========================================================
   CONFIGURAÇÃO — edite aqui
   ========================================================= */
const CONFIG = {
  whatsapp: "5547989274781", // DDI + DDD + número, só dígitos
  crp: "12/XXXXX"            // número do CRP da Nathali
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ---------- Links de WhatsApp ---------- */
function waLink(msg) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}
function applyWaLinks() {
  $$(".js-wa").forEach((a) => {
    a.href = waLink(a.dataset.msg || "Olá, Nathali! Vi seu site e gostaria de agendar uma sessão.");
    a.target = "_blank";
    a.rel = "noopener";
  });
}
applyWaLinks();

/* ---------- CRP ---------- */
$$(".js-crp").forEach((el) => {
  el.textContent = el.textContent.replace("12/XXXXX", CONFIG.crp);
});

/* ---------- Ano no rodapé ---------- */
$("#year").textContent = new Date().getFullYear();

/* ---------- Cabeçalho, barra de progresso e botão flutuante ---------- */
const header = $(".header");
const progress = $(".progress span");
const waFloat = $(".wa-float");

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle("is-scrolled", y > 24);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  waFloat.classList.toggle("is-visible", y > 520);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const burger = $("#burger");
const nav = $("#nav");

function setMenu(open) {
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
}
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
$$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Palavra rotativa no topo ---------- */
const words = ["ansiedade", "autoestima", "relacionamentos", "luto", "cansaço", "recomeços", "você"];
const rotator = $("#rotator");
let wordIndex = 0;

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  if (reduceMotion) { rotator.textContent = words[wordIndex]; return; }
  rotator.classList.add("is-out");
  setTimeout(() => {
    rotator.textContent = words[wordIndex];
    rotator.classList.remove("is-out");
    rotator.classList.add("is-in");
    void rotator.offsetWidth; // força o reflow para a transição de entrada
    rotator.classList.remove("is-in");
  }, 420);
}, 2600);

/* ---------- Animações de entrada ---------- */
$$(".reveal").forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
  const i = siblings.indexOf(el);
  if (i > 0) el.style.setProperty("--d", `${Math.min(i, 6) * 0.08}s`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    if (entry.target.classList.contains("plan")) countUp(entry.target);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

$$(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------- Contagem dos preços ---------- */
const brl = new Intl.NumberFormat("pt-BR");

function countUp(plan) {
  const el = $(".num", plan);
  const target = Number(el.dataset.count);
  if (reduceMotion) { el.textContent = brl.format(target); return; }
  const duration = 1300;
  const start = performance.now();
  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = brl.format(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- Link ativo no menu ---------- */
const navLinks = $$('.nav > a[href^="#"]:not(.btn)');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });

navLinks.forEach((a) => {
  const section = $(a.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});

/* ---------- Check-in emocional ---------- */
const moods = {
  ansiedade: {
    title: "Quando a mente não desacelera",
    text: "Tudo parece urgente, o corpo fica em alerta e o descanso não chega. Na terapia, a gente entende juntos o que alimenta essa ansiedade e constrói formas mais gentis de lidar com ela.",
    topic: "ansiedade"
  },
  tristeza: {
    title: "Quando os dias ficam pesados",
    text: "Sentir-se para baixo por muito tempo não é frescura nem fraqueza. Você merece um espaço para colocar isso em palavras, no seu ritmo e sem julgamentos.",
    topic: "tristeza e desânimo"
  },
  cansaco: {
    title: "Quando você carrega o mundo nas costas",
    text: "Dar conta de tudo tem um preço. A terapia ajuda a reconhecer limites, reorganizar prioridades e cuidar de quem vive cuidando de tudo: você.",
    topic: "cansaço e sobrecarga"
  },
  relacoes: {
    title: "Quando as relações machucam",
    text: "Conflitos, términos, dependência emocional ou dificuldade de se expressar. Entender seus padrões é um caminho para se relacionar de forma mais leve e verdadeira.",
    topic: "relacionamentos"
  },
  luto: {
    title: "Quando algo importante se vai",
    text: "Perdas de pessoas, relações ou planos pedem tempo e acolhimento. Não existe jeito certo de sentir, e você não precisa atravessar isso só.",
    topic: "luto e perdas"
  },
  autoconhecimento: {
    title: "Quando você quer se entender melhor",
    text: "Não é preciso estar em crise para fazer terapia. Querer se conhecer, entender suas escolhas e o que sente já é um ótimo motivo para começar.",
    topic: "autoconhecimento"
  }
};

const moodPanel = $("#moodPanel");
const moodTitle = $("#moodTitle");
const moodText = $("#moodText");
const moodCta = $("#moodCta");

$$(".mood").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("is-active")) return;
    $$(".mood").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    const mood = moods[btn.dataset.mood];
    moodPanel.classList.add("is-switching");
    setTimeout(() => {
      moodTitle.textContent = mood.title;
      moodText.textContent = mood.text;
      moodCta.href = waLink(`Olá, Nathali! Vi seu site e gostaria de conversar sobre ${mood.topic}.`);
      moodPanel.classList.remove("is-switching");
    }, reduceMotion ? 0 : 300);
  });
});

/* ---------- Exercício de respiração ---------- */
const breath = $("#breath");
const breathLabel = $("#breathLabel");
const breathTimer = $("#breathTimer");
const breatheBtn = $("#breatheBtn");
const breatheCount = $("#breatheCount");

const phases = [
  { label: "Inspire", scale: 1, secs: 4 },
  { label: "Segure", scale: 1, secs: 4 },
  { label: "Solte", scale: 0.55, secs: 6 }
];
let breathing = false;
let phaseTimer = null;
let tickTimer = null;
let cycles = 0;

function runPhase(i) {
  const phase = phases[i];
  breath.style.setProperty("--dur", `${phase.secs}s`);
  breath.style.setProperty("--s", phase.scale);
  breathLabel.textContent = phase.label;

  let left = phase.secs;
  breathTimer.textContent = left;
  clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    left -= 1;
    if (left > 0) breathTimer.textContent = left;
  }, 1000);

  phaseTimer = setTimeout(() => {
    const next = (i + 1) % phases.length;
    if (next === 0) {
      cycles += 1;
      breatheCount.textContent = cycles === 1 ? "1 ciclo completo. Continue no seu ritmo." : `${cycles} ciclos completos. Muito bem.`;
    }
    runPhase(next);
  }, phase.secs * 1000);
}

function stopBreathing() {
  breathing = false;
  clearTimeout(phaseTimer);
  clearInterval(tickTimer);
  breath.style.setProperty("--dur", "1.2s");
  breath.style.setProperty("--s", 0.55);
  breathLabel.textContent = cycles ? "Que bom" : "Pronto?";
  breathTimer.textContent = "";
  breatheBtn.textContent = "Respirar de novo";
}

breatheBtn.addEventListener("click", () => {
  if (breathing) { stopBreathing(); return; }
  breathing = true;
  cycles = 0;
  breatheCount.textContent = "";
  breatheBtn.textContent = "Pausar";
  const r = breath.getBoundingClientRect();
  if (r.top < 0 || r.bottom > window.innerHeight) breath.scrollIntoView({ behavior: "smooth", block: "center" });
  runPhase(0);
});

/* ---------- Perguntas frequentes ---------- */
$$(".acc").forEach((item) => {
  const q = $(".acc__q", item);
  q.addEventListener("click", () => {
    const open = !item.classList.contains("is-open");
    $$(".acc.is-open").forEach((other) => {
      if (other === item) return;
      other.classList.remove("is-open");
      $(".acc__q", other).setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("is-open", open);
    q.setAttribute("aria-expanded", String(open));
  });
});

/* ---------- Efeitos de mouse (só em desktop) ---------- */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  const portrait = $("#portrait");
  const hero = $(".hero");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    portrait.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  hero.addEventListener("mouseleave", () => { portrait.style.transform = ""; });

  const finalCard = $(".final__card");
  finalCard.addEventListener("mousemove", (e) => {
    const r = finalCard.getBoundingClientRect();
    finalCard.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    finalCard.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  });
}

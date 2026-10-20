(() => {
  "use strict";

  const QUESTIONS_URL = "questions.json";
  const PROGRESS_KEY = "vestibularPwa.progress.v1";
  const SETTINGS_KEY = "vestibularPwa.settings.v1";
  const DEFAULT_REWARD = "Mandou bem! Você já pode fumar um baseado como recompensa 🌿 — aproveite a pausa e volte focado.";
  const ACHIEVEMENTS = [
    { id: "first-answer", title: "Primeiro passo", description: "Responda sua primeira questão.", icon: "✦" },
    { id: "first-correct", title: "Primeiro acerto", description: "Acerte uma questão pela primeira vez.", icon: "✓" },
    { id: "ten-answers", title: "Ritmo de estudo", description: "Registre 10 tentativas.", icon: "↗" },
    { id: "fifty-answers", title: "Constância", description: "Registre 50 tentativas.", icon: "★" },
    { id: "seven-day-streak", title: "Uma semana em movimento", description: "Estude por 7 dias consecutivos.", icon: "♨" }
  ];
  const state = {
    questions: [], currentQuestion: null, selectedAnswer: null, answerSubmitted: false,
    currentScreen: "home", selectedSubject: "Todas", messageTimer: null,
    progress: null, settings: null
  };

  const freshProgress = () => ({
    schemaVersion: 1, xp: 0, points: 0, level: 1,
    streak: { current: 0, best: 0, lastStudyDate: null },
    achievements: [], attempts: [], answeredQuestionIds: [], correctQuestionIds: [],
    questionStats: {}, subjectStats: {}
  });
  const freshSettings = () => ({ rewardMessage: DEFAULT_REWARD, rewardThreshold: 10 });

  function safeLoad(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : fallback();
    } catch (error) { return fallback(); }
  }
  function loadProgress() {
    const p = safeLoad(PROGRESS_KEY, freshProgress);
    const defaults = freshProgress();
    state.progress = { ...defaults, ...p, streak: { ...defaults.streak, ...(p.streak || {}) } };
    if (!Array.isArray(state.progress.attempts)) state.progress.attempts = [];
    if (!Array.isArray(state.progress.answeredQuestionIds)) state.progress.answeredQuestionIds = [];
    if (!Array.isArray(state.progress.correctQuestionIds)) state.progress.correctQuestionIds = [];
    if (!Array.isArray(state.progress.achievements)) state.progress.achievements = [];
    state.progress.level = calculateLevel(state.progress.xp || 0);
  }
  function saveProgress() {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(state.progress)); }
    catch (error) { showMessage("Não foi possível salvar. Verifique o espaço disponível no navegador."); }
  }
  function loadSettings() {
    const loaded = safeLoad(SETTINGS_KEY, freshSettings);
    state.settings = { ...freshSettings(), ...loaded };
    if (typeof state.settings.rewardMessage !== "string") state.settings.rewardMessage = DEFAULT_REWARD;
    if (![5, 10, 20].includes(Number(state.settings.rewardThreshold))) state.settings.rewardThreshold = 10;
    state.settings.rewardThreshold = Number(state.settings.rewardThreshold);
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings)); showMessage("Configurações salvas neste dispositivo."); }
    catch (error) { showMessage("Não foi possível salvar as configurações."); }
  }
  function calculateLevel(xp) { return Math.floor(Math.max(0, Number(xp) || 0) / 100) + 1; }
  function localDateKey(date = new Date()) {
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  }
  function updateStreak(dateKey) {
    const streak = state.progress.streak;
    if (streak.lastStudyDate === dateKey) return;
    const previous = streak.lastStudyDate ? new Date(streak.lastStudyDate + "T12:00:00") : null;
    const today = new Date(dateKey + "T12:00:00");
    const difference = previous ? Math.round((today - previous) / 86400000) : 0;
    streak.current = difference === 1 ? streak.current + 1 : 1;
    streak.best = Math.max(streak.best, streak.current);
    streak.lastStudyDate = dateKey;
  }
  function updateStats(attempt) {
    const p = state.progress;
    p.questionStats[attempt.questionId] ||= { attempts: 0, correct: 0 };
    p.questionStats[attempt.questionId].attempts++;
    if (attempt.correct) p.questionStats[attempt.questionId].correct++;
    const q = state.questions.find(item => item.id === attempt.questionId);
    if (q) {
      p.subjectStats[q.disciplina] ||= { attempts: 0, correct: 0 };
      p.subjectStats[q.disciplina].attempts++;
      if (attempt.correct) p.subjectStats[q.disciplina].correct++;
    }
  }
  function checkAchievements() {
    const p = state.progress;
    const correct = p.correctQuestionIds.length;
    const checks = [
      ["first-answer", p.attempts.length >= 1],
      ["first-correct", correct >= 1],
      ["ten-answers", p.attempts.length >= 10],
      ["fifty-answers", p.attempts.length >= 50],
      ["seven-day-streak", p.streak.current >= 7]
    ];
    for (const [id, earned] of checks) {
      if (earned && !p.achievements.includes(id)) {
        p.achievements.push(id);
        const item = ACHIEVEMENTS.find(a => a.id === id);
        if (item) showMessage("Conquista desbloqueada: " + item.title + "!");
      }
    }
  }
  function showMessage(message) {
    const el = document.getElementById("app-message");
    if (!el) return;
    el.textContent = message;
    el.classList.remove("hidden");
    clearTimeout(state.messageTimer);
    state.messageTimer = setTimeout(() => el.classList.add("hidden"), 4200);
  }
  function navigateTo(screenName) {
    if (!["home", "study", "stats", "settings"].includes(screenName)) return;
    state.currentScreen = screenName;
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
    const screen = document.getElementById("screen-" + screenName);
    if (screen) screen.classList.remove("hidden");
    document.querySelectorAll(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.screen === screenName));
    if (screenName === "home") renderHome();
    if (screenName === "stats") renderStats();
    if (screenName === "settings") renderSettings();
    if (screenName === "study") renderCurrentQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function filteredQuestions() {
    const exam = document.getElementById("filter-vestibular").value;
    const subject = document.getElementById("filter-disciplina").value;
    const topic = document.getElementById("filter-materia").value;
    return state.questions.filter(q =>
      (exam === "Todos" || q.vestibular === exam) &&
      (subject === "Todas" || q.disciplina === subject) &&
      (topic === "Todas" || q.materia === topic)
    );
  }
  function updateTopicOptions() {
    const subject = document.getElementById("filter-disciplina").value;
    const select = document.getElementById("filter-materia");
    const previous = select.value;
    const topics = [...new Set(state.questions.filter(q => subject === "Todas" || q.disciplina === subject).map(q => q.materia))].sort((a,b) => a.localeCompare(b, "pt-BR"));
    select.replaceChildren(new Option("Todas", "Todas"), ...topics.map(topic => new Option(topic, topic)));
    if (topics.includes(previous)) select.value = previous;
  }
  function selectNextQuestion() {
    const list = filteredQuestions();
    const empty = document.getElementById("study-empty");
    const card = document.querySelector(".question-card");
    if (!list.length) {
      state.currentQuestion = null;
      card.classList.add("hidden"); empty.classList.remove("hidden");
      return;
    }
    empty.classList.add("hidden"); card.classList.remove("hidden");
    const currentIndex = list.findIndex(q => q.id === state.currentQuestion?.id);
    state.currentQuestion = list[(currentIndex + 1 + list.length) % list.length];
    state.selectedAnswer = null; state.answerSubmitted = false;
    renderCurrentQuestion();
  }
  function renderCurrentQuestion() {
    if (!state.questions.length) return;
    const list = filteredQuestions();
    const empty = document.getElementById("study-empty");
    const card = document.querySelector(".question-card");
    if (!list.length) { card.classList.add("hidden"); empty.classList.remove("hidden"); return; }
    card.classList.remove("hidden"); empty.classList.add("hidden");
    if (!state.currentQuestion || !list.some(q => q.id === state.currentQuestion.id)) state.currentQuestion = list[0];
    const q = state.currentQuestion;
    document.getElementById("question-counter").textContent = "Questão " + (list.findIndex(item => item.id === q.id) + 1) + " de " + list.length;
    document.getElementById("question-tags").textContent = q.vestibular + " · " + q.disciplina + " · " + q.dificuldade;
    document.getElementById("question-enunciado").textContent = q.enunciado;
    const support = document.getElementById("question-texto-apoio");
    support.textContent = q.textoApoio || "";
    support.classList.toggle("hidden", !q.textoApoio);
    const alternatives = document.getElementById("question-alternativas");
    alternatives.replaceChildren();
    q.alternativas.forEach((text, index) => {
      const button = document.createElement("button");
      button.type = "button"; button.className = "alternative";
      if (state.selectedAnswer === index) button.classList.add("selected");
      if (state.answerSubmitted && index === q.respostaCorreta) button.classList.add("correct");
      if (state.answerSubmitted && state.selectedAnswer === index && index !== q.respostaCorreta) button.classList.add("incorrect");
      button.disabled = state.answerSubmitted;
      const letter = document.createElement("span"); letter.className = "alternative-letter"; letter.textContent = String.fromCharCode(65 + index);
      const label = document.createElement("span"); label.textContent = text;
      button.append(letter, label);
      button.addEventListener("click", () => { if (!state.answerSubmitted) { state.selectedAnswer = index; renderCurrentQuestion(); } });
      alternatives.append(button);
    });
    const feedback = document.getElementById("question-feedback");
    const explanation = document.getElementById("question-explicacao");
    feedback.classList.toggle("hidden", !state.answerSubmitted);
    explanation.classList.toggle("hidden", !state.answerSubmitted);
    if (state.answerSubmitted) {
      const correct = state.selectedAnswer === q.respostaCorreta;
      feedback.className = "feedback " + (correct ? "good" : "bad");
      feedback.textContent = correct ? "Resposta correta! Você está construindo seu repertório." : "Ainda não. A alternativa correta é " + String.fromCharCode(65 + q.respostaCorreta) + ". Revise a explicação e tente a próxima.";
      explanation.replaceChildren();
      const title = document.createElement("strong"); title.textContent = "Entenda a resposta";
      const text = document.createElement("span"); text.textContent = q.explicacao;
      explanation.append(title, text);
    } else {
      feedback.className = "feedback hidden"; explanation.className = "explanation hidden";
    }
    document.getElementById("button-submit-answer").classList.toggle("hidden", state.answerSubmitted);
    document.getElementById("button-submit-answer").disabled = state.selectedAnswer === null;
    document.getElementById("button-next-question").classList.toggle("hidden", !state.answerSubmitted);
  }
  function submitAnswer() {
    const q = state.currentQuestion;
    if (!q || state.answerSubmitted || state.selectedAnswer === null) return;
    state.answerSubmitted = true;
    const correct = state.selectedAnswer === q.respostaCorreta;
    const firstAnswer = !state.progress.answeredQuestionIds.includes(q.id);
    const attempt = {
      attemptId: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      questionId: q.id, selectedAnswer: state.selectedAnswer, correct,
      date: localDateKey(), timestamp: new Date().toISOString(),
      xpEarned: firstAnswer ? (correct ? 10 : 2) : 0,
      pointsEarned: firstAnswer && correct ? 10 : 0
    };
    state.progress.attempts.unshift(attempt);
    state.progress.xp += attempt.xpEarned;
    state.progress.points += attempt.pointsEarned;
    if (firstAnswer) state.progress.answeredQuestionIds.push(q.id);
    const firstCorrect = correct && !state.progress.correctQuestionIds.includes(q.id);
    if (firstCorrect) state.progress.correctQuestionIds.push(q.id);
    updateStreak(attempt.date);
    updateStats(attempt);
    state.progress.level = calculateLevel(state.progress.xp);
    checkAchievements();
    saveProgress();
    renderHome();
    renderCurrentQuestion();
    if (firstCorrect && state.progress.correctQuestionIds.length % state.settings.rewardThreshold === 0 && state.settings.rewardMessage.trim()) {
      showMessage(state.settings.rewardMessage);
    }
  }
  function renderHome() {
    const p = state.progress;
    document.getElementById("home-xp").textContent = p.xp;
    document.getElementById("home-level").textContent = calculateLevel(p.xp);
    document.getElementById("home-streak").textContent = p.streak.current;
    document.getElementById("home-points").textContent = p.points;
  }
  function renderStats() {
    const p = state.progress;
    const overview = document.getElementById("stats-overview");
    const total = p.attempts.length;
    const correct = p.attempts.filter(a => a.correct).length;
    const accuracy = total ? Math.round(correct / total * 100) : 0;
    const items = [["Tentativas", total, "respostas registradas"], ["Acertos", correct, "incluindo novas tentativas"], ["Precisão", accuracy + "%", "acertos sobre tentativas"], ["Melhor sequência", p.streak.best + " dias", "seu recorde"]];
    overview.replaceChildren();
    items.forEach(([label, value, note]) => {
      const card = document.createElement("article"); card.className = "stat-card";
      const name = document.createElement("span"); name.className = "stat-label"; name.textContent = label;
      const strong = document.createElement("strong"); strong.textContent = value;
      const small = document.createElement("small"); small.textContent = note;
      card.append(name, strong, small); overview.append(card);
    });
    const bySubject = document.getElementById("stats-by-subject"); bySubject.replaceChildren();
    const entries = Object.entries(p.subjectStats);
    if (!entries.length) bySubject.append(makeEmpty("Responda algumas questões para ver seus resultados por disciplina."));
    entries.sort((a,b) => b[1].attempts - a[1].attempts).forEach(([subject, data]) => {
      const row = document.createElement("div"); row.className = "subject-stat";
      const left = document.createElement("div"); left.style.flex = "1";
      const title = document.createElement("strong"); title.textContent = subject;
      const small = document.createElement("small"); small.textContent = data.correct + " acertos em " + data.attempts + " tentativas";
      const track = document.createElement("div"); track.className = "progress-track";
      const fill = document.createElement("div"); fill.className = "progress-fill"; fill.style.width = (data.attempts ? data.correct / data.attempts * 100 : 0) + "%";
      track.append(fill); left.append(title, small, track);
      const pct = document.createElement("strong"); pct.textContent = (data.attempts ? Math.round(data.correct / data.attempts * 100) : 0) + "%";
      row.append(left, pct); bySubject.append(row);
    });
    const history = document.getElementById("stats-history"); history.replaceChildren();
    if (!p.attempts.length) history.append(makeEmpty("Seu histórico aparecerá aqui depois da primeira resposta."));
    p.attempts.slice(0, 10).forEach(attempt => {
      const q = state.questions.find(item => item.id === attempt.questionId);
      const row = document.createElement("div"); row.className = "history-item";
      const left = document.createElement("div");
      const title = document.createElement("strong"); title.textContent = q ? q.materia + " · " + q.disciplina : "Questão";
      const small = document.createElement("small"); small.textContent = new Date(attempt.timestamp).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
      left.append(title, small);
      const result = document.createElement("span"); result.className = "result-tag " + (attempt.correct ? "good" : "bad"); result.textContent = attempt.correct ? "CORRETA" : "INCORRETA";
      row.append(left, result); history.append(row);
    });
    const achievements = document.getElementById("stats-achievements"); achievements.replaceChildren();
    ACHIEVEMENTS.forEach(item => {
      const row = document.createElement("div"); row.className = "achievement";
      const left = document.createElement("div");
      const title = document.createElement("strong"); title.textContent = item.icon + "  " + item.title;
      const small = document.createElement("small"); small.textContent = item.description;
      left.append(title, small);
      const badge = document.createElement("span"); badge.className = "result-tag " + (p.achievements.includes(item.id) ? "good" : ""); badge.textContent = p.achievements.includes(item.id) ? "DESBLOQUEADA" : "BLOQUEADA";
      row.append(left, badge); achievements.append(row);
    });
  }
  function makeEmpty(text) { const el = document.createElement("p"); el.className = "empty-state"; el.textContent = text; return el; }
  function renderSettings() {
    document.getElementById("settings-reward-message").value = state.settings.rewardMessage;
    document.getElementById("settings-reward-threshold").value = String(state.settings.rewardThreshold);
  }
  function resetProgress() {
    if (!window.confirm("Isso apagará XP, pontos, sequência, conquistas e histórico deste navegador. Deseja continuar?")) return;
    state.progress = freshProgress(); saveProgress(); renderHome(); renderStats(); showMessage("Progresso apagado neste dispositivo.");
  }
  function bindEvents() {
    document.querySelectorAll("[data-screen]").forEach(button => button.addEventListener("click", event => {
      event.preventDefault();
      const subject = button.dataset.subject;
      if (subject) { document.getElementById("filter-disciplina").value = subject; updateTopicOptions(); }
      navigateTo(button.dataset.screen);
    }));
    document.getElementById("filter-vestibular").addEventListener("change", () => { state.currentQuestion = null; renderCurrentQuestion(); });
    document.getElementById("filter-disciplina").addEventListener("change", () => { updateTopicOptions(); state.currentQuestion = null; renderCurrentQuestion(); });
    document.getElementById("filter-materia").addEventListener("change", () => { state.currentQuestion = null; renderCurrentQuestion(); });
    document.getElementById("button-submit-answer").addEventListener("click", submitAnswer);
    document.getElementById("button-next-question").addEventListener("click", selectNextQuestion);
    document.getElementById("settings-save").addEventListener("click", () => {
      state.settings.rewardMessage = document.getElementById("settings-reward-message").value;
      state.settings.rewardThreshold = Number(document.getElementById("settings-reward-threshold").value);
      saveSettings();
    });
    document.getElementById("settings-reset-progress").addEventListener("click", resetProgress);
  }
  async function loadQuestions() {
    const response = await fetch(QUESTIONS_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error("Não foi possível carregar questions.json");
    const data = await response.json();
    if (!Array.isArray(data) || !data.every(q => q && typeof q.id === "string" && typeof q.enunciado === "string" && Array.isArray(q.alternativas) && q.alternativas.length >= 2 && Number.isInteger(q.respostaCorreta) && q.respostaCorreta >= 0 && q.respostaCorreta < q.alternativas.length && typeof q.explicacao === "string")) {
      throw new Error("O arquivo questions.json contém questões em formato inválido.");
    }
    state.questions = data;
  }
  async function initApp() {
    loadProgress(); loadSettings(); bindEvents();
    try {
      await loadQuestions();
      updateTopicOptions();
      renderHome();
      if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
        navigator.serviceWorker.register("./service-worker.js").catch(() => {});
      }
      navigateTo("home");
    } catch (error) {
      document.getElementById("question-enunciado").textContent = "Não foi possível carregar as questões.";
      showMessage(error.message + " Confira se questions.json está na raiz do projeto.");
    }
  }
  document.addEventListener("DOMContentLoaded", initApp);
})();
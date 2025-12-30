document.addEventListener('DOMContentLoaded', () => {
  // Character Carousel
  let currentCharIndex = 0;
  const characters = document.querySelectorAll(".character-card");
  const totalChars = characters.length;

  const currentCharEl = document.getElementById("currentChar");
  const totalCharsEl = document.getElementById("totalChars");
  const dotsContainer = document.getElementById("dotsContainer");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  function showCharacter(index) {
    if (characters.length === 0) return;
    characters.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });

    if (currentCharEl) currentCharEl.textContent = index + 1;
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentCharIndex);
    });
  }

  function initDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalChars; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentCharIndex = i;
        showCharacter(currentCharIndex);
      });
      dotsContainer.appendChild(dot);
    }
    if (totalCharsEl) totalCharsEl.textContent = totalChars;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (totalChars === 0) return;
      currentCharIndex = (currentCharIndex + 1) % totalChars;
      showCharacter(currentCharIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (totalChars === 0) return;
      currentCharIndex = (currentCharIndex - 1 + totalChars) % totalChars;
      showCharacter(currentCharIndex);
    });
  }

  initDots();
  showCharacter(0);

  // Glossary Toggle (safe)
  window.toggleGlossary = function (header) {
    const item = header.closest('.glossary-item');
    if (!item) return;
    const content = item.querySelector('.glossary-content');
    const icon = header.querySelector('.toggle-icon');

    // Close other items
    document.querySelectorAll('.glossary-item').forEach((it) => {
      if (it !== item) {
        const c = it.querySelector('.glossary-content');
        const ic = it.querySelector('.toggle-icon');
        if (c) c.classList.remove('open');
        if (ic) ic.textContent = '+';
      }
    });

    if (content) {
      content.classList.toggle('open');
      if (icon) icon.textContent = content.classList.contains('open') ? '−' : '+';
    }
  }

  // Mobile Menu Toggle (safe)
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
  }

  window.addEventListener('load', hidePreloader);
  
  function hidePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
  }

  // Smooth Scrolling (safe)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        if (navMenu) navMenu.classList.remove("active");
      }
    });
  });

  // Quiz Logic
  let currentQuestionIndex = 0;
  const questions = document.querySelectorAll(".question");
  const totalQuestions = questions.length || 0;

  function showQuestion(index) {
    if (questions.length === 0) return;
    questions.forEach((q, i) => q.classList.toggle("active", i === index));
    const questionNumberEl = document.getElementById("questionNumber");
    if (questionNumberEl) questionNumberEl.textContent = `Question ${index + 1} of ${totalQuestions}`;

    const progressFill = document.getElementById("progressFill");
    if (progressFill && totalQuestions) {
      progressFill.style.width = ((index + 1) / totalQuestions) * 100 + "%";
    }

    const prevQBtn = document.getElementById("prevQuizBtn");
    const nextQBtn = document.getElementById("nextQuizBtn");
    const submitBtn = document.getElementById("submitQuizBtn");

    if (prevQBtn) prevQBtn.disabled = index === 0;
    if (nextQBtn) nextQBtn.style.display = index === totalQuestions - 1 ? "none" : "block";
    if (submitBtn) submitBtn.style.display = index === totalQuestions - 1 ? "block" : "none";
  }

  const nextQuizBtn = document.getElementById("nextQuizBtn");
  const prevQuizBtn = document.getElementById("prevQuizBtn");
  if (nextQuizBtn) {
    nextQuizBtn.addEventListener("click", () => {
      if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      }
    });
  }
  if (prevQuizBtn) {
    prevQuizBtn.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
      }
    });
  }

  showQuestion(0);

  const correctAnswers = {
    q0: "a",
    q1: "b",
    q2: "d",
    q3: "b",
    q4: "d",
  };

  const submitQuizBtn = document.getElementById("submitQuizBtn");
  if (submitQuizBtn) submitQuizBtn.addEventListener("click", submitQuiz);

  function submitQuiz() {
    let score = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const questionName = "q" + i;
      const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
      if (selectedAnswer && selectedAnswer.value === correctAnswers[questionName]) score++;
    }
    const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
    const resultDiv = document.getElementById("quizResult");
    if (resultDiv) resultDiv.innerHTML = `<div class="quiz-score"><strong>Your Score: ${score}/${totalQuestions} (${percentage}%)</strong></div>`;
    if (resultDiv) resultDiv.scrollIntoView({ behavior: "smooth" });
  }
});

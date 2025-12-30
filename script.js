// Data
const quizQuestions = [
  {
    id: 1,
    question: "What is the name of the bipedal nuclear tank in Metal Gear Solid?",
    options: ["Metal Gear REX", "Metal Gear RAY", "Metal Gear RISING", "Metal Gear OMEGA"],
    correct: "Metal Gear REX",
  },
  {
    id: 2,
    question: "Which island does Solid Snake infiltrate in the first game?",
    options: ["Zanzibar Island", "Shadow Moses", "Tselinoyarsk", "Ponizovje"],
    correct: "Shadow Moses",
  },
  {
    id: 3,
    question: "What is the name of the virus in MGS1?",
    options: ["OCELOT", "FOXDIE", "PATRIOTS", "LIQUID"],
    correct: "FOXDIE",
  },
  {
    id: 4,
    question: "Which game features Raiden as the main playable character?",
    options: ["Metal Gear Solid 3", "Metal Gear Solid 2", "Metal Gear Solid 4", "Metal Gear Solid V"],
    correct: "Metal Gear Solid 2",
  },
  {
    id: 5,
    question: "What is Big Boss also known as?",
    options: ["The Legendary Wolf", "Venom Snake", "The Pain", "The End"],
    correct: "Venom Snake",
  },
]

// Timeline Data
const timelineDataRelease = [
  {
    year: "1987",
    system: "MSX2",
    game: "Metal Gear",
    description: "Rookie FOXHOUND agent Solid Snake infiltrates Outer Heaven to destroy the first Metal Gear.",
  },
  {
    year: "1990",
    system: "MSX2",
    game: "Metal Gear 2: Solid Snake",
    description: "Solid Snake is sent to Zanzibar Land to rescue a kidnapped scientist and stop Metal Gear D.",
  },
  {
    year: "1995",
    system: "PlayStation",
    game: "Metal Gear Solid",
    description: "Solid Snake infiltrates Shadow Moses Island to stop Metal Gear REX.",
  },

  {
    year: "2001",
    system: "PlayStation 2",
    game: "Metal Gear Solid 2: Sons of Liberty",
    description: "Raiden's mission on Tanker and Plant chapters unravel a conspiracy.",
  },
  {
    year: "2004",
    system: "PlayStation 2",
    game: "Metal Gear Solid 3: Snake Eater",
    description: "Naked Snake battles through the Soviet jungle during the Cold War.",
  },
  {
    year: "2008",
    system: "PlayStation 3",
    game: "Metal Gear Solid 4",
    description: "Old Snake seeks out Big Boss in a warzone across the globe.",
  },
  {
    year: "2010",
    system: "PlayStation Portable",
    game: "Metal Gear Solid: Peace Walker",
    description: "Big Boss builds his own army while confronting a new Metal Gear threat in Cold War-era Central America.",
  },
  {
    year: "2014",
    system: "Multi-platform",
    game: "Metal Gear Solid V",
    description: "Venom Snake builds Outer Heaven and seeks revenge on Cipher.",
  },
]

const timelineDataChronological = [
  {
    year: "1964",
    system: "Game Timeline",
    game: "Metal Gear Solid 3: Snake Eater",
    description: "Naked Snake battles through the Soviet jungle during the Cold War.",
  },
  {
    year: "1975",
    system: "Game Timeline",
    game: "Metal Gear Solid: Peace Walker",
    description: "Big Boss establishes his own private army while facing a nuclear-equipped Metal Gear in Central America.",
  },
  {
    year: "1984",
    system: "Game Timeline",
    game: "Metal Gear Solid V: The Phantom Pain",
    description: "Venom Snake builds Outer Heaven and seeks revenge on Cipher.",
  },
  {
    year: "1995",
    system: "Game Timeline",
    game: "Metal Gear",
    description: "Solid Snake infiltrates Outer Heaven to destroy the world’s first bipedal nuclear weapon.",
  },
  {
    year: "1999",
    system: "Game Timeline",
    game: "Metal Gear 2: Solid Snake",
    description: "Solid Snake is forced back into action to stop Metal Gear D and confront his past in Zanzibar Land.",
  },
  {
    year: "2005",
    system: "Game Timeline",
    game: "Metal Gear Solid 1",
    description: "Solid Snake infiltrates Shadow Moses Island to stop Metal Gear REX.",
  },
  {
    year: "2009-2014",
    system: "Game Timeline",
    game: "Metal Gear Solid 2: Sons of Liberty",
    description: "Raiden's mission on Tanker and Plant chapters unravel a conspiracy.",
  },
  {
    year: "2014",
    system: "Game Timeline",
    game: "Metal Gear Solid 4",
    description: "Old Snake seeks out Big Boss in a warzone across the globe.",
  },
]

let currentTimelineView = "release"

function setTimelineView(view) {
  currentTimelineView = view

  document.querySelectorAll(".timeline-toggle-btn").forEach((btn) => {
    btn.classList.remove("active")
  })
  const activeBtn = document.querySelector(`[data-view="${view}"]`)
  if (activeBtn) activeBtn.classList.add("active")

  renderTimeline()
}

function renderTimeline() {
  const timelineData = currentTimelineView === "release" ? timelineDataRelease : timelineDataChronological
  const container = document.getElementById("timelineEvents")
  if (!container) return

  container.innerHTML = timelineData
    .map(
      (event, index) => `
      <div class="timeline-event">
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
          ${index < timelineData.length - 1 ? '<div class="timeline-line"></div>' : ""}
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3 class="timeline-year">${event.year}</h3>
            <span class="timeline-system">${event.system}</span>
          </div>
          <h4 class="timeline-game">${event.game}</h4>
          <p class="timeline-desc">${event.description}</p>
        </div>
      </div>
    `,
    )
    .join("")
}

// Make timeline functions globally available
window.setTimelineView = setTimelineView

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

  // Alternative Character Display (for dynamic character rendering)
  function updateCharacterDisplay() {
    if (charactersData.length === 0) return;
    const char = charactersData[currentCharIndex];
    const display = document.getElementById("characterDisplay");
    if (!display) return;

    display.innerHTML = `
      <div class="character-icon">${char.icon}</div>
      <h3 class="character-name">${char.name}</h3>
      <p class="character-role">${char.role}</p>
      <p class="character-desc">${char.description}</p>
      <div class="character-tags">
        ${char.traits.map((trait) => `<span class="tag">${trait}</span>`).join("")}
      </div>
    `

    if (currentCharEl) currentCharEl.textContent = currentCharIndex + 1;
    updateDots();
  }

  function nextCharacter() {
    if (charactersData.length === 0) return;
    currentCharIndex = (currentCharIndex + 1) % charactersData.length;
    updateCharacterDisplay();
  }

  function prevCharacter() {
    if (charactersData.length === 0) return;
    currentCharIndex = (currentCharIndex - 1 + charactersData.length) % charactersData.length;
    updateCharacterDisplay();
  }

  function goToCharacter(index) {
    if (charactersData.length === 0) return;
    currentCharIndex = index;
    updateCharacterDisplay();
  }

  // Make character functions globally available
  window.nextCharacter = nextCharacter;
  window.prevCharacter = prevCharacter;
  window.goToCharacter = goToCharacter;

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

  // Glossary Initialization (for dynamic glossary rendering)
  function initGlossary() {
    const container = document.getElementById("glossaryItems");
    if (!container) return;

    container.innerHTML = glossaryItems
      .map(
        (item, index) => `
        <div class="glossary-item">
          <button class="glossary-header" onclick="toggleGlossaryByIndex(${index})">
            <span>${item.term}</span>
            <span class="glossary-toggle">▼</span>
          </button>
          <div class="glossary-content" id="glossary-${index}">
            <p class="glossary-text">${item.definition}</p>
          </div>
        </div>
      `,
      )
      .join("")
  }

  function toggleGlossaryByIndex(index) {
    const content = document.getElementById(`glossary-${index}`);
    if (!content) return;
    const toggle = content.previousElementSibling.querySelector(".glossary-toggle");
    if (toggle) {
      content.classList.toggle("open");
      toggle.classList.toggle("open");
    }
  }

  window.toggleGlossaryByIndex = toggleGlossaryByIndex;

  // Mobile Menu Toggle (safe)
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => navMenu.classList.toggle("active"));
  }

  // Alternative mobile menu handler
  const menuToggle = document.getElementById("menuToggle");
  const navMenuAlt = document.getElementById("navMenu");
  if (menuToggle && navMenuAlt) {
    menuToggle.addEventListener("click", () => {
      navMenuAlt.classList.toggle("active");
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
      if (navMenuAlt) navMenuAlt.classList.remove("active");
    });
  });

  window.addEventListener('load', hidePreloader);

  function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  }

  // Smooth Scrolling (safe)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        if (navMenu) navMenu.classList.remove("active");
        if (navMenuAlt) navMenuAlt.classList.remove("active");
      }
    });
  });

  // Quiz Logic (for existing HTML structure)
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

  // Alternative Quiz Logic (for dynamic quiz rendering)
  let quizAnswers = {};
  let quizSubmitted = false;

  function initQuiz() {
    const container = document.getElementById("quizQuestions");
    if (!container) return;

    container.innerHTML = quizQuestions
      .map(
        (q) => `
        <div class="quiz-question">
          <p class="question-text">${q.question}</p>
          <div class="quiz-options">
            ${q.options
            .map(
              (option) => `
              <button class="quiz-option" onclick="selectAnswer(${q.id}, '${option.replace(/'/g, "\\'")}')">
                <span class="radio-circle"></span>
                ${option}
              </button>
            `,
            )
            .join("")}
          </div>
        </div>
      `,
      )
      .join("")
  }

  function selectAnswer(questionId, answer) {
    if (quizSubmitted) return;

    quizAnswers[questionId] = answer;

    // Update UI
    const buttons = document.querySelectorAll(`[onclick*="selectAnswer(${questionId}"]`);
    buttons.forEach((btn) => {
      if (btn.textContent.includes(answer)) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });

    // Update submit button state
    updateSubmitButton();
  }

  function updateSubmitButton() {
    const submitBtn = document.getElementById("submitBtn");
    if (!submitBtn) return;
    const answered = Object.keys(quizAnswers).length;
    submitBtn.disabled = answered < quizQuestions.length;
  }

  function submitQuizAlt() {
    quizSubmitted = true;

    let score = 0;
    quizQuestions.forEach((q) => {
      const userAnswer = quizAnswers[q.id];
      const buttons = document.querySelectorAll(`[onclick*="selectAnswer(${q.id}"]`);

      buttons.forEach((btn) => {
        const isCorrect = btn.textContent.includes(q.correct);
        const isSelected = btn.textContent.includes(userAnswer);

        if (isCorrect) {
          btn.classList.add("correct");
          btn.classList.remove("selected");
        } else if (isSelected && !isCorrect) {
          btn.classList.add("incorrect");
          btn.classList.remove("selected");
        }
      });

      if (userAnswer === q.correct) score++;
    });

    const percentage = Math.round((score / quizQuestions.length) * 100);

    let message = "";
    if (percentage === 100) {
      message = "Perfect infiltration! You're a true Metal Gear operative.";
    } else if (percentage >= 80) {
      message = "Excellent work, soldier. You know your lore.";
    } else if (percentage >= 60) {
      message = "Good effort. Study the intel more carefully.";
    } else {
      message = "Mission failed. Try again.";
    }

    const resultsContainer = document.getElementById("quizResults");
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <p class="results-label">Your Score</p>
        <p class="results-score">${score}/${quizQuestions.length}</p>
        <p class="results-message">${message}</p>
        <button class="retake-btn" onclick="retakeQuiz()">Retake Quiz</button>
      `;
      resultsContainer.style.display = "block";
    }

    const submitBtnAlt = document.getElementById("submitBtn");
    if (submitBtnAlt) submitBtnAlt.style.display = "none";
  }

  function retakeQuiz() {
    quizAnswers = {};
    quizSubmitted = false;
    const resultsContainer = document.getElementById("quizResults");
    if (resultsContainer) resultsContainer.style.display = "none";
    const submitBtnAlt = document.getElementById("submitBtn");
    if (submitBtnAlt) submitBtnAlt.style.display = "block";
    initQuiz();
    updateSubmitButton();
  }

  // Make quiz functions globally available
  window.selectAnswer = selectAnswer;
  window.submitQuizAlt = submitQuizAlt;
  window.retakeQuiz = retakeQuiz;

  // Initialize dynamic components
  renderTimeline();
  initGlossary();
  initQuiz();
  updateSubmitButton();

  // Update year if element exists
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

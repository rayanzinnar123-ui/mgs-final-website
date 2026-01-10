// ===== TIMELINE TOGGLE =====
document.querySelectorAll('.timeline-toggle-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const view = e.target.dataset.view;
    
    document.querySelectorAll('.timeline-toggle-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    document.querySelectorAll('.timeline-set').forEach(set => {
      set.style.display = set.dataset.view === view ? 'block' : 'none';
    });
  });
});

// ===== CHARACTER CAROUSEL =====
let currentCharIndex = 0;
const characters = document.querySelectorAll('.character-card');
const totalChars = characters.length;

const showCharacter = (index) => {
  characters.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
};

document.getElementById('nextBtn')?.addEventListener('click', () => {
  currentCharIndex = (currentCharIndex + 1) % totalChars;
  showCharacter(currentCharIndex);
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
  currentCharIndex = (currentCharIndex - 1 + totalChars) % totalChars;
  showCharacter(currentCharIndex);
});

showCharacter(0);

// ===== GLOSSARY TOGGLE =====
window.toggleGlossary = (header) => {
  const item = header.closest('.glossary-item');
  const content = item?.querySelector('.glossary-content');
  const icon = header.querySelector('.toggle-icon');

  document.querySelectorAll('.glossary-item').forEach(it => {
    if (it !== item) {
      it.querySelector('.glossary-content')?.classList.remove('open');
      const ic = it.querySelector('.toggle-icon');
      if (ic) ic.textContent = '+';
    }
  });

  if (content) {
    content.classList.toggle('open');
    if (icon) icon.textContent = content.classList.contains('open') ? '−' : '+';
  }
};

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle?.addEventListener('click', () => navMenu?.classList.toggle('active'));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu?.classList.remove('active'));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
    navMenu?.classList.remove('active');
  });
});

// ===== QUIZ LOGIC =====
let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const totalQuestions = questions.length;
const correctAnswers = { q0: 'a', q1: 'b', q2: 'd', q3: 'b', q4: 'd' };

const showQuestion = (index) => {
  questions.forEach((q, i) => q.classList.toggle('active', i === index));
  
  const questionNumberEl = document.getElementById('questionNumber');
  if (questionNumberEl) questionNumberEl.textContent = `Question ${index + 1} of ${totalQuestions}`;

  const progressFill = document.getElementById('progressFill');
  if (progressFill) progressFill.style.width = ((index + 1) / totalQuestions) * 100 + '%';

  const prevQBtn = document.getElementById('prevQuizBtn');
  const nextQBtn = document.getElementById('nextQuizBtn');
  const submitBtn = document.getElementById('submitQuizBtn');

  if (prevQBtn) prevQBtn.disabled = index === 0;
  if (nextQBtn) nextQBtn.style.display = index === totalQuestions - 1 ? 'none' : 'block';
  if (submitBtn) submitBtn.style.display = index === totalQuestions - 1 ? 'block' : 'none';
};

document.getElementById('nextQuizBtn')?.addEventListener('click', () => {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }
});

document.getElementById('prevQuizBtn')?.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
});

document.getElementById('submitQuizBtn')?.addEventListener('click', () => {
  let score = 0;
  for (let i = 0; i < totalQuestions; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected?.value === correctAnswers[`q${i}`]) score++;
  }
  
  const percentage = Math.round((score / totalQuestions) * 100);
  const resultDiv = document.getElementById('quizResult');
  if (resultDiv) {
    resultDiv.innerHTML = `<div class="quiz-score"><strong>Your Score: ${score}/${totalQuestions} (${percentage}%)</strong></div>`;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  }
});

showQuestion(0);

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.style.display = 'none';
});

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
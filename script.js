// ===== TIMELINE TOGGLE =====
document.querySelectorAll('.timeline-toggle-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    const view = e.target.dataset.view;
    
    document.querySelectorAll('.timeline-toggle-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    e.target.classList.add('active');
    
    document.querySelectorAll('.timeline-set').forEach(function(set) {
      set.style.display = set.dataset.view === view ? 'block' : 'none';
    });
  });
});

// ===== CHARACTER CAROUSEL =====
let currentCharIndex = 0;
const characters = document.querySelectorAll('.character-card');
const totalChars = characters.length;

function showCharacter(index) {
  characters.forEach(function(card, i) {
    if (i === index) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

const nextBtn = document.getElementById('nextBtn');
if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    currentCharIndex = (currentCharIndex + 1) % totalChars;
    showCharacter(currentCharIndex);
  });
}

const prevBtn = document.getElementById('prevBtn');
if (prevBtn) {
  prevBtn.addEventListener('click', function() {
    currentCharIndex = (currentCharIndex - 1 + totalChars) % totalChars;
    showCharacter(currentCharIndex);
  });
}

showCharacter(0);

// ===== GLOSSARY TOGGLE =====
window.toggleGlossary = function(header) {
  const item = header.closest('.glossary-item');
  const content = item.querySelector('.glossary-content');
  const icon = header.querySelector('.toggle-icon');

  document.querySelectorAll('.glossary-item').forEach(function(it) {
    if (it !== item) {
      const contentEl = it.querySelector('.glossary-content');
      if (contentEl) {
        contentEl.classList.remove('open');
      }
      const ic = it.querySelector('.toggle-icon');
      if (ic) {
        ic.textContent = '+';
      }
    }
  });

  if (content) {
    content.classList.toggle('open');
    if (icon) {
      icon.textContent = content.classList.contains('open') ? '−' : '+';
    }
  }
};

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', function() {
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// ===== QUIZ LOGIC =====
let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const totalQuestions = questions.length;
const correctAnswers = { q0: 'a', q1: 'b', q2: 'd', q3: 'b', q4: 'd' };

function showQuestion(index) {
  questions.forEach(function(q, i) {
    if (i === index) {
      q.classList.add('active');
    } else {
      q.classList.remove('active');
    }
  });
  
  const questionNumberEl = document.getElementById('questionNumber');
  if (questionNumberEl) {
    questionNumberEl.textContent = 'Question ' + (index + 1) + ' of ' + totalQuestions;
  }

  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = ((index + 1) / totalQuestions) * 100 + '%';
  }

  const prevQBtn = document.getElementById('prevQuizBtn');
  const nextQBtn = document.getElementById('nextQuizBtn');
  const submitBtn = document.getElementById('submitQuizBtn');

  if (prevQBtn) {
    prevQBtn.disabled = index === 0;
  }
  if (nextQBtn) {
    nextQBtn.style.display = index === totalQuestions - 1 ? 'none' : 'block';
  }
  if (submitBtn) {
    submitBtn.style.display = index === totalQuestions - 1 ? 'block' : 'none';
  }
}

const nextQuizBtn = document.getElementById('nextQuizBtn');
if (nextQuizBtn) {
  nextQuizBtn.addEventListener('click', function() {
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++;
      showQuestion(currentQuestionIndex);
    }
  });
}

const prevQuizBtn = document.getElementById('prevQuizBtn');
if (prevQuizBtn) {
  prevQuizBtn.addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion(currentQuestionIndex);
    }
  });
}

const submitQuizBtn = document.getElementById('submitQuizBtn');
if (submitQuizBtn) {
  submitQuizBtn.addEventListener('click', function() {
    let score = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const selected = document.querySelector('input[name="q' + i + '"]:checked');
      if (selected && selected.value === correctAnswers['q' + i]) {
        score++;
      }
    }
    
    const percentage = Math.round((score / totalQuestions) * 100);
    const resultDiv = document.getElementById('quizResult');
    if (resultDiv) {
      resultDiv.innerHTML = '<div class="quiz-score"><strong>Your Score: ' + score + '/' + totalQuestions + ' (' + percentage + '%)</strong></div>';
      resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

showQuestion(0);

// ===== PRELOADER =====
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});
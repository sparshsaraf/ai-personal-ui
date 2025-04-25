// --- Data Definitions ---
const categories = {
  News: ['International', 'National - India', 'Politics', 'Geography'],
  Sports: ['Badminton', 'Basketball', 'Cricket', 'Football'],
  Entertainment: ['Movies', 'Music', 'TV Shows'],
  Gaming: ['Action', 'Strategy', 'Puzzle', 'Simulation'],
  Academics: ['Tech', 'Science', 'Mathematics', 'History']
};

const moodMap = {
  News: 'curious today',
  Sports: 'passing time',
  Entertainment: 'relaxed today',
  Gaming: 'lazy vibes',
  Academics: 'productive vibes'
};

const contentData = {
  'International': {
    title: 'Global Affairs Update',
    body: 'Stay informed on geopolitics, global markets, and cross-border developments shaping our world today.'
  },
  'National - India': {
    title: 'Inside India Today',
    body: 'From policy changes to cultural festivals, dive deep into the stories driving India’s progress.'
  },
  'Politics': {
    title: 'Political Spotlight',
    body: 'Analysis of the latest elections, debates, and leadership shifts around the globe.'
  },
  'Badminton': {
    title: 'Badminton Highlights',
    body: 'Recap thrilling matches, rising stars, and pro techniques from the badminton court.'
  },
  // You can add more static fallbacks if needed
};

const subtopicUrls = {
  'International': 'https://www.bbc.com/news/world',
  'National - India': 'https://www.ndtv.com/',
  'Politics': 'https://www.politico.com/',
  'Badminton': 'https://www.bbc.com/sport/badminton',
  'Basketball': 'https://www.nba.com/',
  'Cricket': 'https://www.espncricinfo.com/',
  'Football': 'https://www.goal.com/',
  'Movies': 'https://www.imdb.com/',
  'Music': 'https://www.spotify.com/',
  'TV Shows': 'https://www.netflix.com/',
  'Action': 'https://www.giantbomb.com/',
  'Strategy': 'https://www.pcgamer.com/',
  'Puzzle': 'https://www.puzzle-nonstop.com/',
  'Simulation': 'https://www.simscommunity.info/',
  'Tech': 'https://techcrunch.com/',
  'Science': 'https://www.scientificamerican.com/',
  'Mathematics': 'https://www.khanacademy.org/math',
  'History': 'https://www.history.com/'
};

// --- DOM References ---
const greeting = document.getElementById('greeting');
const themeToggle = document.getElementById('themeToggle');
const contentContainer = document.getElementById('contentContainer');
const recList = document.getElementById('recList');
const contentDetail = document.getElementById('contentDetail');
const moodMessage = document.getElementById('moodMessage');

// --- Helpers ---
function getTimeGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

let clickCounts = {};
function updateMood() {
  const top = Object.entries(clickCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  if (top) moodMessage.textContent = `You seem ${moodMap[top]}.`;
}

function clearRecommendations() {
  recList.innerHTML = '';
  contentDetail.style.display = 'none';
}

// --- Renderers ---
function renderCategories() {
  contentContainer.innerHTML = '';
  Object.keys(categories).forEach(cat => {
    clickCounts[cat] = 0;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h2>${cat}</h2>`;
    card.addEventListener('click', () => expandCategory(cat, card));
    contentContainer.appendChild(card);
  });
}

function expandCategory(cat, cardEl) {
  // collapse others
  document.querySelectorAll('.card.active').forEach(c => {
    c.classList.remove('active');
    c.querySelector('.subtopics')?.remove();
  });
  clearRecommendations();

  // expand this
  cardEl.classList.add('active');
  const subDiv = document.createElement('div');
  subDiv.className = 'subtopics';
  categories[cat].forEach(sub => {
    const btn = document.createElement('button');
    btn.className = 'subtopic-button';
    btn.textContent = sub;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSubtopic(cat, sub);
    });
    subDiv.appendChild(btn);
  });
  cardEl.appendChild(subDiv);
}

// ✅ UPDATED TO CALL showContent()
function selectSubtopic(cat, sub) {
  clickCounts[cat] = (clickCounts[cat] || 0) + 1;
  updateMood();
  clearRecommendations();

  // Load AI-generated summary
  showContent(sub);

  // Show external read more link
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = `Read More on ${sub}`;
  btn.addEventListener('click', () => {
    window.open(subtopicUrls[sub] || '#', '_blank');
  });
  li.appendChild(btn);
  recList.appendChild(li);
}

// ✅ AI-INTEGRATED showContent()
async function showContent(sub) {
  contentDetail.innerHTML = `<p>Loading smart content on ${sub}...</p>`;
  contentDetail.style.display = 'block';

  try {
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subtopic: sub })
    });

    const data = await res.json();
    contentDetail.innerHTML = `<h2>${sub}</h2><p>${data.summary}</p>`;
  } catch (e) {
    contentDetail.innerHTML = `<h2>${sub}</h2><p>Couldn't load AI content. Try again later.</p>`;
  }
}

// --- Theme Management ---
function toggleTheme() {
  const dark = document.body.classList.toggle('dark');
  document.body.classList.toggle('light', !dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// --- Init ---
function init() {
  greeting.textContent = `${getTimeGreeting()}, User!`;
  moodMessage.textContent = '';

  const saved = localStorage.getItem('theme');
  if (saved) document.body.classList.add(saved);
  else document.body.classList.add(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  themeToggle.addEventListener('click', toggleTheme);
  renderCategories();
}

window.addEventListener('DOMContentLoaded', init);

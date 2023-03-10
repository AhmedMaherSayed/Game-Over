let toggleBtn = document.getElementById('toggle-btn');
let nav = document.getElementById('nav');
let links = document.getElementById('links');
let allLinks = document.querySelectorAll('#links > li');
let cardsContainer = document.getElementById('cards-container');
let gameInfo = document.getElementById('game-info');
let appBody = document.getElementById('app-body');

let currentSection = 'mmorpg';

toggleBtn.addEventListener('click', function () {
  setTimeout(() => {
    nav.classList.toggle('height');
  }, 300);
  setTimeout(() => {
    links.classList.toggle('show');
  }, 600);
});

async function getDataFromAPI(currentSection) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bac7bc1881mshe55ab29b61d2f6bp10610ajsnd0f02d7526cc',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };

  let response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${currentSection}`,
    options,
  );
  let data = await response.json();

  displayData(data);
}

getDataFromAPI(currentSection);

function displayData(data) {
  cardsContainer.innerHTML = '';
  let finalData = data
    .map((the_data) => {
      return `
      <div onclick='getGameInfo(${the_data.id})'>
        <div class="image">
          <img src="${the_data.thumbnail}" alt="${the_data.title}">
        </div>
        <div class="info">
          <div class="info-head">
            <h4>${the_data.title}</h4>
            <span>free</span>
          </div>
          <p>${the_data.short_description}</p>
          <div class="info-footer">
            <span>${the_data.genre}</span>
            <span>${the_data.platform}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  cardsContainer.innerHTML += finalData;
}

async function getGameInfo(id) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bac7bc1881mshe55ab29b61d2f6bp10610ajsnd0f02d7526cc',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };

  let response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options,
  );
  let data = await response.json();
  displayGameInfo(data);
}

function toggleDisplayClass() {
  appBody.style.display = 'none';
  gameInfo.style.display = 'block';
}

function displayGameInfo(data) {
  toggleDisplayClass();
  gameInfo.innerHTML = `
    <span class="close-btn" onclick='handelClosePage()'>
      <i class="fa-solid fa-xmark"></i>
    </span>
    <div class="container">
      <h2>Details Game</h2>
      <div class="game-info-content">
        <div class="image">
          <img src="${data.thumbnail}" alt="${data.title}">
        </div>
        <div class="details">
          <ul>
            <li>Title: ${data.title}</li>
            <li>Category: <span>${data.genre}</span></li>
            <li>Platform: <span>${data.platform}</span></li>
            <li>Status: <span>${data.status}</span></li>
          </ul>
          <p>${data.description}.</p>
          <button>Show Game</button>
        </div>
        </div>
    </div>
  `;
}

function handelClosePage() {
  appBody.style.display = 'block';
  gameInfo.style.display = 'none';
}

function addAndRemoveActive() {
  allLinks.forEach((link) => {
    link.classList.remove('active');
  });
}

allLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    addAndRemoveActive();
    link.classList.add('active');
    getDataFromAPI(e.target.dataset.section);
  });
});

console.log("games.js is loaded");

const APIKEY = '6b7af02f8fb04980b9cfb9899532b753';
const API_URL = `https://api.rawg.io/api/games?key=${APIKEY}`;

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
}

function getRandomGame(games) {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}

function callAPI() {
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(json => {
      const games = json.results;
      if (!games || games.length === 0) {
        throw new Error('No games found in the API response');
      }
      const randomGame = getRandomGame(games);

      document.querySelector("#game_title").innerHTML = randomGame.name || "Game title not available";
      document.querySelector("#game_platform").innerHTML = randomGame.platforms
        ? randomGame.platforms.map(platform => platform.platform.name).join(', ')
        : "Platform information not available";
      document.querySelector("#game_release").innerHTML = randomGame.released || "Release date not available";
      document.querySelector("#game_rating").innerHTML = randomGame.rating || "Rating not available";
      document.querySelector("#game_cover").innerHTML = randomGame.background_image
        ? `<img src="${randomGame.background_image}" alt="Cover Image" />`
        : "N/A";
    })
    .catch(error => console.error('Error fetching the API:', error));
}
document.addEventListener("DOMContentLoaded", () => {
  const randomGameButton = document.querySelector("#randomGameButton");

  randomGameButton.addEventListener("click", () => {
    callAPI();
  });
});

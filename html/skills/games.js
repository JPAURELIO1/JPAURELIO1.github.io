console.log("games.js is loaded");
const API_URL = 'https://api.rawg.io/api/games?key=6b7af02f8fb04980b9cfb9899532b753';

function getRandomGame(games) {
  const randomIndex = Math.floor(Math.random() * games.length);
  return games[randomIndex];
}

function callAPI() {
  fetch(API_URL)
    .then(response => response.json())
    .then(json => {
     
      const randomGame = getRandomGame(json.results);

 
      document.querySelector("#game_title").innerHTML = randomGame.name || 'N/A';
      document.querySelector("#game_platform").innerHTML = randomGame.platforms?.map(platform => platform.platform.name).join(', ') || 'N/A';
      document.querySelector("#game_release").innerHTML = randomGame.released || 'N/A';
      document.querySelector("#game_description").innerHTML = randomGame.description_raw || 'N/A';
      document.querySelector("#game_rating").innerHTML = randomGame.rating || 'N/A';
      document.querySelector("#game_cover").innerHTML = randomGame.background_image ? `<img src="${randomGame.background_image}" alt="Cover Image" />` : 'N/A';
    })
    .catch(error => console.error('Error fetching the API:', error));
}
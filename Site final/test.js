// Toggle dark mode
document.getElementById("modeSombre").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Apply the saved theme on page load
window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    displayFavorites(); // Display favorites on page load
}

// Generate jokes
function generateJoke() {
    var type = document.getElementById("Type").value;
    if (type == "none") {
        type = Math.floor(Math.random() * 30);
        if (type >= 0 && type < 10) {
            type = "dev";
        } else if (type >= 10 && type < 20) {
            type = "dark";
        } else {
            type = "global";
        }
    }

    fetch('https://www.blagues-api.fr/api/type/' + type + '/random', {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg3MzQ5NzY5NTk2Njk4NjQzIiwibGltaXQiOjEwMCwia2V5IjoiWHZIZTVRbEJuRHYzcDBoeVlKQU9ldUU4TmZ0Y2lBSmJONElRR1lXbmtWNEhtb1A5dzQiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xOFQxMjo1MToyNyswMDowMCIsImlhdCI6MTc0MjMwMjI4N30.HG3q3Xc5eofHGrz4Jv3DPh6rxA3-3RyakicCFQt4o30`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.joke && data.answer) {
            document.getElementById('type').textContent = data.type;
            document.getElementById('joke').textContent = data.joke;
            document.getElementById('answer').textContent = data.answer;
        } else {
            console.error('Données incorrectes reçues', data);
        }
    })
    .catch(error => console.error("Erreur lors de la récupération de la blague", error));
}

// Open/Close joke explanation dialog
const dialog = document.querySelector("#rep");
const showButton = document.querySelector("#repOpenBoutton");
const closeButton = document.querySelector("#repCloseBoutton");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// Open/Close joke type description dialog
const descDialog = document.querySelector("#desc");
const descShowButton = document.querySelector("#descOpenBoutton");
const descCloseButton = document.querySelector("#descCloseBoutton");

descShowButton.addEventListener("click", () => {
  descDialog.showModal();
});

descCloseButton.addEventListener("click", () => {
  descDialog.close();
});

// Add joke to favorites
function addToFavorites() {
    const joke = document.getElementById('joke').textContent;
    const type = document.getElementById('type').textContent;
    const answer = document.getElementById('answer').textContent;

    const favoriteJoke = { joke, type, answer };
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(favoriteJoke);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    displayFavorites();
}

// Display favorite jokes
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favContainer = document.querySelector('.fav');
    favContainer.innerHTML = '';

    favorites.forEach((fav, index) => {
        const favElement = document.createElement('div');
        favElement.classList.add('favorite-joke');
        favElement.innerHTML = `
            <div class='cont'>
            <p>Type: ${fav.type}</p>
            <h3>${fav.joke}</h3>
            <p>Réponse: ${fav.answer}</p>
            <button onclick="removeFavorite(${index})">Supprimer</button>
            </div>
        `;
        favContainer.appendChild(favElement);
    });
}

// Remove joke from favorites
function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}



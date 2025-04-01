// Toggle dark mode (active ou désactive le mode sombre)
document.getElementById("modeSombre").addEventListener("click", function() {
    // Ajoute ou retire la classe "dark-mode" sur le corps de la page
    document.body.classList.toggle("dark-mode");

    // Enregistre la préférence du thème dans le localStorage
    // Si "dark-mode" est activé, il enregistre "dark", sinon "light"
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Applique le thème enregistré lors du chargement de la page
window.onload = function() {
    // Si le thème enregistré est "dark", on active le mode sombre
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
    
    // Affiche les blagues favorites au chargement de la page
    displayFavorites();
}

// Génère une blague selon le type sélectionné
function generateJoke() {
    // Récupère la valeur sélectionnée pour le type de blague
    var type = document.getElementById("Type").value;

    // Si aucun type n'est sélectionné, choisit un type aléatoire
    if (type == "none") {
        type = Math.floor(Math.random() * 30);

        // Attribue un type selon l'intervalle numérique
        if (type >= 0 && type < 10) {
            type = "dev"; // Blague de développeur
        } else if (type >= 10 && type < 20) {
            type = "dark"; // Blague sombre
        } else {
            type = "global"; // Blague globale
        }
    }

    // Envoie une requête à l'API pour récupérer une blague aléatoire du type spécifié
    fetch('https://www.blagues-api.fr/api/type/' + type + '/random', {
        headers: {
            // En-têtes de la requête avec le token d'authentification
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg3MzQ5NzY5NTk2Njk4NjQzIiwibGltaXQiOjEwMCwia2V5IjoiWHZIZTVRbEJuRHYzcDBoeVlKQU9ldUU4TmZ0Y2lBSmJONElRR1lXbmtWNEhtb1A5dzQiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xOFQxMjo1MToyNyswMDowMCIsImlhdCI6MTc0MjMwMjI4N30.HG3q3Xc5eofHGrz4Jv3DPh6rxA3-3RyakicCFQt4o30`
        }
    })
    .then(response => response.json()) // Convertit la réponse en format JSON
    .then(data => {
        // Si des données valides sont reçues (blague et réponse), on les affiche
        if (data.joke && data.answer) {
            document.getElementById('type').textContent = data.type;
            document.getElementById('joke').textContent = data.joke;
            document.getElementById('answer').textContent = data.answer;
        } else {
            // Si les données sont incorrectes, on affiche un message d'erreur
            console.error('Données incorrectes reçues', data);
        }
    })
    .catch(error => console.error("Erreur lors de la récupération de la blague", error)); // Gestion des erreurs
}

// Ouvrir/fermer le dialogue d'explication de la blague
const dialog = document.querySelector("#rep");
const showButton = document.querySelector("#repOpenBoutton");
const closeButton = document.querySelector("#repCloseBoutton");

// Affiche le dialogue d'explication lors du clic sur le bouton "Ouvrir"
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// Ferme le dialogue d'explication lors du clic sur le bouton "Fermer"
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Ouvrir/fermer le dialogue de description du type de blague
const descDialog = document.querySelector("#desc");
const descShowButton = document.querySelector("#descOpenBoutton");
const descCloseButton = document.querySelector("#descCloseBoutton");

// Affiche le dialogue de description lors du clic sur le bouton "Ouvrir"
descShowButton.addEventListener("click", () => {
  descDialog.showModal();
});

// Ferme le dialogue de description lors du clic sur le bouton "Fermer"
descCloseButton.addEventListener("click", () => {
  descDialog.close();
});

// Ajoute la blague aux favoris
function addToFavorites() {
    // Récupère le texte de la blague, du type et de la réponse
    const joke = document.getElementById('joke').textContent;
    const type = document.getElementById('type').textContent;
    const answer = document.getElementById('answer').textContent;

    // Crée un objet représentant la blague favorite
    const favoriteJoke = { joke, type, answer };

    // Récupère les favoris existants ou crée un tableau vide
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Ajoute la nouvelle blague aux favoris
    favorites.push(favoriteJoke);

    // Enregistre les favoris dans le localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Affiche à jour les favoris
    displayFavorites();
}

// Affiche les blagues favorites
function displayFavorites() {
    // Récupère les favoris enregistrés dans le localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Sélectionne le conteneur où afficher les favoris
    const favContainer = document.querySelector('.fav');
    favContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter les nouveaux éléments

    // Pour chaque blague favorite, crée un élément HTML et l'ajoute au conteneur
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

// Supprime une blague des favoris
function removeFavorite(index) {
    // Récupère les favoris actuels
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Supprime la blague à l'index spécifié
    favorites.splice(index, 1);

    // Enregistre les favoris modifiés dans le localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Met à jour l'affichage des favoris
    displayFavorites();
}

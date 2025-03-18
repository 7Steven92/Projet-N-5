// Génération des blagues.
fetch('https://www.blagues-api.fr/api/random', {
    headers: {
      'Authorization': ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg3MzQ5NzY5NTk2Njk4NjQzIiwibGltaXQiOjEwMCwia2V5IjoiWHZIZTVRbEJuRHYzcDBoeVlKQU9ldUU4TmZ0Y2lBSmJONElRR1lXbmtWNEhtb1A5dzQiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xOFQxMjo1MToyNyswMDowMCIsImlhdCI6MTc0MjMwMjI4N30.HG3q3Xc5eofHGrz4Jv3DPh6rxA3-3RyakicCFQt4o30 `
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);

    if (data.joke && data.answer){
        document.getElementById('type').textContent = data.type;
        document.getElementById('joke').textContent = data.joke;
        document.getElementById('answer').textContent = data.answer;
    }
    else {
        console.error('Données incorrectes reçues', data);
    }
})
.catch (error => console.error("Erreur lors de la récupération de la blague", error));
  

  

Questions = [
    "Comment appelle-t-on un choux qui vit sous l'eau ?",
    "Comment appelle-t-on un hamster qui vit dans la lune ?",

]
Reponses = [
    "Un choux marin",
    "un hamsteroid",

]

// Modifier directement le contenu de la page web.
function bouton() {
    var citationOuBlague, description;

    citationOuBlague = "citation ou blague"; //Citation ou blague générer;
    document.getElementById("citation/blague").innerHTML = citationOuBlague;

    description = "Déscription de la citation ou blague"; //Déscription de la citation ou blague
    document.getElementById("description").innerHTML = description; 
}

// Ouverture/Fermeture de la déscription.
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

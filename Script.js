// Modifier directement le contenu de la page web.
var citationOuBlague, description;

citationOuBlague = "citation ou blague"; //Citation ou blague générer
document.getElementById("citation/blague").innerHTML = citationOuBlague;

description = "Déscription de la citation ou blague"; //Déscription de la citation ou blague
document.getElementById("description").innerHTML = description;


// Ouverture/Fermeture de la déscription.
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("ouvrir");
const closeButton = document.querySelector("fermer");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

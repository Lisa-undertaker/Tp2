// Initialisation
let bibliotheque = [];

/**
 @param {Object} livre 
 */
function ajouterLivre(livre) {
    bibliotheque.push(livre);
    console.log(`Livre ajouté : ${livre.title} par ${livre.author}`);
}

/**
  Affiche les livres non empruntés
 */
function listerLivresDisponibles() {
    console.log("--- Livres disponibles ---");
    const disponibles = bibliotheque.filter(livre => !livre.borrowed);
    if (disponibles.length === 0) {
        console.log("Aucun livre disponible.");
    } else {
        disponibles.forEach(livre => {
            console.log(`Titre: ${livre.title}, Auteur: ${livre.author}, Année: ${livre.publicationYear}`);
        });
    }
}

/**
 Recherche un livre par titre exact.
 @param {string} titre 
 @returns {Object|null} 
 */
function rechercherParTitre(titre) {
    const livre = bibliotheque.find(l => l.title === titre);
    if (livre) {
        console.log(`Livre trouvé : ${livre.title}, Auteur: ${livre.author}, Emprunté: ${livre.borrowed}`);
        return livre;
    } else {
        console.log("Aucun livre trouvé avec ce titre.");
        return null;
    }
}

/**
 Marque un livre comme emprunté si disponible.
 @param {string} titre 
 */
function emprunterLivre(titre) {
    const livre = rechercherParTitre(titre);
    if (livre) {
        if (!livre.borrowed) {
            livre.borrowed = true;
            console.log(`Livre "${titre}" emprunté avec succès.`);
        } else {
            console.log(`Le livre "${titre}" est déjà emprunté.`);
        }
    }
}

/**
 Retourne un livre (le marque comme non emprunté).
 @param {string} titre 
 */
function retournerLivre(titre) {
    const livre = rechercherParTitre(titre);
    if (livre) {
        if (livre.borrowed) {
            livre.borrowed = false;
            console.log(`Livre "${titre}" retourné avec succès.`);
        } else {
            console.log(`Le livre "${titre}" n'était pas emprunté.`);
        }
    }
}

/**
 * Recherche des livres par auteur et/ou année (bonus).
 * @param {object} criteres 
 * @returns {Array} 
 */
function rechercherLivresAvancee(criteres) {
    console.log("\n--- Recherche avancée ---");
    let resultats = bibliotheque.filter(livre => {
        let correspond = true;
        if (criteres.author && livre.author !== criteres.author) {
            correspond = false;
        }
        if (criteres.publicationYear && livre.publicationYear !== criteres.publicationYear) {
            correspond = false;
        }
        return correspond;
    });

    if (resultats.length > 0) {
        console.log("Livres trouvés :");
        resultats.forEach(livre => {
            console.log(`Titre: ${livre.title}, Auteur: ${livre.author}, Année: ${livre.publicationYear}`);
        });
    } else {
        console.log("Aucun livre ne correspond aux critères de recherche.");
    }

    return resultats;
}

const livre = bibliotheque.find(l => l.title.toLowerCase() === titre.toLowerCase());


/*=--------------------------------------
 🎯 Exemples d'utilisation
--------------------------------------*/

ajouterLivre({ title: "1984", author: "George Orwell", publicationYear: 1949, borrowed: false });
ajouterLivre({ title: "Le Seigneur des Anneaux", author: "J.R.R. Tolkien", publicationYear: 1954, borrowed: false });
ajouterLivre({ title: "Orgueil et Préjugés", author: "Jane Austen", publicationYear: 1813, borrowed: true });

listerLivresDisponibles();

rechercherParTitre("1984");
emprunterLivre("1984");
emprunterLivre("1984"); // déjà emprunté
retournerLivre("1984");

rechercherLivresAvancee({ author: "J.R.R. Tolkien" });
rechercherLivresAvancee({ publicationYear: 1949 });
rechercherLivresAvancee({ author: "Jane Austen", publicationYear: 1813 });
rechercherLivresAvancee({ author: "Inconnu" }); 

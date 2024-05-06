document.addEventListener('DOMContentLoaded', function () {
    const formulaireTache = document.getElementById('formulaireTache');
    const listeTaches = document.getElementById('listeTaches');

    formulaireTache.addEventListener('submit', function (event) {
        event.preventDefault();

        // Récupérer les valeurs des champs du formulaire
        const titre = document.getElementById('titre').value;
        const description = document.getElementById('description').value;
        const dateLimite = document.getElementById('dateLimite').value;
        const etat = document.getElementById('etat').value;
        const priorite = document.getElementById('priorite').value;

        // Créer un nouvel élément de tâche
        const elementTache = document.createElement('li');
        elementTache.innerHTML = `
            <p><strong>${titre}</strong></p>
            <p>${description}</p>
            <p>${dateLimite}</p>
            <p>${etat}</p>
            <p>${priorite}</p>
            <button class="supprimer"><ion-icon name="trash-outline"></ion-icon></button>
            <button class="modifier"><ion-icon name="create-outline"></ion-icon></button>
            <button class="barrer"><ion-icon name="checkmark-outline"></ion-icon></button>
        `;

        // Ajouter la tâche à la liste des tâches
        const taches = Array.from(listeTaches.children);
        const nouvelleTacheIndex = trouverIndexInsertion(taches, dateLimite);
        if (nouvelleTacheIndex === -1) {
            listeTaches.appendChild(elementTache);
        } else {
            listeTaches.insertBefore(elementTache, taches[nouvelleTacheIndex]);
        }

        // Effacer les champs du formulaire après soumission
        formulaireTache.reset();

        // Ajout des écouteurs d'événements pour les boutons de chaque tâche
        const boutonSupprimer = elementTache.querySelector('.supprimer');
        const boutonModifier = elementTache.querySelector('.modifier');
        const boutonBarrer = elementTache.querySelector('.barrer');

        // Suppression de la tâche
        boutonSupprimer.addEventListener('click', function () {
            elementTache.remove();
        });

        // Modification de la tâche
        boutonModifier.addEventListener('click', function () {
            remplirFormulaireModification(elementTache);
        });

        // Barrer une tâche
        boutonBarrer.addEventListener('click', function () {
            elementTache.classList.toggle('barrer-tache');
        });

    });

    // Fonction pour trouver l'index d'insertion pour une nouvelle tâche
    function trouverIndexInsertion(taches, dateLimiteNouvelleTache) {
        for (let i = 0; i < taches.length; i++) {
            const dateLimiteTache = taches[i].querySelector('p:nth-child(3)').textContent.trim();
            if (dateLimiteNouvelleTache < dateLimiteTache) {
                return i;
            }
        }
        return -1; // Insérer à la fin
    }

    // Fonction pour remplir le formulaire de modification avec les détails de la tâche
    function remplirFormulaireModification(tache) {
        const titre = tache.querySelector('p:nth-child(1) strong').textContent;
        const description = tache.querySelector('p:nth-child(2)').textContent;
        const dateLimite = tache.querySelector('p:nth-child(3)').textContent;
        const etat = tache.querySelector('p:nth-child(4)').textContent;
        const priorite = tache.querySelector('p:nth-child(5)').textContent;

        // Remplir le formulaire de modification avec les détails de la tâche
        document.getElementById('titreModif').value = titre;
        document.getElementById('descriptionModif').value = description;
        document.getElementById('dateLimiteModif').value = dateLimite;
        document.getElementById('etatModif').value = etat;
        document.getElementById('prioriteModif').value = priorite;

        // Afficher le formulaire de modification
        document.getElementById('formulaireModification').style.display = 'block';
    }
});

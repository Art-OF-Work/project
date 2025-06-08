// Fichier JavaScript principal pour le Tableau de Bord Patient

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Initialize page-specific functions based on current page
    const currentPage = getCurrentPage();
    
    if (currentPage === 'medical-results') {
        initializeMedicalResultsPage();
    } else if (currentPage === 'my-appointments') {
        initializeAppointmentsPage();
    } else if (currentPage === 'book-appointment') {
        initializeBookAppointmentPage();
    } else if (currentPage === 'account-settings') {
        initializeAccountSettingsPage();
    }
});

function initializeDashboard() {
    // Ajouter des écouteurs d'événements pour les boutons
    addButtonEventListeners();
    
    // Simuler le chargement des données (dans une vraie application, cela serait récupéré depuis une API)
    simulateDataLoading();
}

function addButtonEventListeners() {
    // Bouton de déconnexion
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Dans une vraie application, cela gérerait la logique de déconnexion
            alert('Déconnexion en cours...');
            // Redirection vers la page de connexion
            // window.location.href = 'login.html';
        });
    }
    
    // Bouton pour voir les détails du rendez-vous
    const viewDetailsBtn = document.querySelector('.view-details-btn');
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', function() {
            // Dans une vraie application, cela naviguerait vers les détails du rendez-vous
            window.location.href = 'my-appointments.html';
        });
    }
    
    // Bouton pour voir les résultats médicaux
    const viewResultBtn = document.querySelector('.view-result-btn');
    if (viewResultBtn) {
        viewResultBtn.addEventListener('click', function() {
            // Dans une vraie application, cela naviguerait vers le résultat spécifique
            window.location.href = 'medical-results.html';
        });
    }
    
    // Bouton pour voir toutes les notifications
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // Dans une vraie application, cela afficherait toutes les notifications
            alert('Affichage de toutes les notifications...');
        });
    }
}

function simulateDataLoading() {
    // Dans une vraie application, cela récupérerait les données depuis une API
    console.log('Données du tableau de bord chargées avec succès');
}

// Gérer le basculement de la barre latérale responsive
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        mainContent.style.marginLeft = '250px';
    } else {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '70px';
    }
}

// Fonction pour déterminer la page actuelle
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    if (page === 'medical-results.html') {
        return 'medical-results';
    } else if (page === 'my-appointments.html') {
        return 'my-appointments';
    } else if (page === 'book-appointment.html') {
        return 'book-appointment';
    } else if (page === 'account-settings.html') {
        return 'account-settings';
    } else {
        return 'home';
    }
}

// Fonctions pour la page des résultats médicaux
function initializeMedicalResultsPage() {
    // Filtrage et recherche
    const searchInput = document.querySelector('.search-input');
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const resultItems = document.querySelectorAll('.result-item');
    const noResults = document.querySelector('.no-results');

    if (searchInput && typeFilter && statusFilter) {
        // Fonction de filtrage des résultats
        function filterResults() {
            const searchTerm = searchInput.value.toLowerCase();
            const typeValue = typeFilter.value;
            const statusValue = statusFilter.value;
            
            let visibleCount = 0;
            
            resultItems.forEach(item => {
                const type = item.getAttribute('data-type');
                const status = item.getAttribute('data-status');
                const text = item.textContent.toLowerCase();
                
                const matchesSearch = searchTerm === '' || text.includes(searchTerm);
                const matchesType = typeValue === 'all' || type === typeValue;
                const matchesStatus = statusValue === 'all' || status === statusValue;
                
                if (matchesSearch && matchesType && matchesStatus) {
                    item.style.display = 'flex';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Afficher le message "Aucun résultat" si nécessaire
            if (visibleCount === 0 && noResults) {
                noResults.style.display = 'block';
            } else if (noResults) {
                noResults.style.display = 'none';
            }
        }
        
        // Ajouter les écouteurs d'événements pour le filtrage
        searchInput.addEventListener('input', filterResults);
        typeFilter.addEventListener('change', filterResults);
        statusFilter.addEventListener('change', filterResults);
    }
    
    // Gestion du modal de détails
    const modal = document.getElementById('resultModal');
    const downloadButtons = document.querySelectorAll('.download-btn:not(.disabled)');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && closeModal) {
        // Ouvrir le modal lors du clic sur le bouton de téléchargement
        downloadButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const resultId = this.getAttribute('data-result-id');
                
                // Dans une vraie application, cela téléchargerait le fichier
                // Pour cette démo, on affiche simplement le modal
                modal.style.display = 'flex';
            });
        });
        
        // Fermer le modal
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Fermer le modal en cliquant en dehors
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Fonctions pour la page des rendez-vous
function initializeAppointmentsPage() {
    // Filtrage des rendez-vous
    const filterButtons = document.querySelectorAll('.filter-btn');
    const appointmentItems = document.querySelectorAll('.appointment-item');
    
    if (filterButtons.length > 0 && appointmentItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Afficher/masquer les rendez-vous en fonction du filtre
                appointmentItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'table-row';
                    } else {
                        if (item.classList.contains(filter)) {
                            item.style.display = 'table-row';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Gestion des boutons d'annulation
        const cancelButtons = document.querySelectorAll('.cancel-btn');
        
        cancelButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
                    const row = this.closest('tr');
                    const statusCell = row.querySelector('.status');
                    
                    // Changer le statut à "Annulé"
                    statusCell.className = 'status status-cancelled';
                    statusCell.textContent = 'Annulé';
                    
                    // Supprimer le bouton d'annulation
                    this.remove();
                    
                    // Changer la classe pour le filtrage
                    row.className = 'appointment-item cancelled';
                    
                    // Réappliquer le filtre actif
                    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
                    if (activeFilter !== 'all' && activeFilter !== 'cancelled') {
                        row.style.display = 'none';
                    }
                    
                    alert('Rendez-vous annulé avec succès.');
                }
            });
        });
    }
}

// Fonctions pour la page de prise de rendez-vous
function initializeBookAppointmentPage() {
    // Initialisation du sélecteur de date si disponible
    if (typeof flatpickr !== 'undefined' && document.getElementById('appointment-date')) {
        flatpickr("#appointment-date", {
            minDate: "today",
            dateFormat: "d/m/Y",
            disable: [
                function(date) {
                    // Disable weekends
                    return (date.getDay() === 0 || date.getDay() === 6);
                }
            ],
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                    longhand: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
                },
                months: {
                    shorthand: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
                    longhand: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
                }
            }
        });
    }
}

// Fonctions pour la page des paramètres du compte
function initializeAccountSettingsPage() {
    // Bouton de modification du profil
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const profileForm = document.getElementById('profile-form');
    const formInputs = profileForm.querySelectorAll('input');
    const formActions = profileForm.querySelector('.form-actions');
    const cancelEditBtn = document.getElementById('cancel-edit');
    
    // Valeurs initiales des champs pour pouvoir annuler les modifications
    const initialValues = {};
    
    // Gestion du bouton de modification du profil
    if (editProfileBtn && profileForm) {
        editProfileBtn.addEventListener('click', function() {
            // Activer les champs de saisie
            formInputs.forEach(input => {
                initialValues[input.id] = input.value;
                input.disabled = false;
            });
            
            // Afficher les boutons d'action
            formActions.style.display = 'flex';
            
            // Cacher le bouton de modification
            editProfileBtn.style.display = 'none';
        });
    }
    
    // Gestion du bouton d'annulation
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            // Rétablir les valeurs initiales
            formInputs.forEach(input => {
                input.value = initialValues[input.id];
                input.disabled = true;
            });
            
            // Cacher les boutons d'action
            formActions.style.display = 'none';
            
            // Afficher le bouton de modification
            editProfileBtn.style.display = 'flex';
        });
    }
    
    // Gestion de la soumission du formulaire
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'enregistrement des données
            setTimeout(() => {
                alert('Vos informations ont été mises à jour avec succès.');
                
                // Désactiver les champs de saisie
                formInputs.forEach(input => {
                    input.disabled = true;
                });
                
                // Cacher les boutons d'action
                formActions.style.display = 'none';
                
                // Afficher le bouton de modification
                editProfileBtn.style.display = 'flex';
            }, 1000);
        });
    }
    
    // Gestion du bouton de suppression de compte
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const deleteAccountModal = document.getElementById('delete-account-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const confirmDeleteCheckbox = document.getElementById('confirm-delete');
    
    if (deleteAccountBtn && deleteAccountModal) {
        // Ouvrir la modal de suppression
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccountModal.style.display = 'flex';
        });
        
        // Fermer la modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                deleteAccountModal.style.display = 'none';
            });
        }
        
        // Annuler la suppression
        if (cancelDeleteBtn) {
            cancelDeleteBtn.addEventListener('click', function() {
                deleteAccountModal.style.display = 'none';
            });
        }
        
        // Activer/désactiver le bouton de confirmation
        if (confirmDeleteCheckbox && confirmDeleteBtn) {
            confirmDeleteCheckbox.addEventListener('change', function() {
                confirmDeleteBtn.disabled = !this.checked;
            });
        }
        
        // Confirmer la suppression
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', function() {
                const password = document.getElementById('delete-password').value;
                
                if (!password) {
                    alert('Veuillez entrer votre mot de passe pour confirmer la suppression.');
                    return;
                }
                
                // Simuler la suppression du compte
                setTimeout(() => {
                    alert('Votre compte a été supprimé avec succès. Vous allez être redirigé vers la page d\'accueil.');
                    // Dans une vraie application, rediriger vers la page d'accueil
                    window.location.href = 'index.html';
                }, 1000);
            });
        }
        
        // Fermer la modal si on clique en dehors
        window.addEventListener('click', function(event) {
            if (event.target === deleteAccountModal) {
                deleteAccountModal.style.display = 'none';
            }
        });
    }
}

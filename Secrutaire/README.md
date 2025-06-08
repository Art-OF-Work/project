# Interface Secrétaire - Tableau de Bord

Un tableau de bord complet pour les secrétaires médicales permettant de gérer les rendez-vous, les patients et les fiches médicales.

## Fonctionnalités

- **Tableau de bord** - Vue d'ensemble des activités quotidiennes
- **Gestion des rendez-vous** - Ajouter, modifier et annuler des rendez-vous
- **Gestion des patients** - Ajouter, modifier et consulter les informations des patients
- **Impression de fiches patients** - Générer et imprimer des fiches patients complètes
- **Paramètres du compte** - Personnaliser l'interface et gérer les informations personnelles

## Structure des fichiers

```
secretaire-dashboard/
│
├── index.html               # Page principale (Dashboard secrétaire)
├── rdv.html                 # Gestion des rendez-vous
├── ajouter-patient.html     # Formulaire ajout patient
├── modifier-patient.html    # Formulaire de modification
├── liste-patients.html      # Liste des patients
├── imprimer-fiche.html      # Page d'impression
├── settings.html            # Paramètres de la secrétaire
│
├── assets/
│   ├── images/              # Images et avatars
│   └── icons/               # Icônes personnalisées (si nécessaire)
│
├── css/
│   ├── style.css            # Styles principaux
│   ├── responsive.css       # Styles pour la responsivité
│   └── print.css            # Styles spécifiques à l'impression
│
├── js/
│   ├── main.js              # JavaScript principal
│   ├── rdv.js               # Fonctionnalités des rendez-vous
│   ├── patients.js          # Fonctionnalités des patients
│   └── print.js             # Fonctionnalités d'impression
│
└── README.md                # Documentation
```

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.1.3
- Font Awesome 5.15.4
- Flatpickr (pour les sélecteurs de date)
- DataTables (pour les tableaux interactifs)
- html2pdf.js (pour la génération de PDF)

## Installation et déploiement

1. Clonez ce dépôt sur votre serveur web
2. Aucune installation supplémentaire n'est nécessaire, l'interface utilise des CDN pour les bibliothèques

## Utilisation

### Tableau de bord

La page d'accueil présente un résumé des activités quotidiennes, y compris:
- Nombre de rendez-vous du jour
- Nombre total de patients enregistrés
- Nombre de fiches imprimées ce mois-ci
- Liste des rendez-vous à venir
- Liste des patients récemment ajoutés ou modifiés

### Gestion des rendez-vous

Permet de:
- Voir tous les rendez-vous planifiés
- Filtrer les rendez-vous par date, patient, médecin ou statut
- Ajouter un nouveau rendez-vous
- Modifier les détails d'un rendez-vous existant
- Annuler un rendez-vous

### Gestion des patients

Inclut:
- Formulaire d'ajout de nouveau patient
- Formulaire de modification des informations patient
- Liste complète des patients avec options de filtrage et de recherche
- Exportation de la liste des patients en Excel ou PDF

### Impression de fiches patients

Permet de:
- Rechercher un patient spécifique
- Visualiser sa fiche complète
- Imprimer la fiche directement
- Télécharger la fiche au format PDF

### Paramètres du compte

Permet à la secrétaire de:
- Modifier ses informations personnelles
- Changer son mot de passe
- Personnaliser les notifications
- Ajuster l'apparence de l'interface

## Personnalisation

L'interface peut être personnalisée en modifiant les fichiers CSS:
- `style.css` pour les styles principaux
- `responsive.css` pour l'adaptation aux différents appareils
- `print.css` pour les styles d'impression

## Notes pour les développeurs

- L'interface est entièrement statique et front-end uniquement
- Pour une implémentation réelle, il faudrait connecter l'interface à une base de données et un backend
- Les données actuelles sont simulées à des fins de démonstration

## Licence

Ce projet est fourni à titre d'exemple et peut être utilisé librement.

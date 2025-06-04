# 📊 Application de Gestion de Données Excel pour Projets Techniques

## 📄 Présentation

Cette application **React.js** permet l’importation, la lecture, la visualisation et l’enregistrement de données provenant de fichiers **Excel**, dans le cadre de la gestion de projets techniques tels que la **climatisation**, le **désenfumage**, etc.

Elle facilite :

- La collecte structurée des informations client
- La sélection du **type de consultation** (Consultation ou Appel d'offre)
- La saisie des **remarques** et de la **nature des travaux**

### 👤 L’utilisateur peut :
- **Importer** un fichier Excel
- **Extraire automatiquement** les données contenues dans ce fichier
- **Remplir un formulaire interactif** pour renseigner :
  - Numéro d'affaire
  - Nom du client
  - Type de projet : Consultation ou Appel d'offre
  - Nature des travaux (avec options dynamiques à cocher)
  - Remarques supplémentaires
- **Soumettre** l’ensemble des données vers le backend via **Axios**

---

## ✨ Fonctionnalités principales

- 📂 **Lecture de fichiers Excel** grâce à la bibliothèque `xlsx`
- ✅ **Formulaire intelligent** avec validation des champs obligatoires
- 🧩 **Affichage dynamique** : des champs conditionnels s’affichent selon les choix (ex : champ "Autre")
- 🔁 **Envoi des données** via une API personnalisée (`dataExcel.postFile()`)
- 🎛 **Interface responsive** utilisant Bootstrap et du CSS personnalisé

---

## 🧰 Technologies utilisées

- **Front-end** : `React.js`
- **Communication API** : `Axios`
- **Traitement Excel** : `xlsx`
- **Stylisation** : `Bootstrap`, `CSS`

---

## 🛠️ Backend – Node.js + PostgreSQL

Le backend repose sur **Express.js** avec une base de données PostgreSQL, structurée autour de trois tables : `info`, `excel`, et `DeviInfo`.

### 🔄 Fonctionnalité principale : `ajouterFile`

Le contrôleur `ajouterFile` :
- Reçoit les données Excel depuis `req.body.file`
- Analyse et structure les lignes du fichier Excel
- Crée une nouvelle entrée dans la table `info` (client, affaire, nature des travaux…)
- Insère chaque ligne Excel dans la table `excel`, liée à l'entrée `info` par son ID

### 🔍 Autres fonctions utiles
- `getAllDeviInfo` : retourne toutes les entrées de la table `info`
- `getFileByNemeFile` : recherche un fichier par nom (avec `LIKE`)
- `getCountTable` : nombre de lignes Excel associées à un fichier
- `getCountAllTable` : nombre total de lignes dans la table `excel`

---

## ⚙️ Connexion à la base de données

Le fichier `db.js` configure la connexion à PostgreSQL à l’aide du module `pg`.

---

## 📦 Organisation des dossiers

### 📁 Backend
```
backend/
├── controllers/
│ └── fileController.js # Logique métier (ajout, récupération)
├── queries/
│ └── querie.fileExcel.js # Requêtes SQL préparées
├── routes/
│ └── file.routes.js # Définition des routes API
├── db.js # Connexion PostgreSQL
├── database.sql # Script de création des tables

```
### 📂 Requêtes SQL

- Les requêtes SQL sont centralisées dans `queries/querie.fileExcel.js`
- La structure des tables est décrite dans `database.sql`

---




## 🧑‍💻 Auteur

Ce projet a été développé pour simplifier la gestion de données techniques issues de fichiers Excel dans le cadre de projets spécialisés.

---


// Définition de l'URL de base pour l'API utilisée pour toutes les requêtes
const baseURL = 'http://localhost:3001/api/v1';

/**
 * Fonction pour récupérer le token d'authentification depuis l'API
 * @param { string } email - L'adresse e-mail de l'utilisateur fournie lors de la connexion
 * @param { string } password - Le mot de passe de l'utilisateur
 * @returns { string } - Le token d'authentification reçu après une connexion réussie
 * 
 * Cette fonction envoie une requête POST à l'API pour authentifier l'utilisateur 
 * avec son email et mot de passe. Si la connexion réussit, le serveur renvoie un 
 * token d'authentification JWT qui est utilisé pour les requêtes futures.
 */
const getToken = async (email, password) => {
   let response;

   try {
      // Envoi de la requête à l'API pour tenter de récupérer un token JWT
      response = await fetch(`${baseURL}/user/login`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json', // Indique que les données envoyées sont au format JSON
         },
         body: JSON.stringify({ email, password }), // Les données d'authentification sont envoyées dans le corps de la requête
      });
   } catch {
      // Gestion des erreurs réseau ou du serveur qui empêchent la requête de s'exécuter
      throw new Error('We are experiencing a technical problem');
   }

   // Vérification des différents statuts de réponse pour identifier les erreurs
   if (response.status === 400) {
      // Gestion de l'erreur 400 (mauvaise requête), par exemple si les identifiants sont invalides
      const errorData = await response.json(); // Optionnel: peut être utilisé pour récupérer plus d'infos sur l'erreur
      throw new Error('The email address or password is invalid'); // Message d'erreur affiché à l'utilisateur
   }

   if (response.status === 500) {
      // Gestion de l'erreur 500 (erreur du serveur), si le backend rencontre un problème
      throw new Error('Internal Server Error. Please try again later.');
   }

   if (!response.ok) {
      // Gestion de toute autre erreur non spécifiée (réponse non-OK)
      throw new Error('Error connecting');
   }

   // Si la réponse est correcte, on récupère le token envoyé par l'API
   const data = await response.json();
   return data.body.token; // Retourne le token pour l'utiliser dans l'application
};

/**
 * Fonction pour récupérer les informations de l'utilisateur depuis l'API
 * @returns { Object } - Les données de l'utilisateur (ex: prénom, nom, email, etc.)
 * 
 * Cette fonction envoie une requête POST avec le token d'authentification 
 * dans l'en-tête pour récupérer les informations de l'utilisateur connecté.
 */
const userData = async () => {
   const token = localStorage.getItem('token'); // Récupère le token depuis le localStorage

   // Envoi d'une requête POST pour récupérer les données utilisateur
   const response = await fetch(`${baseURL}/user/profile`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json', // Indique que les données envoyées/reçues sont au format JSON
         'Authorization': `Bearer ${token}`, // Inclut le token JWT dans l'en-tête pour autoriser la requête
      },
   });

   // Si la réponse n'est pas correcte, une erreur est levée pour être gérée plus tard
   if (!response.ok) {
      throw response; // Renvoie l'objet response, permettant une gestion plus fine dans Redux
   }

   // Récupération des données utilisateur au format JSON
   const data = await response.json();
   return data.body; // Retourne le corps de la réponse contenant les informations de l'utilisateur
};

/**
 * Fonction pour mettre à jour les informations de l'utilisateur (ex: prénom et nom de famille)
 * @param { string } firstName - Le nouveau prénom de l'utilisateur
 * @param { string } lastName - Le nouveau nom de famille de l'utilisateur
 * @returns { void }
 * 
 * Cette fonction envoie une requête PUT à l'API pour mettre à jour les informations 
 * de profil de l'utilisateur connecté. Les nouvelles données sont envoyées dans le 
 * corps de la requête en tant qu'objet JSON.
 */
const userEdit = async (firstName, lastName) => {
   // Envoi d'une requête PUT pour mettre à jour le profil de l'utilisateur
   const response = await fetch(`${baseURL}/user/profile`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json', // Indique que les données envoyées sont au format JSON
         Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '', // Ajoute le token JWT dans l'en-tête si présent
      },
      body: JSON.stringify({
         firstName, // Envoie le nouveau prénom dans le corps de la requête
         lastName,  // Envoie le nouveau nom de famille dans le corps de la requête
      }),
   });

   // Si la réponse n'est pas correcte, une erreur est levée pour informer l'utilisateur
   if (!response.ok) {
      throw new Error('Error updating user data'); // Message d'erreur en cas d'échec de la mise à jour
   }
};

/**
 * Fonction pour stocker le token d'authentification dans le localStorage
 * @param { string } token - Le token d'authentification à stocker
 * @returns { void }
 * 
 * Cette fonction stocke le token d'authentification JWT dans le localStorage 
 * pour permettre aux futures requêtes d'utiliser ce token pour l'authentification.
 */
const setBearer = (token) => {
   localStorage.setItem('token', token); // Stocke le token dans le navigateur pour des utilisations ultérieures
};

/**
 * Fonction pour récupérer les données de balances depuis un fichier JSON statique
 * @returns { Array } - Une liste d'objets contenant les informations de balances
 * 
 * Cette fonction envoie une requête GET pour charger des données statiques sur 
 * les balances (ex: comptes bancaires ou autres types de soldes) depuis un 
 * fichier JSON dans le dossier public du projet.
 */
const fetchBalances = async () => {
    try {
        // Requête pour charger un fichier JSON contenant les balances
        const response = await fetch('/datas/balances.json'); // Chemin relatif vers le fichier dans le dossier public

        // Si la réponse n'est pas correcte, une erreur est levée
        if (!response.ok) {
            throw new Error('Error recovering accounts');
        }

        // Conversion de la réponse en objet JSON
        const data = await response.json();
        return data; // Retourne les données récupérées
    } catch (error) {
        // Affiche l'erreur dans la console pour aider au débogage
        console.error(error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
};

// Exportation des fonctions pour les utiliser dans d'autres parties de l'application
export { getToken, userData, setBearer, userEdit, fetchBalances }; 
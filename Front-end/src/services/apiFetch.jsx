// Définition de l'URL de base pour l'API
const baseURL = 'http://localhost:3001/api/v1';

/**
 * Récupérer le token d'authentification depuis l'API
 * @param { string } email - L'adresse e-mail de l'utilisateur
 * @param { string } password - Le mot de passe de l'utilisateur
 * @returns { string } - Le token d'authentification
 */
const getToken = async (email, password) => {
   const response = await fetch(`${baseURL}/user/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
   });

   if (response.status === 400) {
      // Gérer l'erreur 400 (mauvaise requête)
      const errorData = await response.json();
      throw new Error('L\'adresse mail ou le mot de passe sont invalides');
   }

   if (response.status === 500) {
      // Gérer l'erreur 500 (erreur serveur)
      throw new Error('Erreur interne du serveur. Veuillez réessayer plus tard.');
   }

   if (!response.ok) {
      // Gérer les autres erreurs
      throw new Error('Erreur lors de la connexion');
   }

   const data = await response.json();
   return data.body.token;
};

/**
 * Récupérer les informations de l'utilisateur depuis l'API
 * @returns { Object } - Les données de l'utilisateur
 */
const userData = async () => {
   const token = localStorage.getItem('token');

   const response = await fetch(`${baseURL}/user/profile`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      throw response; // Renvoie l'objet response pour un traitement ultérieur dans Redux
   }

   const data = await response.json();
   return data.body;
};

/**
 * Envoyer les nouvelles informations de l'utilisateur pour mise à jour
 * @param { string } firstName - Nouveau prénom de l'utilisateur
 * @param { string } lastName - Nouveau nom de famille de l'utilisateur
 * @returns { void }
 */
const userEdit = async (firstName, lastName) => {
   const response = await fetch(`${baseURL}/user/profile`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      },
      body: JSON.stringify({
         firstName,
         lastName,
      }),
   });

   if (!response.ok) {
      throw new Error('Error updating user data');
   }
};

/**
 * Stocker le token d'authentification
 * @param { string } token - Le token d'authentification
 * @returns { void }
 */
const setBearer = (token) => {
   localStorage.setItem('token', token);
};

export { getToken, userData, setBearer, userEdit }; 
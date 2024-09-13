/**
 * Enregistrer le token d'authentification dans le stockage approprié
 * @param { string } token - Le token JWT à stocker
 * @param { boolean } rememberMe - Indicateur si l'utilisateur souhaite rester connecté
 * 
 * Cette fonction permet de stocker le token dans le `localStorage` ou le `sessionStorage` 
 * selon que l'utilisateur a choisi l'option "Se souvenir de moi". 
 * - Si `rememberMe` est vrai, le token est stocké dans `localStorage`, 
 *   ce qui persiste après la fermeture du navigateur.
 * - Sinon, le token est stocké dans `sessionStorage`, qui sera supprimé 
 *   lorsque l'onglet ou la fenêtre du navigateur est fermé.
 */
const saveToken = (token, rememberMe) => {
   if (rememberMe) {
      // Stocke le token dans le localStorage pour persistance à long terme
      localStorage.setItem('token', token);
      return;
   }
   // Stocke le token dans le sessionStorage pour une session unique
   sessionStorage.setItem('token', token);
};

/**
 * Effacer le token d'authentification du stockage
 * 
 * Cette fonction supprime le token JWT du `localStorage` et du `sessionStorage`.
 * Elle est utilisée lors de la déconnexion de l'utilisateur pour s'assurer
 * que le token est bien effacé des deux emplacements de stockage.
 */
const clearToken = (token) => {
   // Supprime le token du localStorage
   localStorage.removeItem('token', token);

   // Supprime le token du sessionStorage
   sessionStorage.removeItem('token', token);
};

// Export des fonctions pour les utiliser ailleurs dans l'application
export { saveToken, clearToken };
// Importation de la fonction configureStore depuis Redux Toolkit pour créer le store Redux
import { configureStore } from '@reduxjs/toolkit';

// Importation du reducer authReducer qui gère l'état d'authentification
import authReducer from '../reducers/reducers';

// Pré-chargement de l'état initial (preloadedState)
// Cet objet permet de charger un état initial dans le store au moment de la création
const preloadedState = {
    auth: {
        // Récupération du token d'authentification depuis localStorage ou sessionStorage, s'il existe
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        // L'utilisateur n'est pas encore défini au démarrage. Il sera récupéré après la connexion ou un rafraîchissement de page
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        user: null,
    },
};
console.log('Token préchargé depuis le stockage local ou session:', preloadedState.auth.token); // Log du token au démarrage de l'application

// Création du store Redux en utilisant configureStore
// configureStore simplifie la configuration du store en combinant les reducers et en intégrant des middlewares par défaut
const store = configureStore({
    reducer: {
        // Ajout du reducer authReducer à la clé 'auth' du store
        auth: authReducer,
    },
    // L'état initial est défini avec le token s'il est déjà stocké dans localStorage ou sessionStorage
    preloadedState,
});

// Exportation du store pour être utilisé dans l'application
export default store;
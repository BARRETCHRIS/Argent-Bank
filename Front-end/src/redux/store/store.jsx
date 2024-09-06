import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/reducers';

const preloadedState = {
    auth: {
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        user: null, // L'utilisateur sera récupéré après la connexion ou lors du rafraîchissement
    },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    preloadedState, // Initialisation du state avec le token si présent
});

export default store;
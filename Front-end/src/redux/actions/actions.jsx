import { getToken, userData, setBearer } from '../../services/apiFetch';
import { clearToken } from '../../services/storageToken';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';

// Action Creators

// Action pour se connecter
export const login = (email, password) => async (dispatch) => {
    try {
        // Tente d'obtenir le token avec les identifiants
        const token = await getToken(email, password);
        setBearer(token); // Stocke le token dans le localStorage
        dispatch({ type: LOGIN_SUCCESS, payload: token });

        // Récupère les données utilisateur après la connexion
        const user = await userData();
        dispatch({ type: FETCH_USER_SUCCESS, payload: user });

        // Retourne null ou success si tout s'est bien passé
        return null;
    } catch (error) {
        // Si une erreur 500 survient, redirige vers la page d'erreur
        if (error.message === 'Erreur interne du serveur. Veuillez réessayer plus tard.') {
            window.location.href = '/error500'; // Redirection en cas d'erreur 500
        }

        // Retourne l'erreur pour la gérer dans le composant
        return error;
    }
};

// Action pour déconnecter
export const logout = () => (dispatch) => {
    clearToken(); // Vide le localStorage et sessionStorage
    dispatch({ type: LOGOUT });
    window.location.href = '/'; // Redirection vers la page de Sign-in
};

export const loadUser = () => async (dispatch, getState) => {
    const token = getState().auth.token; // Récupérer le token dans Redux

    if (token) {
        try {
            const user = await userData(); // Récupérer les infos utilisateur
            dispatch({ type: FETCH_USER_SUCCESS, payload: user }); // Mise à jour de l'état utilisateur dans Redux
        } catch (error) {
            console.error('Erreur lors de la récupération des données utilisateur', error);
            // Ici, tu peux gérer l'erreur, par exemple en déconnectant l'utilisateur si le token est invalide
        }
    }
};
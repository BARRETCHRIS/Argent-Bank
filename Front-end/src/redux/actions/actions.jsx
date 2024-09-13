// Importation des fonctions d'API et de gestion de tokens
import { getToken, userData, setBearer, userEdit } from '../../services/apiFetch';
import { clearToken } from '../../services/storageToken';

// Définition des types d'actions pour Redux
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';
export const CLEAR_NAME = 'CLEAR_NAME';

/**
 * Action pour gérer la connexion d'un utilisateur
 * @param { string } email - L'adresse email de l'utilisateur
 * @param { string } password - Le mot de passe de l'utilisateur
 * 
 * Cette action envoie une requête pour obtenir un token JWT. Si la connexion réussit, 
 * le token est stocké et l'action LOGIN_SUCCESS est dispatchée. En cas d'erreur, 
 * elle gère la redirection ou renvoie l'erreur au composant.
 */
export const login = (email, password) => async (dispatch) => {
    try {
        // Tente d'obtenir un token JWT avec les identifiants fournis
        const token = await getToken(email, password);
        console.log('Token actions-login :', token); // Log le token après la connexion réussie

        // Stocke le token dans le localStorage pour utilisation future
        setBearer(token);

        // Dispatch l'action LOGIN_SUCCESS pour mettre à jour l'état Redux avec le token
        dispatch({ type: LOGIN_SUCCESS, payload: token });
    } catch (error) {
        // Si une erreur 500 survient, redirige vers la page d'erreur 500
        if (error.message === 'We are experiencing a technical problem') {
            window.location.href = '/error500'; // Redirection vers la page d'erreur 500
        }

        // Retourne l'erreur pour la gérer dans le composant (ex: affichage d'un message d'erreur)
        return error;
    }
};

/**
 * Action pour gérer la déconnexion d'un utilisateur
 * 
 * Cette action vide les tokens stockés (localStorage/sessionStorage) 
 * et dispatch l'action LOGOUT pour mettre à jour l'état Redux. 
 * L'utilisateur est ensuite redirigé vers la page d'accueil.
 */
export const logout = () => (dispatch) => {
    // Vide le localStorage et le sessionStorage (supprime le token)
    clearToken();

    // Dispatch l'action LOGOUT pour indiquer que l'utilisateur est déconnecté
    dispatch({ type: LOGOUT });

    // Redirection vers la page d'accueil après déconnexion
    window.location.href = '/'; 
};

/**
 * Action pour charger les informations de l'utilisateur connecté
 * 
 * Cette action utilise le token stocké dans Redux pour récupérer 
 * les informations de l'utilisateur via une requête à l'API.
 * Si le token est valide, elle dispatch l'action FETCH_USER_SUCCESS avec les données utilisateur.
 */
export const loadUser = () => async (dispatch, getState) => {
    const token = getState().auth.token; // Récupère le token depuis le store Redux
    console.log('Token actions-loadUser utilisé pour charger l\'utilisateur:', token); // Log du token utilisé pour récupérer les infos utilisateur

    // Si le token existe, on tente de récupérer les informations utilisateur
    if (token) {
        try {
            // Envoie une requête pour récupérer les informations de l'utilisateur
            const user = await userData();

            // Dispatch l'action FETCH_USER_SUCCESS avec les données utilisateur récupérées
            dispatch({ type: FETCH_USER_SUCCESS, payload: user });
        } catch (error) {
            // Affiche une erreur dans la console en cas d'échec
            console.error('Error retrieving user data', error);
        }
    }
};

/**
 * Action pour basculer entre le mode édition et le mode affichage
 * 
 * Cette action ne fait qu'alterner un état booléen dans Redux 
 * pour activer ou désactiver le mode édition du profil utilisateur.
 */
export const toggleEditMode = () => ({
    type: TOGGLE_EDIT_MODE,
});

/**
 * Action pour réinitialiser le prénom et le nom dans Redux
 * 
 * Cette action met à jour l'état Redux pour réinitialiser les 
 * champs prénom et nom, par exemple lors de la réinitialisation d'un formulaire.
 */
export const clearName = () => ({
    type: CLEAR_NAME,
});

/**
 * Action pour mettre à jour les informations de profil d'un utilisateur
 * @param { string } firstName - Le nouveau prénom de l'utilisateur
 * @param { string } lastName - Le nouveau nom de famille de l'utilisateur
 * 
 * Cette action envoie une requête à l'API pour mettre à jour le prénom et le nom 
 * de l'utilisateur. Si la mise à jour réussit, elle met à jour l'état Redux avec 
 * les nouvelles informations utilisateur.
 */
export const updateUser = (firstName, lastName) => async (dispatch, getState) => {
    try {
        const token = getState().auth.token; // Récupère le token JWT depuis l'état Redux
        console.log('Token actions-updateUser utilisé pour mettre à jour l\'utilisateur:', token); // Log du token utilisé lors de la mise à jour

        // Si aucun token n'est trouvé, l'utilisateur n'est pas authentifié
        if (!token) {
            throw new Error('Unauthenticated user');
        }

        // Envoie une requête PUT à l'API pour mettre à jour les informations utilisateur
        await userEdit(firstName, lastName);

        // Met à jour le store Redux avec les nouvelles informations utilisateur (prénom, nom)
        dispatch({
            type: FETCH_USER_SUCCESS, 
            payload: { ...getState().auth.user, firstName, lastName }, // Mise à jour des informations utilisateur
        });
    } catch (error) {
        // Affiche une erreur dans la console en cas d'échec de la mise à jour
        console.error('Error updating user data', error);
    }
};
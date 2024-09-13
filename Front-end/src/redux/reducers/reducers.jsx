// Importation des types d'actions depuis le fichier actions
import { LOGIN_SUCCESS, LOGOUT, FETCH_USER_SUCCESS, TOGGLE_EDIT_MODE, CLEAR_NAME } from '../actions/actions';

// État initial du reducer, qui définit la structure de base du state dans Redux
const initialState = {
    token: null,       // Le token JWT, utilisé pour l'authentification
    user: null,        // Les informations de l'utilisateur (profil)
    isEditing: false,  // Indicateur pour savoir si le mode édition est activé ou non
};

// Reducer pour gérer les actions liées à l'authentification et à la gestion de l'utilisateur
// Le reducer prend l'état actuel (state) et une action, et renvoie un nouvel état en fonction de l'action
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lorsque l'action LOGIN_SUCCESS est déclenchée
        // L'action contient le token d'authentification dans action.payload
        case LOGIN_SUCCESS:
            console.log('Token stocké dans le state après LOGIN_SUCCESS:', action.payload); // Log du token après l'action LOGIN_SUCCESS
            return {
                ...state,        // Copie de l'état actuel
                token: action.payload,  // Mise à jour du token avec celui reçu dans l'action
            };

        // Lorsque l'action FETCH_USER_SUCCESS est déclenchée
        // L'action contient les informations de l'utilisateur dans action.payload
        case FETCH_USER_SUCCESS:
            return {
                ...state,        // Copie de l'état actuel
                user: action.payload,  // Mise à jour des informations utilisateur
            };

        // Lorsque l'action TOGGLE_EDIT_MODE est déclenchée
        // Cela inverse la valeur de isEditing pour activer ou désactiver le mode édition
        case TOGGLE_EDIT_MODE:
            return {
                ...state,        // Copie de l'état actuel
                isEditing: !state.isEditing,  // Inverse l'état actuel de isEditing
            };

        // Lorsque l'action CLEAR_NAME est déclenchée
        // Cette action réinitialise les champs firstName et lastName de l'utilisateur à des chaînes vides
        case CLEAR_NAME:
            return {
                ...state,        // Copie de l'état actuel
                user: {
                    ...state.user,  // Copie des informations de l'utilisateur
                    firstName: '',  // Réinitialise le prénom
                    lastName: '',   // Réinitialise le nom de famille
                },
            };

        // Lorsque l'action LOGOUT est déclenchée
        // Cela réinitialise l'état en supprimant le token et les informations utilisateur, et désactive le mode édition
        case LOGOUT:
            console.log('Token supprimé après déconnexion'); // Log la suppression du token après logout
            return {
                token: null,      // Réinitialise le token à null
                user: null,       // Réinitialise les informations utilisateur à null
                isEditing: false, // Désactive le mode édition
            };

        // Si l'action ne correspond à aucun des cas, renvoie l'état actuel sans modification
        default:
            return state;
    }
};

// Exportation du reducer pour l'utiliser dans le store Redux
export default authReducer;

import { useEffect } from 'react'; // Hook pour gérer les effets de bord dans le composant
import { useDispatch } from 'react-redux'; // Hook pour dispatcher des actions Redux
import { logout } from '../redux/actions/actions'; // Import de l'action de déconnexion

/**
 * Hook personnalisé pour déconnecter automatiquement l'utilisateur après une période d'inactivité.
 * @param {number} timeout - Durée d'inactivité en millisecondes avant la déconnexion automatique (par défaut : 5 minutes).
 */
const useAutoLogout = (timeout = 300000) => { // Timeout par défaut de 5 minutes (ajustable)
    const dispatch = useDispatch(); // Initialisation du dispatch pour envoyer des actions Redux

    useEffect(() => {
        let timer; // Variable pour stocker le timer

        /**
         * Réinitialise le timer d'inactivité. Si une interaction est détectée, le timer est remis à zéro.
         */
        const resetTimer = () => {
            if (timer) clearTimeout(timer); // Si un timer est déjà en cours, on l'annule
            // Démarre un nouveau timer pour la déconnexion après la période d'inactivité spécifiée
            timer = setTimeout(() => {
                dispatch(logout()); // Déconnecte l'utilisateur en envoyant l'action de déconnexionautomatique
                alert('Vous avez été déconnecté pour cause d\'inactivité'); // Alerte l'utilisateur après déconnexion
            }, timeout); // Timeout défini en millisecondes
        };

        /**
         * Fonction qui est déclenchée à chaque activité utilisateur (souris, clavier) pour réinitialiser le timer.
         */
        const handleActivity = () => {
            resetTimer(); // Réinitialise le timer à chaque interaction détectée
        };

        // Ajoute des écouteurs d'événements pour détecter l'activité utilisateur (mouvements de souris, appuis de touches)
        window.addEventListener('mousemove', handleActivity); // Détecte les mouvements de la souris
        window.addEventListener('keydown', handleActivity); // Détecte les appuis sur les touches du clavier

        // Lance le timer dès que le hook est monté (au chargement de la page ou du composant)
        resetTimer();

        // Nettoyage lors du démontage du composant ou si le timeout est modifié
        return () => {
            if (timer) clearTimeout(timer); // Annule le timer si le composant est démonté
            // Supprime les écouteurs d'événements pour éviter les fuites de mémoire
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [dispatch, timeout]); // Le hook dépend du dispatch et du timeout

    return null; // Le hook ne rend rien
};

export default useAutoLogout; // Exporte le hook pour l'utiliser dans d'autres composants

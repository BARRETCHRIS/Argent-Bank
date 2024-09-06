import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/actions';

const useAutoLogout = (timeout = 300000) => { // Timeout par défaut de 5 minutes (ajustable)
    const dispatch = useDispatch();

    useEffect(() => {
        let timer;

        const resetTimer = () => {
            if (timer) clearTimeout(timer); // Réinitialise le timer si une interaction est détectée
            timer = setTimeout(() => {
                dispatch(logout()); // Déconnecte l'utilisateur après inactivité
                alert('Vous avez été déconnecté pour cause d\'inactivité');
            }, timeout);
        };

        const handleActivity = () => {
            resetTimer(); // Réinitialiser le timer à chaque interaction
        };

        // Écoute les événements d'activité utilisateur
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        // Démarre le timer dès le montage
        resetTimer();

        // Nettoyage des événements lors du démontage du composant
        return () => {
            if (timer) clearTimeout(timer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [dispatch, timeout]);

    return null;
};

export default useAutoLogout;

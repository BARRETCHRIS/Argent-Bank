import { NavLink, Link } from "react-router-dom"; // Importation des composants de navigation pour gérer les liens
import { useSelector, useDispatch } from 'react-redux'; // Importation des hooks pour accéder au store Redux et dispatcher des actions
import { logout } from '../redux/actions/actions'; // Import de l'action de déconnexion (logout)
import { useNavigate } from 'react-router-dom'; // Hook pour naviguer entre les pages

import Logo from "../assets/argentBankLogo.png"; // Import du logo de l'application

function Nav() {
    const dispatch = useDispatch(); // Hook pour dispatcher des actions Redux
    const navigate = useNavigate(); // Hook pour naviguer vers d'autres routes

    // Récupération des données utilisateur et du token dans le store Redux
    const user = useSelector((state) => state.auth.user); // Sélectionne l'utilisateur depuis le state Redux
    const token = useSelector((state) => state.auth.token); // Sélectionne le token depuis le state Redux

    // Fonction pour gérer la déconnexion
    const handleSignOut = () => {
        dispatch(logout());  // Envoie l'action de déconnexion pour supprimer le token et réinitialiser l'état
        navigate('/');       // Redirige l'utilisateur vers la page d'accueil après déconnexion
    };

    return (
        <nav className="main-nav">
            {/* Logo de l'application, redirige vers la page d'accueil */}
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1> {/* Titre masqué pour l'accessibilité */}
            </Link>
            <div>
                {token && user ? (
                    // Si l'utilisateur est connecté, affiche son prénom et un bouton de déconnexion
                    <>
                        {/* Lien vers le profil de l'utilisateur */}
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i> {/* Icône d'utilisateur */}
                            {user.firstName} {/* Affiche le prénom de l'utilisateur */}
                        </NavLink>
                        {/* Lien pour se déconnecter */}
                        <NavLink className="main-nav-item" to="/" onClick={handleSignOut}>
                            <i className="fa fa-sign-out"></i> {/* Icône de déconnexion */}
                            Sign Out
                        </NavLink>
                    </>
                ) : (
                    // Si personne n'est connecté, affiche un lien vers la page de connexion
                    <NavLink className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i> {/* Icône d'utilisateur */}
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default Nav; // Exporte le composant pour utilisation dans d'autres parties de l'application
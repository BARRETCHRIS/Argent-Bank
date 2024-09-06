import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

import Logo from "../assets/argentBankLogo.png";

function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Accéder au state auth pour récupérer l'utilisateur et le token
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    // Gestion du logout
    const handleSignOut = () => {
        dispatch(logout());  // Déconnecte l'utilisateur
        navigate('/');       // Redirige vers la page d'accueil
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={Logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {token && user ? (
                    // Si l'utilisateur est connecté, affiche le prénom et Sign Out
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>
                            {user.firstName}
                        </NavLink>
                        <NavLink className="main-nav-item" to="/" onClick={handleSignOut}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </NavLink>
                    </>
                ) : (
                    // Si personne n'est connecté, affiche Sign In
                    <NavLink className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default Nav;
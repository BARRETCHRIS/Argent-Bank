import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    document.title = 'AB Login';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const rememberedEmail = localStorage.getItem('rememberedEmail') || '';

    const [email, setEmail] = useState(rememberedEmail);
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(!!rememberedEmail);
    const [error, setError] = useState(null); // État pour gérer les erreurs

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Sauvegarde de l'email si remember-me est coché
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        try {
            // Dispatch l'action de login pour récupérer le token
            const error = await dispatch(login(email, password));

            // Si une erreur est retournée, on la gère
            if (error) {
                setError(error.message);
                return;
            }

            // Redirection après connexion si aucun problème
            navigate('/profile');
        } catch (error) {
            // Gérer l'erreur en affichant un message dans le formulaire
            setError(error.message);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>

                {/* Afficher un message d'erreur si une erreur est présente */}
                {error && <p className="error-message">{error}</p>}
            </section>
        </main>
    );
}

export default SignIn;
import { useDispatch } from 'react-redux'; // Permet de déclencher des actions Redux
import { useState } from 'react'; // Gère les états locaux dans le composant
import { login } from '../redux/actions/actions'; // Importe l'action de connexion (login)
import { useNavigate } from 'react-router-dom'; // Utilisé pour la redirection après connexion

function SignIn() {
    // Définit le titre de la page dans l'onglet du navigateur
    document.title = 'AB Login';

    // Récupère le dispatch de Redux pour envoyer des actions
    const dispatch = useDispatch();

    // Hook pour la navigation afin de rediriger l'utilisateur après une action réussie
    const navigate = useNavigate();

    // Récupère l'email stocké dans localStorage si l'utilisateur a coché "Remember me" auparavant
    const rememberedEmail = localStorage.getItem('rememberedEmail') || '';

    // États locaux pour stocker l'email, le mot de passe, la préférence "Remember me" et les erreurs éventuelles
    const [email, setEmail] = useState(rememberedEmail); // Pré-rempli avec l'email stocké ou une chaîne vide
    const [password, setPassword] = useState(''); // Champ pour stocker le mot de passe
    const [rememberMe, setRememberMe] = useState(!!rememberedEmail); // Booléen pour savoir si "Remember me" est activé
    const [error, setError] = useState(null); // État pour gérer les messages d'erreur

    // Fonction appelée lors de la soumission du formulaire de connexion
    const handleSignIn = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

        // Si l'utilisateur veut se souvenir de son email, on le stocke dans localStorage
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email); // Sauvegarde l'email dans le navigateur
        } else {
            // Si "Remember me" n'est pas coché, on supprime l'email de localStorage
            localStorage.removeItem('rememberedEmail');
        }

        try {
            // Envoie l'action de connexion (login) avec les identifiants (email, password)
            const error = await dispatch(login(email, password));

            // Si une erreur est retournée par l'action de connexion, elle est affichée à l'utilisateur
            if (error) {
                setError(error.message); // Stocke le message d'erreur dans l'état local
                return; // Arrête l'exécution de la fonction
            }

            // Si la connexion réussit, redirige l'utilisateur vers la page de profil
            navigate('/profile');
        } catch (error) {
            // Si une exception est levée, affiche le message d'erreur dans le formulaire
            setError(error.message);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                {/* Icône et titre de la section de connexion */}
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>

                {/* Formulaire de connexion */}
                <form onSubmit={handleSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        {/* Champ pour entrer l'email, synchronisé avec l'état local 'email' */}
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Met à jour l'état 'email' à chaque changement
                        />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        {/* Champ pour entrer le mot de passe, synchronisé avec l'état local 'password' */}
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Met à jour l'état 'password' à chaque changement
                        />
                    </div>

                    <div className="input-remember">
                        {/* Checkbox pour activer/désactiver l'option "Remember me" */}
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} // Met à jour l'état 'rememberMe'
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>

                    {/* Bouton pour soumettre le formulaire de connexion */}
                    <button className="sign-in-button" type="submit">Sign In</button>
                </form>

                {/* Affiche un message d'erreur si l'état 'error' n'est pas null */}
                {error && <p className="error-message">{error}</p>}
            </section>
        </main>
    );
}

export default SignIn; // Exportation du composant SignIn pour être utilisé ailleurs dans l'application


// import { useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { login } from '../redux/actions/actions';
// import { useNavigate } from 'react-router-dom';

// function SignIn() {
//     document.title = 'AB Login';

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const rememberedEmail = localStorage.getItem('rememberedEmail') || '';

//     const [email, setEmail] = useState(rememberedEmail);
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(!!rememberedEmail);
//     const [error, setError] = useState(null); // État pour gérer les erreurs

//     const handleSignIn = async (e) => {
//         e.preventDefault();

//         // Sauvegarde de l'email si remember-me est coché
//         if (rememberMe) {
//             localStorage.setItem('rememberedEmail', email);
//         } else {
//             localStorage.removeItem('rememberedEmail');
//         }

//         try {
//             // Dispatch l'action de login pour récupérer le token
//             const error = await dispatch(login(email, password));

//             // Si une erreur est retournée, on la gère
//             if (error) {
//                 setError(error.message);
//                 return;
//             }

//             // Redirection après connexion si aucun problème
//             navigate('/profile');
//         } catch (error) {
//             // Gérer l'erreur en affichant un message dans le formulaire
//             setError(error.message);
//         }
//     };

//     return (
//         <main className="main bg-dark">
//             <section className="sign-in-content">
//                 <i className="fa fa-user-circle sign-in-icon"></i>
//                 <h1>Sign In</h1>
//                 <form onSubmit={handleSignIn}>
//                     <div className="input-wrapper">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-wrapper">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <div className="input-remember">
//                         <input
//                             type="checkbox"
//                             id="remember-me"
//                             checked={rememberMe}
//                             onChange={(e) => setRememberMe(e.target.checked)}
//                         />
//                         <label htmlFor="remember-me">Remember me</label>
//                     </div>
//                     <button className="sign-in-button" type="submit">Sign In</button>
//                 </form>

//                 {/* Affiche un message d'erreur si une erreur est présente */}
//                 {error && <p className="error-message">{error}</p>}
//             </section>
//         </main>
//     );
// }

// export default SignIn;
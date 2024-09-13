import { useState, useEffect } from 'react'; // Importation des hooks useState et useEffect pour gérer l'état local et les effets secondaires
import { useDispatch } from 'react-redux'; // Hook pour dispatcher des actions Redux
import { clearName, updateUser } from '../redux/actions/actions'; // Import des actions pour vider le nom et mettre à jour l'utilisateur

function EditName({ firstName, lastName, onSave }) {
    const dispatch = useDispatch(); // Initialisation de useDispatch pour envoyer des actions Redux

    // États locaux pour stocker les valeurs des inputs de prénom et nom
    const [localFirstName, setLocalFirstName] = useState(firstName);
    const [localLastName, setLocalLastName] = useState(lastName);

    // Utilisation de useEffect pour mettre à jour les valeurs des inputs si les props firstName et lastName changent
    useEffect(() => {
        setLocalFirstName(firstName); // Mise à jour du prénom local si la prop change
        setLocalLastName(lastName);   // Mise à jour du nom de famille local si la prop change
    }, [firstName, lastName]); // Dépendances : l'effet se déclenche quand firstName ou lastName change

    // Fonction pour gérer la sauvegarde du nouveau nom
    const handleSave = () => {
        // Dispatch l'action updateUser pour envoyer les nouvelles données à l'API
        dispatch(updateUser(localFirstName, localLastName)); // Mise à jour des informations utilisateur dans la base de données via Redux
        onSave(); // Appelle la fonction onSave pour sortir du mode édition
    };

    return (
        <div className="header">
            <h1>Welcome back</h1>
            <form className="edit-Name-Form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}> {/* Empêche le comportement par défaut du formulaire */}
                <div className="edit-Name-Form-group">
                    <label className="sr-only" htmlFor="firstName">First Name</label> {/* Label pour le champ prénom */}
                    <input
                        className="edit-input"
                        type="text"
                        id="firstName"
                        value={localFirstName} // Utilisation de l'état local pour le champ prénom
                        onChange={(e) => setLocalFirstName(e.target.value)} // Met à jour l'état local du prénom quand l'utilisateur tape
                    />
                    <label className="sr-only" htmlFor="lastName">Last Name</label> {/* Label pour le champ nom */}
                    <input
                        className="edit-input"
                        type="text"
                        id="lastName"
                        value={localLastName} // Utilisation de l'état local pour le champ nom
                        onChange={(e) => setLocalLastName(e.target.value)} // Met à jour l'état local du nom quand l'utilisateur tape
                    />
                </div>
                <div className="edit-Name-Form-group">
                    {/* Bouton pour sauvegarder les changements */}
                    <button type="submit" className="edit-button">Save</button>
                    
                    {/* Bouton pour effacer les champs prénom et nom */}
                    <button
                        className="edit-button"
                        type="button" // Ce bouton ne soumet pas le formulaire
                        onClick={() => {
                            setLocalFirstName(''); // Vide l'état local du prénom
                            setLocalLastName('');  // Vide l'état local du nom
                            dispatch(clearName()); // Envoie l'action clearName pour effacer les données dans Redux
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditName; // Exporte le composant pour être utilisé ailleurs dans l'application
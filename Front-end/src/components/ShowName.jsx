function ShowName({ firstName, lastName, onEdit }) {
    return (
        <div className="header">
            {/* Affiche un message de bienvenue personnalisé avec le prénom et le nom */}
            <h1>Welcome back<br />{firstName} {lastName}!</h1>

            {/* Bouton qui permet de passer en mode édition, déclenche la fonction onEdit quand cliqué */}
            <button className="edit-button" onClick={onEdit}>Edit Name</button> {/* Active l'édition */}
        </div>
    );
};

export default ShowName; // Exporte le composant ShowName pour être utilisé dans d'autres parties de l'application
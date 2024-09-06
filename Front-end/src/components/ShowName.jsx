function ShowName ({firstName,lastName }) {
    return (
        <div className="header">
            <h1>Welcome back<br />{firstName} {lastName}!</h1>
            <button className="edit-button">Edit Name</button>
        </div>
    )
};

export default ShowName;
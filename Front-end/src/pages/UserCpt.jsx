import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '../redux/actions/actions';
import ShowName from '../components/ShowName';
import useAutoLogout from '../hooks/useAutoLogout'; // Import du hook

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        // Charger les données utilisateur si le token existe et que les infos utilisateur ne sont pas encore définies
        if (token && !user) {
            dispatch(loadUser());
        }
    }, [dispatch, token, user]);

    useAutoLogout(300000); // Timeout de 300000 ms soit 5 min

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <main className="main bg-dark">
            <ShowName 
                firstName={user.firstName}
                lastName={user.lastName}
            />
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <p>ID: {user.id}</p>
                <p>Email: {user.email}</p>
                <p>Password: *******</p>
            </section>
        </main>
    );
}

export default Profile;
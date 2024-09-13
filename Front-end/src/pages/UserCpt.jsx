// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';

// import { loadUser, toggleEditMode } from '../redux/actions/actions';
// import ShowName from '../components/ShowName';
// import EditName from '../components/EditName';

// import { fetchBalances } from '../services/apiFetch';
// import BalancesCard from '../components/BalancesCard';
// import useAutoLogout from '../hooks/useAutoLogout';

// function Profile() {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.auth.user);
//     const token = useSelector((state) => state.auth.token);
//     const isEditing = useSelector((state) => state.auth.isEditing);

//     const [balances, setBalances] = useState([]);

//     useEffect(() => {
//         if (token && !user) {
//             dispatch(loadUser());
//         }

//         const getBalances = async () => {
//             const data = await fetchBalances();
//             setBalances(data);
//         };

//         getBalances();
//     }, [dispatch, token, user]);

//     useAutoLogout(300000);

//     if (token && !user) {
//         return <div>Loading...</div>;
//     }

//     if (!token && !user) {
//         window.location.href = '/*';
//     }

//     return (
//         <main className="main bg-dark">
//             {!isEditing ? (
//                 <ShowName
//                     firstName={user.firstName}
//                     lastName={user.lastName}
//                     onEdit={() => dispatch(toggleEditMode())}
//                 />
//             ) : (
//                 <EditName
//                     firstName={user.firstName}
//                     lastName={user.lastName}
//                     onSave={() => dispatch(toggleEditMode())}
//                 />
//             )}

//             <h2 className="sr-only">Accounts</h2>

//             {balances.length > 0 && balances.map((balance, index) => (
//                 <BalancesCard key={index} balance={balance} />
//             ))}
//         </main>
//     );
// }

// export default Profile;






import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { loadUser, toggleEditMode } from '../redux/actions/actions';
import ShowName from '../components/ShowName';
import EditName from '../components/EditName';

import { fetchBalances } from '../services/apiFetch';
import BalancesCard from '../components/BalancesCard';
import useAutoLogout from '../hooks/useAutoLogout';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const isEditing = useSelector((state) => state.auth.isEditing); // Récupère l'état d'édition

    const [balances, setBalances] = useState([]);

    useEffect(() => {
        if (token && !user) {
            dispatch(loadUser());
        }

        const getBalances = async () => {
            const data = await fetchBalances();
            setBalances(data);
        };

        getBalances();
    }, [dispatch, token, user]);

    useAutoLogout(300000);

    if (token && !user) {
        return <div>Loading...</div>;
    }

    if (!token && !user) {
        window.location.href = '/*';
    }

    return (
        <main className="main bg-dark">
            {/* Affiche soit ShowName soit EditName selon le mode d'édition */}
            {!isEditing ? (
                <ShowName
                    firstName={user.firstName}
                    lastName={user.lastName}
                    onEdit={() => dispatch(toggleEditMode())} // Active le mode édition
                />
            ) : (
                <EditName
                    firstName={user.firstName}
                    lastName={user.lastName}
                    onSave={() => dispatch(toggleEditMode())} // Sauvegarde et désactive le mode édition
                />
            )}

            <h2 className="sr-only">Accounts</h2>

            {balances.length > 0 && balances.map((balance, index) => (
                <BalancesCard key={index} balance={balance} />
            ))}
        </main>
    );
}

export default Profile;
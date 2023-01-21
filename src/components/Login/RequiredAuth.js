import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
// import Loading from '../Shared/Loading';

// const RequiredAuth = ({ children }) => {
//     const [user, loading] = useAuthState(auth);
//     let location = useLocation();
//     if (loading) {
//         return <Loading></Loading>
//     }
//     if (!user) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }
//     return children;
// };

const RequiredAuth = ({ children }) => {
    // const [user, loading] = useAuthState(auth);
    const [token, adminLoading] = useToken();
    let location = useLocation();
    if (adminLoading) {
        return 'loading...'
    }
    if (!token) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children;
};
export default RequiredAuth;
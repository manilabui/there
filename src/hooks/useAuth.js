import { useState } from 'react';
import { getAll, postItem } from '../modules/apiManager';

export default () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const isAuthenticated = () => loggedIn || localStorage.getItem("credentials") !== null;

    const login = creds => {
        getAll('users')
            .then(users => {
                users.map(user => {
                    if (creds.userName === user.userName && creds.password === user.password) {
                        localStorage.setItem("credentials", JSON.stringify(creds));
                        setLoggedIn(true);
                    }
                })
            })
    };

    const register = userInfo => {
        postItem('users', userInfo)
            .then(r => login(r));
    };

    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("credentials");
    };

    return {isAuthenticated, logout, login, register};
};
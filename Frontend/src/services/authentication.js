import axios from 'axios';
import config from '../config';

const baseUrl = config.backend.baseUrl + '/authentication';

const signup = payload => {
    const request = axios.post(baseUrl + "/signup", payload);

    return request.then(response => response.data);
};

const login = payload => {
    axios.defaults.withCredentials = true;
    const request = axios.post(baseUrl + "/login", payload, { credentials: 'include' });

    return request.then(response => response.data);
};

const sendEmail = payload => {
    const request = axios.post(baseUrl + "/forgotPassword", payload);

    return request.then(response => response.data);
}

const loginAdmin = payload => {
    axios.defaults.withCredentials = true;
    const request = axios.post(baseUrl + "/adminLogin", payload, { credentials: 'include' });

    return request.then(response => response.data);
}

const logout = () => {
    const request = axios.get(baseUrl + "/logout");

    return request.then(response => response.data);
}

const logOK = () => {
    axios.defaults.withCredentials = true;
    const request = axios.get(baseUrl + "/logOK", {}, { 'withCredentials': true });

    return request.then(response => response.data);
}

const verifyUser = () => {
    const request = axios.get(baseUrl + "/validUser");

    return request.then(response => response.data);
}

const deleteUser = id => {
    const request = axios.delete(baseUrl + "/deleteUser/" + id);

    return request.then(response => response.data);
}

const updateUser = (id, payload) => {
    const request = axios.put(baseUrl + "/updateUser/" + id, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json'
        }, 'withCredentials': true
    });

    return request.then(response => response.data);
}

const authenticationService = {
    signup,
    login,
    sendEmail,
    loginAdmin,
    logout,
    logOK,
    verifyUser,
    deleteUser,
    updateUser
}

export default authenticationService;
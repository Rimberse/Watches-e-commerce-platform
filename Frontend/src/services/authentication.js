import axios from 'axios';
import config from '../config';

const baseUrl = config.backend.baseUrl + '/authentication';

const signup = payload => {
    const request = axios.post(baseUrl + "/signup", payload);

    return request.then(response => response.data);
};

const login = payload => {
    const request = axios.post(baseUrl + "/login", payload);

    return request.then(response => response.data);
};

const sendEmail = payload => {
    const request = axios.post(baseUrl + "/forgotPassword", payload);

    return request.then(response => response.data);
}

const loginAdmin = payload => {
    const request = axios.post(baseUrl + "/adminLogin", payload);

    return request.then(response => response.data);
}

const authenticationService = {
    signup,
    login,
    sendEmail,
    loginAdmin
}

export default authenticationService;
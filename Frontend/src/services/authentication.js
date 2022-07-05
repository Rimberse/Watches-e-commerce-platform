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

const authenticationService = {
    signup,
    login,
    sendEmail
}

export default authenticationService;
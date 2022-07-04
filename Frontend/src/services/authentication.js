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

const authenticationService = {
    signup,
    login
}

export default authenticationService;
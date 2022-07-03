import axios from 'axios';
import config from '../config';

const baseUrl = config.backend.baseUrl + '/transaction';

const retrieve = page => {
    const queryString = `?page=${page}`;
    const request = axios.get(baseUrl + queryString);

    return request.then(response => response.data);
}

const store = payload => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const request = axios.post(baseUrl, JSON.stringify(payload), config);
    return request.then(response => response.data);
}

const transactionService = {
    retrieve,
    store
};

export default transactionService;
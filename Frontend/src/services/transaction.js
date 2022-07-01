import axios from 'axios';
import config from '../config';

const baseUrl = config.backend.baseUrl + '/transaction';

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
   store
};

export default transactionService;
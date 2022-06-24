import axios from 'axios';
import config from '../config';

const baseUrl = config.backend.baseUrl + '/shop';

const getAll = page => {
    const queryString = `?page=${page}`;
    const request = axios.get(baseUrl + queryString);

    return request.then(response => response.data);
};

const getQuantity = () => {
    const request = axios.get(baseUrl + '/quantity');
    return request.then(response => response.data);
}

const shopService = {
    getAll,
    getQuantity
};

export default shopService;
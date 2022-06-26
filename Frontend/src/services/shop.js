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

const addWatch = payload => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const request = axios.post(baseUrl, JSON.stringify(payload), config);
    return request.then(response => response.data);
}

const modifyWatch = (IdWatches, payload) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const request = axios.put(baseUrl + '/' + IdWatches, JSON.stringify(payload), config);
    return request.then(response => response.data);
}

const removeWatch = IdWatches => {
    const request = axios.delete(baseUrl + '/' + IdWatches);
    return request.then(response => response.data);
}

const shopService = {
    getAll,
    getQuantity,
    addWatch,
    modifyWatch,
    removeWatch
};

export default shopService;
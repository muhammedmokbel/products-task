import axios from 'axios';
import {PRODUCTS_URL, PRODUCTS_LIMIT} from '../constants';

const fetchFaces = async (page, sortBy) => {
    return await axios.get(`${PRODUCTS_URL}?_limit=${PRODUCTS_LIMIT}&_page=${page}${sortBy ? `&_sort=${sortBy}`:""}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export default fetchFaces;
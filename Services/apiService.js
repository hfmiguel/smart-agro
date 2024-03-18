import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.cnptia.embrapa.br/smartsolos/expert/v1';
const TOKEN = process.env.EXPO_PUBLIC_TOKEN || 'd6d7c265-a8a1-3734-8d19-2c46f0ee04ef'

const apiService = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/json'
    },
});

export default apiService;

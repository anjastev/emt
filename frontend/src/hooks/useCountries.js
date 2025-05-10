import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/countries';

export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(API_URL);
            setCountries(response.data);
        } catch (err) {
            console.error('Failed to fetch countries:', err);
        } finally {
            setLoading(false);
        }
    };

    const addCountry = async (country) => {
        await axios.post(API_URL, country);
        await fetchCountries();
    };

    const updateCountry = async (id, updatedCountry) => {
        await axios.put(`${API_URL}/${id}`, updatedCountry);
        await fetchCountries();
    };

    const deleteCountry = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        await fetchCountries();
    };

    useEffect(() => {

        const loadCountries = async () => {
            await fetchCountries();
        };
        loadCountries();
    }, []);

    return { countries, loading, addCountry, updateCountry, deleteCountry };
};

import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/authors';

export const useAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get(API_URL);
            setAuthors(response.data);
        } catch (err) {
            console.error('Failed to fetch authors:', err);
        } finally {
            setLoading(false);
        }
    };

    const addAuthor = async (author) => {
        await axios.post(API_URL, author);
        await fetchAuthors();
    };

    const updateAuthor = async (id, updatedAuthor) => {
        await axios.put(`${API_URL}/${id}`, updatedAuthor);
        await fetchAuthors();
    };

    const deleteAuthor = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        await fetchAuthors();
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    return { authors, loading, addAuthor, updateAuthor, deleteAuthor };
};

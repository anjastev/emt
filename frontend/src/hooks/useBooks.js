import { useState, useEffect } from "react";
import axios from "axios";

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = () => {
        setLoading(true);
        axios.get("http://localhost:8080/api/books")
            .then(res => setBooks(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const addBook = async (data) => {
        await axios.post("http://localhost:8080/api/books", data);
        fetchBooks();
    };

    const updateBook = async (id, data) => {
        await axios.put(`http://localhost:8080/api/books/${id}`, data);
        fetchBooks();
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8080/api/books/${id}`);
        fetchBooks();
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return { books, loading, addBook, updateBook, deleteBook };
};

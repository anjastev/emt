import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import BookModal from './BookModal';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editBook, setEditBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://localhost:8080/api/books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    };

    const handleAddBook = () => {
        setEditBook(null);
        setShowModal(true);
    };

    const handleEditBook = (book) => {
        setEditBook(book);
        setShowModal(true);
    };

    const handleDeleteBook = (id) => {
        axios.delete(`http://localhost:8080/api/books/${id}`)
            .then(() => {
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => {
                console.error('Error deleting book:', error);
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditBook(null);
    };

    const handleSaveBook = (savedBook) => {
        if (editBook) {
            setBooks(books.map(b => b.id === savedBook.id ? savedBook : b));
        } else {
            setBooks([...books, savedBook]);
        }
        closeModal();
    };

    return (
        <div className="book-list">
            <h2>Book List</h2>
            <button className="add-book-btn" onClick={handleAddBook}>Add New Book</button>
            <div className="book-items">
                {books.map(book => (
                    <BookItem
                        key={book.id}
                        book={book}
                        onEdit={handleEditBook}
                        onDelete={handleDeleteBook}
                    />
                ))}
            </div>
            {showModal && (
                <BookModal
                    book={editBook}
                    onClose={closeModal}
                    onSave={handleSaveBook}
                />
            )}
        </div>
    );
};

export default BookList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthorItem from './AuthorItem';
import AuthorModal from './AuthorModal';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editAuthor, setEditAuthor] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/authors')
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.error('Error fetching authors:', error);
            });
    }, []);

    const handleAddAuthor = () => {
        setShowModal(true);
        setEditAuthor(null);
    };

    const handleEditAuthor = (author) => {
        setEditAuthor(author);
        setShowModal(true);
    };

    const handleDeleteAuthor = (id) => {
        axios.delete(`http://localhost:8080/api/authors/${id}`)
            .then(() => {
                setAuthors(authors.filter(author => author.id !== id));
            })
            .catch(error => {
                console.error('Error deleting author:', error);
            });
    };

    const closeModal = () => {
        setShowModal(false);
        setEditAuthor(null);
    };

    return (
        <div className="author-list">
            <h2>Author List</h2>
            <button className="add-author-btn" onClick={handleAddAuthor}>Add New Author</button>
            <div className="author-items">
                {authors.map(author => (
                    <AuthorItem
                        key={author.id}
                        author={author}
                        onEdit={handleEditAuthor}
                        onDelete={handleDeleteAuthor}
                    />
                ))}
            </div>
            {showModal && (
                <AuthorModal
                    author={editAuthor}
                    onClose={closeModal}
                    onSave={(updatedAuthor) => {
                        if (editAuthor) {
                            setAuthors(authors.map(a => a.id === updatedAuthor.id ? updatedAuthor : a));
                        } else {
                            setAuthors([...authors, updatedAuthor]);
                        }
                        closeModal();
                    }}
                />
            )}
        </div>
    );
};

export default AuthorList;

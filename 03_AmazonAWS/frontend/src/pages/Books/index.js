import React, { useState, useEffect } from 'react';

import logoImage from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import api from '../../services/api'

import './styles.css'

export default function Books() {

    const [books, setBooks] = useState([]);    
    const [page, setPage] = useState(1);

    async function fetchMoreBooks() {
        const response = await api.get(`book`, {
            params: {
                page: page
            }
        });

        setBooks([ ...books, ...response.data.books]);
        setPage(page + 1);
    }
    
    useEffect(() => {
        fetchMoreBooks();
        // eslint-disable-next-line
    }, []);

    const history = useHistory();

    async function editBook(id){
        try {
            history.push(`book/new/${id}`);
        } catch (err) {
            alert('Edit book failed! Try again!'); 
        }
    }

    async function deleteBook(id){
        try {
            await api.delete(`book/${id}`)

            setBooks(books.filter(book => book.id !== id))
        } catch (err) {
            alert('Delete failed! Try again!'); 
        }
    }

    return (
        <div className="book-container" >
            <header>
                <img src={logoImage} alt="Erudio" />
                <span>Welcome, <strong>USERNAME</strong>!</span>

                <Link className="button" to="book/new/0">Add New Book</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>

            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(book.price)}</p>
                        <strong>Release Date:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR').format(new Date(book.launchDate))}</p>
    
                        <button onClick={() => editBook(book.id)} type="button">
                            <FiEdit size={20} color="#251FC5" padding-right="25px"/>
                        </button>
    
                        <button onClick={() => deleteBook(book.id)} type="button">
                            <FiTrash2 size={20} color="#251FC5" />
                        </button>
                    </li>    
                ))}         
            </ul>
            <button className="button" onClick={fetchMoreBooks} type="button">Load More</button>

        </div>
    );
}
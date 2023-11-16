'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './page.module.css'

export default function Home() {
  const [bookTitle, setBookTitle] = useState('')
  const dispatch = useDispatch()
  const books = useSelector((state: {
    books: {
      title: string,
      inBasket: boolean,
      liked: boolean,
    }[]
  }) => state.books)
  const basket = useSelector((state: { basket: string[] }) => state.basket)
  const likedBooks = useSelector((state: {
    likedBooks: string[]
  }) => state.likedBooks)

  const handleAddBook = () => {
    const newBook = {
      title: bookTitle,
      inBasket: false,
      liked: false,
    }

    dispatch({ type: 'ADD_BOOK', payload: newBook })
    setBookTitle('')
  }

  const handleAddToBasket = (book: string) => {
    dispatch({ type: 'ADD_TO_BASKET', payload: book })
  }

  const handleAddToLiked = (book: string) => {
    dispatch({ type: 'ADD_TO_LIKED', payload: book })
  }

  return (
    <div className="container">
      <div>
        <h1>My Book List</h1>
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter a book title.."
          value={bookTitle}
          onChange={e => setBookTitle(e.target.value)}
        />

        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <div>
        <h2>My Books</h2>
        <ul>
          {books.map((book, index: string | number) => (
            <li key={index}>
              <p>{book.title}</p>

              <div>
                <button onClick={() => handleAddToBasket(book.title)}>{
                  !book.inBasket
                    ? 'Add to Basket'
                    : 'In Basket'
                }</button>
                <button onClick={() => handleAddToLiked(book.title)}>{
                  !book.liked
                    ? 'Add to Liked'
                    : 'Liked'
                }</button>
              </div>
            </li>
          ))}
        </ul>

        <h2>My Basket ({basket.length})</h2>
        <ul>
          {basket.map((item, index: string | number) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>

        <h2>Liked Books ({likedBooks.length})</h2>
        <ul>
          {likedBooks.map((item, index: string | number) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

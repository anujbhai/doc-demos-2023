'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './page.module.css'

export default function Home() {
  const [bookTitle, setBookTitle] = useState('')
  const dispatch = useDispatch()
  const books = useSelector(state => state.books)
  const basket = useSelector(state => state.basket)
  const likedBooks = useSelector(state => state.likedBooks)

  const handleAddBook = () => {
    dispatch({type: 'ADD_BOOK', payload: bookTitle})
    setBookTitle('')
  }

  const handleAddToBasket = (book) => {
    dispatch({type: 'ADD_TO_BASKET', payload: book})
  }

  const handleAddToLiked = (book) => {
    dispatch({type: 'ADD_TO_LIKED', payload: book})
  }

  return (
    <>
      {console.log('bookTitle:', bookTitle)}
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
              <p>{book}</p>

              <div>
                <button onClick={() => handleAddToBasket(book)}>Add to basket</button>
                <button onClick={() => handleAddToLiked(book)}>Add to liked</button>
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
    </>
  )
}

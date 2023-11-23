'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  RemoveShoppingCart,
} from '@mui/icons-material'

import styles from './page.module.css'
import {
  addBook,
  addToBasket,
  addToLikedBooks,
} from "../../store";

interface RootState {
  books: {
    title: string
    inBasket: boolean
    liked: boolean
  }[]
  basket: string[]
  likedBooks: string[]
}

export default function Home() {
  const [bookTitle, setBookTitle] = useState('')
  const dispatch = useDispatch()
  const books = useSelector((state: RootState) => state.books)
  const basket = useSelector((state: RootState) => state.basket)
  const likedBooks = useSelector((state: RootState) => state.likedBooks)

  const handleAddBook = () => {
    const newBook = {
      title: bookTitle,
      inBasket: false,
      liked: false,
    }

    dispatch(addBook(newBook))
    setBookTitle('')
  }

  const handleAddToBasket = (book: string) => {
    dispatch(addToBasket(book))
  }

  const handleAddToLiked = (book: string) => {
    dispatch(addToLikedBooks(book))
  }

  return (
    <div className="container">
      <div>
        <h1>My Book List</h1>
      </div>

      <div className="add-book">
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
        <ul className="book-list">
          {books.map((book, index: string | number) => (
            <Card key={index} className="book-card">
              <CardContent>
                <Typography variant="h5" component="h2">{book.title}</Typography>
              </CardContent>

              <CardActions>
                <Button
                  startIcon={book.inBasket ? <RemoveShoppingCart /> : <AddShoppingCart />}
                  onClick={() => handleAddToBasket(book.title)}
                >{!book.inBasket
                  ? 'Add'
                  : 'Remove'
                }</Button>
                <Button
                  startIcon={book.liked ? <Favorite /> : <FavoriteBorder />}
                  onClick={() => handleAddToLiked(book.title)}
                >{!book.liked
                  ? 'Like'
                  : 'Liked'
                }</Button>
              </CardActions>
            </Card>
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

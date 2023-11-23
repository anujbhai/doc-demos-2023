import {
  configureStore,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

interface Book {
  title: string,
  inBasket: boolean,
  liked: boolean,
}

interface BookState {
  books: Book[],
  basket: string[],
  likedBooks: string[],
}

const initialState: BookState = {
  books: [
    { title: 'Rich Dad, Poor Dad', inBasket: false, liked: false },
    { title: 'Atomic Habits', inBasket: false, liked: false },
    { title: 'The Intelligent Investor', inBasket: false, liked: false },
    { title: '7 Habits of Highly Effective People', inBasket: false, liked: false },
  ],
  basket: [],
  likedBooks: []
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload)
    },
    addToBasket: (state, action: PayloadAction<String>) => {
      state.books = state.books.map(book => {
        if (book.title === action.payload) {
          return {...book, inBasket: !book.inBasket}
        }

        return book
      })

      if (state.basket.includes(action.payload)) {
        state.basket = state.basket.filter(movie => movie !== action.payload)
      } else {
        state.basket.push(action.payload)
      }
    },
    addToLikedBooks: (state, action: PayloadAction<string>) => {
      state.books = state.books.map(book => {
        if (book.title === action.payload) {
          return {...book, liked: !book.liked}
        }

        return book
      })

      if (state.likedBooks.includes(action.payload)) {
        state.likedBooks = state.likedBooks.filter(book => book !== action.payload)
      } else {
        state.likedBooks.push(action.payload)
      }
    }
  }
})

const store = configureStore({ reducer: bookSlice.reducer })

export const {addBook, addToBasket, addToLikedBooks} = bookSlice.actions

export default store


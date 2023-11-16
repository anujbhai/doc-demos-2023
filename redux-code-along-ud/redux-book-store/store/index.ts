import { createStore } from 'redux'

type Book = {
  title: string,
  inBasket: boolean,
  liked: boolean,
}

type State = {
  books: Book[],
  basket: string[],
  likedBooks: string[],
}

type Action = {type: 'ADD_BOOK', payload: Book}
  | {type: 'ADD_TO_BASKET', payload: string}
  | {type: 'ADD_TO_LIKED', payload: string}

const initialState = {
  books: [
    { title: 'Rich Dad, Poor Dad', inBasket: false, liked: false },
    { title: 'Atomic Habits', inBasket: false, liked: false },
    { title: 'The Intelligent Investor', inBasket: false, liked: false },
    { title: '7 Habits of Highly Effective People', inBasket: false, liked: false },
  ],
  basket: [],
  likedBooks: []
}

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] }
    case 'ADD_TO_BASKET':
      return {
        ...state,
        books: state.books.map(
          book => book.title === action.payload
          ? { ...book, inBasket: !book.inBasket }
          : book
        ),
        basket: state.basket.includes(action.payload)
          ? state.basket.filter(book => book !== action.payload)
          : [...state.basket, action.payload]
      }
    case 'ADD_TO_LIKED':
      return {
        ...state,
        books: state.books.map(
          book => book.title === action.payload
          ? { ...book, liked: !book.liked }
          : book
        ),
        likedBooks: state.likedBooks.includes(action.payload)
          ? state.likedBooks.filter(book => book !== action.payload)
          : [...state.likedBooks, action.payload]
      }
    // case 'REMOVE_FROM_BASKET':
    //   return { ...state, basket: state.basket.filter(book => book.id !== action.payload) }
    // case 'REMOVE_FROM_LIKED':
    //   return { ...state, likedBooks: state.likedBooks.filter(book => book.id !== action.payload) }
    default:
      return state
  }
}

const store = createStore(reducer, initialState)

export default store


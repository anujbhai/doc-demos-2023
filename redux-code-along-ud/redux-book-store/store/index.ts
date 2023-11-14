import { createStore } from 'redux'

const initialState = {
  books: [],
  basket: [],
  likedBooks: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] }
    case 'ADD_TO_BASKET':
      return { ...state, basket: [...state.basket, action.payload] }
    case 'ADD_TO_LIKED':
      return { ...state, likedBooks: [...state.likedBooks, action.payload] }
    case 'REMOVE_FROM_BASKET':
      return { ...state, basket: state.basket.filter(book => book.id !== action.payload) }
    case 'REMOVE_FROM_LIKED':
      return { ...state, likedBooks: state.likedBooks.filter(book => book.id !== action.payload) }
    default:
      return state
  }
}

const store = createStore(reducer, initialState)

export default store


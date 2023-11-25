import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {id: '1', title: 'First Post!', content: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.'},
  {id: '2', title: 'Another Post!', content: 'Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.'},
  {id: '3', title: 'Yet Another Post!', content: 'Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.'},
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  },
})

console.log('Initial state:', initialState)

export const {postAdded} = postsSlice.actions

export default postsSlice.reducer


import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
  {id: '1', title: 'First Post!', content: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.'},
  {id: '2', title: 'Another Post!', content: 'Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim.'},
  {id: '3', title: 'Yet Another Post!', content: 'Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.'},
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          }
        }
      }
    },
    postUpdated(state, action) {
      const {id, title, content} = action.payload
      const existingPost = state.find(post => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  },
})

console.log('Initial state:', initialState)

export const {postAdded, postUpdated} = postsSlice.actions

export default postsSlice.reducer


import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {id: '0', name: 'Wes Bos'},
  {id: '1', name: 'Yehuda Katz'},
  {id: '2', name: 'Jeremy McPeak'},
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer


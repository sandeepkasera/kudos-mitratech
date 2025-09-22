import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  weeklyRemaining: 3,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.currentUser = null;
    },
    setWeeklyRemaining(state, action) {
      state.weeklyRemaining = action.payload;
    }
  }
})

export const { setUser, clearUser, setWeeklyRemaining } = userSlice.actions
export default userSlice.reducer

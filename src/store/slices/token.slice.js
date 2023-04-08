import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const tokenSlice = createSlice({
	name: 'token',
    initialState: {},
    reducers: {
        setToken: (state, action) => {
            return action.payload
        }
    }
})

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
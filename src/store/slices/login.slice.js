import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const loginSlice = createSlice({
	name: 'login',
    initialState: false,
    reducers: {
        setlogin: (state, action) => {
            return action.payload
        }
    }
})

export const { setlogin } = loginSlice.actions;

export default loginSlice.reducer;
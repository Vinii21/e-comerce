import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isLoadingSlice = createSlice({
	name: 'isLoading',
    initialState: false,
    reducers: {
        setIsLoading: (state, action) => {
            return action.payload
        }
    }
})

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const carSlice = createSlice({
	name: 'car',
    initialState: [],
    reducers: {
        setCar: (state, action) => {
            return action.payload
        }
    }
})

export const { setCar } = carSlice.actions;


export const addCarThunk = (data, product) => dispatch => {
    dispatch(setIsLoading(true))
    
    axios.post( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, product, { headers: { Authorization: `Bearer ${data.token}` } } )
    .then(()=>{
        console.log(product)
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export default carSlice.reducer;
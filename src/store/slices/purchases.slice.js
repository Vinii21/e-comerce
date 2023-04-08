import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const purchasesSlice = createSlice({
	name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
})

export const { setPurchases } = purchasesSlice.actions;

export const getPurchasesThuk = (data) => dispatch => {
    dispatch(setIsLoading(true))

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", { headers: { Authorization: `Bearer ${data.token}` } } )
    .then( resp => {
        dispatch(setPurchases(resp.data))
        console.log("Entro al then de purchases", resp.data)
    })
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export default purchasesSlice.reducer;
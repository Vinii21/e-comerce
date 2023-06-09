import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../helpers/getConfig';

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

export const getPurchasesThuk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig() )
    .then( resp => {
        dispatch(setPurchases(resp.data))
    })
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const addPurchasesThuk = () => dispatch => {
    axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, getConfig() )
    .then()
    .catch(error=>console.error(error))
}

export default purchasesSlice.reducer;
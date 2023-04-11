import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../helpers/getConfig';

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


export const getCarThunk =() => dispatch =>{
    dispatch(setIsLoading(true))
    
    axios.get( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig() )
    .then((resp)=>{
        dispatch(setCar(resp.data))
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const addCarThunk = (product) => dispatch => {
    dispatch(setIsLoading(true))
    
    axios.post( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, product, getConfig() )
    .then(()=>{
        Swal.fire('Agregado al Carrito')
        // console.log(product)
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const deleteCarThunk = (idCarProduct) =>dispatch =>{
    dispatch(setIsLoading(true))
    
    axios.delete( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${idCarProduct}`, getConfig() )
    .then(()=>{
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const updateCarThunk =(idCarProduct,quantity) =>dispatch=>{
    dispatch(setIsLoading(true))
    axios.put( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${idCarProduct}`, quantity, getConfig() )
    .then(()=>{
        Swal.fire('Actualizado en el Carrito')
    })
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const { setCar } = carSlice.actions;

export default carSlice.reducer;
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
    axios.get( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig() )
    .then((resp)=>{
        dispatch(setCar(resp.data))
    })
    .catch(error=>console.log(error))
}

export const addCarThunk = (product) => dispatch => {
    
    axios.post( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, product, getConfig() )
    .then(()=>{
        Swal.fire('Agregado al Carrito')
    })
    .catch(error=>console.log(error))
}

export const deleteCarThunk = (idCarProduct) =>dispatch =>{
    
    axios.delete( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${idCarProduct}`, getConfig() )
    .then(()=>{
    })
    .catch(error=>console.log(error))
}

export const updateCarThunk =(idCarProduct,quantity) =>dispatch=>{
    axios.put( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${idCarProduct}`, quantity, getConfig() )
    .then()
    .catch(error=>console.error(error))
}

export const { setCar } = carSlice.actions;

export default carSlice.reducer;
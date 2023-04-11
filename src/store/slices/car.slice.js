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



export const getCarThunk =(tokenData) => dispatch =>{
    dispatch(setIsLoading(true))
    
    axios.get( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, { headers: { Authorization: `Bearer ${tokenData.token}` } } )
    .then((resp)=>{
        dispatch(setCar(resp.data))
        // console.log('entro a them getCar'+resp.data)
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const addCarThunk = (data, product) => dispatch => {
    dispatch(setIsLoading(true))
    
    axios.post( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, product, { headers: { Authorization: `Bearer ${data.token}` } } )
    .then(()=>{
        Swal.fire('Agregado al Carrito')
        // console.log(product)
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const deleteCarThunk = (dataToken,idCarProduct) =>dispatch =>{
    dispatch(setIsLoading(true))
    
    axios.delete( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${idCarProduct}`,{ headers: { Authorization: `Bearer ${dataToken.token}` } } )
    .then(()=>{
        // console.log(idCarProduct)
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const updateCarThunk =(dataToken,idCarProduct,quantity) =>dispatch=>{
    dispatch(setIsLoading(true))
    axios.put( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${idCarProduct}`, quantity,{ headers: { Authorization: `Bearer ${dataToken.token}` } } )
    .then(()=>{
        Swal.fire('Actualizado en el Carrito')
    })
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const { setCar } = carSlice.actions;

export default carSlice.reducer;
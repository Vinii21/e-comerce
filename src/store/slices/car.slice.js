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

const token = localStorage.getItem("token")

export const getCarThunk =() => dispatch =>{
    axios.get( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig() )
    .then((resp)=>{
        dispatch(setCar(resp.data))
    })
    .catch(error=>{
        if(token){
            console.log("State 200")
        } else if(token === null) {
            console.log("State 403, However, you just have to log in to solve it. :)")
        } else {
            console.log(error)
        }
    })
}

export const addCarThunk = (product) => dispatch => {
    
    axios.post( `https://e-commerce-api-v2.academlo.tech/api/v1/cart`, product, getConfig() )
    .then(()=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1000
        })
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
    .then(()=>dispatch(getCarThunk()))
    .catch(error=>console.error(error))
}

export const { setCar } = carSlice.actions;

export default carSlice.reducer;
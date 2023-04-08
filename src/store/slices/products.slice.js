import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const productsSlice = createSlice({
	name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then( resp => dispatch(setProducts(resp.data)))
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const filterCategoriesThunk = (id) => dispatch => {
    dispatch(setIsLoading(true)) 

    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
    .then(resp=>dispatch(setProducts(resp.data )))
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const filterHeadLineThunk = valueInput => dispatch => {
    dispatch(setIsLoading(true))

    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${valueInput}`)
    .then(resp=>dispatch(setProducts(resp.data)))
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const filterDetailThunk = (categoryId, productId) => dispatch => {
    dispatch(setIsLoading(true))
    
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${categoryId}`)
    .then(resp=>{
        let result = resp?.data?.filter( p => p.id !== parseInt(productId) )
        dispatch(setProducts(result))
    })
    .catch(error=>console.log(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const filterPriceThunk = (min, max) => dispatch => {
    dispatch(setIsLoading(true))

    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then( resp => {
        let result = resp?.data?.filter(p => p.price >= parseInt(min) && p.price <= parseInt(max))
        dispatch(setProducts(result))
    })
    .catch(error=>console.error(error))
    .finally(()=>dispatch(setIsLoading(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
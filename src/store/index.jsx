import { configureStore } from '@reduxjs/toolkit'
import products from "./slices/products.slice"
import isLoading from "./slices/isLoading.slice"
import token from "./slices/token.slice"

export default configureStore({
  reducer: {
    products, isLoading, token
	}
})
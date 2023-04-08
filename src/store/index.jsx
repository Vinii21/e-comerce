import { configureStore } from '@reduxjs/toolkit'
import products from "./slices/products.slice"
import isLoading from "./slices/isLoading.slice"
import login from "./slices/login.slice"

export default configureStore({
  reducer: {
    products, isLoading, login
	}
})
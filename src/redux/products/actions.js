import * as actionTypes from './actionTypes'

export const getProducts = (limit = 20, page = 1) => ({
    type: actionTypes.GET_PRODUCTS,
    payload: { limit, page }
})

export const getProductsSuccess = (data) => ({
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: data
})
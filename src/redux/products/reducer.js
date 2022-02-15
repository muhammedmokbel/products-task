import * as actionTypes from './actionTypes'

const initState = {
    isloading: false,
    products: [],
    page: 1,
    limit: 20
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case actionTypes.GET_PRODUCTS:

            return {
                ...state,
                isloading: true,
                page: state.page + 1
            }
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                isloading: false,
                products: state.products.concat(action.payload)
            }
        default: return state

    }

}
export default reducer
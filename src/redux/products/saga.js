
import * as actionTypes from './actionTypes'
import { put, call, takeEvery } from 'redux-saga/effects'
import request from '../../services/request'

import * as serviceObjects from '../../services/serviceObjects'
import { getProductsSuccess } from './actions'

// workers
function* productsWorker({ payload: { page, limit } }) {

    const serviceObject = serviceObjects.productsServiceObject(page, limit)
    const respond = yield call(request, serviceObject)

    yield put(getProductsSuccess(respond.data))

}



// watchers 
export default function* productsWatchers() {
    yield takeEvery(actionTypes.GET_PRODUCTS, productsWorker)
}




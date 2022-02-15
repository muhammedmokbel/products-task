import { all, fork } from 'redux-saga/effects'


import productsWatchers from './products/saga'


export default function* rootSagas() {
    yield all([
        fork(productsWatchers)

    ])
}
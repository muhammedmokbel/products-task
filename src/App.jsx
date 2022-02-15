import { useState, useEffect } from 'react'
import "./index.css";

import { connect } from 'react-redux'
import { getProducts } from './redux/products/actions';


const App = (props) => {
    // const [page, setPage] = useState(1)
    // const [limit, setLimit] = useState(20)
    const {
        getProducts,
        products,
        page
    } = props

    useEffect(() => {
        getProducts()

    }, [])

    useEffect(() => {


    }, [products])
    useEffect(() => {


    }, [page])



    return (
        <div className='container'>
            <div className='row'>
                {products.length ? products.map(product => (
                    <div class="col-md-3 my-3 text-center" >
                        <div className='card' style={{ height: "200px" }}>
                            <p style={{ fontSize: product.size + "px" }}> {product.face} </p>
                            <div class="card-body">
                                <h5 class="card-title">{`$ ${product.price}`}</h5>
                                <p class="card-text"> {product.date} </p>
                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    products: state.productsReducer.products,
    page: state.productsReducer.page
})

const mapDispatchtoProps = dispatch => ({
    getProducts: (limit, page) => dispatch(getProducts(limit, page))
})


export default connect(mapStateToProps, mapDispatchtoProps)(App);

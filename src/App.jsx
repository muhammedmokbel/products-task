import { useState, useEffect } from 'react'
import Header from './components/Header'
import ActionsBar from './components/ActionBar/index';
import FacesContent from './components/FacesContent/index';
import "./index.css";
import MainContext from './utils/MainContext';
import fetchFaces from './api/fetchFaces';

const App = (props) => {
    const [data, setData] = useState([]);
    const [cart, addToCart] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [page, setPage] = useState(1);
    const [sortValue, setSortValue] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    useEffect(async () => {
        const fetchData = async () => {
            setIsFetching(true)
            return await fetchFaces(0)
        }
        const {data} = await fetchData();
        setData(data);
        setIsFetching(false)
    }, [])


    return (
        <MainContext.Provider value={{
            data,
            setData,
            isFetching,
            setIsFetching,
            page,
            setPage,
            cart,
            addToCart,
            sortValue,
            setSortValue,
            cartQuantity, 
            setCartQuantity
        }}>
            <Header />
            <ActionsBar />
            <FacesContent />
        </MainContext.Provider>
    )
}

export default App;

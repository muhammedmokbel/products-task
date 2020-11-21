import { useContext, useEffect, useState } from 'react';

import MainContext from '../../utils/MainContext';
import styled from 'styled-components';
import fetchFaces from '../../api/fetchFaces';
import PropagateLoader from "react-spinners/PropagateLoader";
import Ad from '../Ad/index';


export const StyledFaceItem = styled.div`
    border: 2px solid darkgray;
    width: 25%;
    margin: 1em;
    padding: 1em;
    text-align:center;
`
const WrapperLoading = styled.div`
    padding:50px;
    text-align:center;
    display: flex;
    justify-content: center;
`
const StyledSpan = styled.span`
    font-size:16px;
    margin-bottom:5px;
    ${props => props.date ? `
        font-size:12px;
        margin-bottom:15px
    ` : ``}
`

const StyledButton = styled.button`
    box-shadow:inset 0px 1px 0px 0px #54a3f7;
	background:linear-gradient(to bottom, #007dc1 5%, #0061a7 100%);
	background-color:#007dc1;
	border-radius:3px;
	border:1px solid #124d77;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:13px;
	padding:6px 24px;
	text-decoration:none;
    text-shadow:0px 1px 0px #154682;
    &:hover{
        background:linear-gradient(to bottom, #0061a7 5%, #007dc1 100%);
	    background-color:#0061a7;
    }
    &:active{
        position:relative;
	    top:1px;
    }
`

const FacesItem = props => {
    const { id, size, price, face, date } = props?.item;
    const context = useContext(MainContext);
    const { cart, addToCart, setCartQuantity } = context;
    const handleAddItem = () => {
        setCartQuantity((e) => ++e);
        const itemExsitsIndex = cart.findIndex(({ item }) => item.id === id);
        if (itemExsitsIndex !== -1){
            cart[itemExsitsIndex]['item']['quantity'] = cart[itemExsitsIndex]['item']['quantity'] + 1;
            addToCart([...cart])
        } else { 
            const newItem = {...props.item, quantity: 1}
            addToCart([...cart, {item: newItem}])
        }
    }

    return <StyledFaceItem>
        <h2>{face}</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <StyledSpan>{`Price: ${price}$`}</StyledSpan>
            <StyledSpan>{`Size: ${size}`}</StyledSpan>
            <StyledSpan date={true}>{date}</StyledSpan>
        </div>
        <StyledButton onClick={handleAddItem}>Add to cart</StyledButton>
    </StyledFaceItem>
}

const FacesContent = props => {
    const context = useContext(MainContext);
    const [loadingMore, setLoadingMore] = useState(false)
    const { data = [], sortValue, setData, isFetching, setIsFetching, page, setPage } = context;
    useEffect(async () => {
        let sortedResult = data;
        if (["price", "size"].includes(sortValue)) {
            setIsFetching(true)
            const { data: sortedData } = await fetchFaces(page, sortValue);
            setIsFetching(false);
            sortedResult = sortedData
        } else {
            sortedResult = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        setData([...sortedResult]);
    }, [sortValue])

    const handleScroll = async ({ target }) => {
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            setLoadingMore(true)
            const { data: extraData } = await fetchFaces(page);
            setPage(pre => ++pre);
            setLoadingMore(false)
            setData([...data, ...extraData])
        }
    }

    if (isFetching) {
        return <WrapperLoading>
            <PropagateLoader
                color={"#654fa3"}
            />
        </WrapperLoading>
    }

    return <>
        <div className={'faces-content'} onScroll={handleScroll}>
            {data.length && data.map((item,index) => {
                return ((index + 1) % 20) !== 0 ? <FacesItem key={item.id} item={item} /> : <Ad />
            })}
        </div>
        {loadingMore && <WrapperLoading>
            <PropagateLoader />
        </WrapperLoading>}
    </>
}

export default FacesContent;
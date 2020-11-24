
import { useContext } from 'react';
import styled from 'styled-components';
import Select from 'react-select'
import { faShoppingCart, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonIcon from '../../shared/ButtonIcon';
import MainContext from '../../utils/MainContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const options = [
    {
        value: '', label: <span style={{ color: 'gray' }}>{"Sort By..."}</span>, isDisabled: true
    },
    { value: 'id', label: 'Id' },
    { value: 'size', label: 'Size' },
    { value: 'price', label: 'Price' },
    { value: 'date', label: 'Date' }
]

const ActionsBarWrapper = styled.div`
    margin-top:5px;
    padding:7px;
    text-align: center;
    background: rgba(17,189,239,1);
    display:flex;
    justify-content:center;
    align-items:center;
    position: relative;
`

const NotificationNumberWarpper = styled.div`
    width:23px;
    height:23px;
    border-radius: 50%;
    background: red;
    position: absolute;
    top: 2px;
    font-size: 12px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SelectWrapper = styled.div`
    width:150px;
    margin-right:10px;
`

const ButtonBuy = styled.button`
    margin: 15px;
    box-shadow: 0px 10px 14px -7px #3e7327;
	background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
	background-color:#77b55a;
	border-radius:4px;
	border:1px solid #4b8f29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:13px;
	font-weight:bold;
	padding:6px 12px;
	text-decoration:none;
	text-shadow:0px 1px 0px #5b8a3c;
`

const StyledCartItem = styled.div`
    display:flex;
    justify-content:center;
    ${({ total }) => total && "border-top: 0.5px solid"}

`

const StyledModal = styled.div`
    min-height:200px;
`

const StyledModalHeader = styled.div`
    display:flex;
    justify-content: space-between;
`

const StyledSpan = styled.span`
    font-size:18px;
    margin:25px;
`


const ActionsBar = props => {
    const context = useContext(MainContext);
    const { cart, addToCart, setSortValue, cartQuantity, setCartQuantity } = context;

    const onChange = e => {
        setSortValue(e.value)
    }
    const totalPrice = cart.reduce((acc, { item }) => {
        return (acc + item.price) * item.quantity;
    }, 0);

    const removeItem = id => {
        const {item} = cart.find(({ item }) => item.id === id);
        const index = cart.findIndex(({ item }) => item.id === id);
        let filteredArray = [];
        if(item.quantity > 1) {
            cart[index]['item']['quantity'] = cart[index]['item']['quantity'] - 1;
            filteredArray = [...cart];
        } else {
            filteredArray = cart.filter(({ item }) => item.id !== id)
        }
        addToCart(filteredArray)
        setCartQuantity(cartQuantity-1);
    }
    return <ActionsBarWrapper>
        <SelectWrapper>
            <Select
                defaultValue={options[0]}
                options={options}
                onChange={onChange}
            />
        </SelectWrapper>
        <div>
            <Popup trigger={<ButtonIcon icon={faShoppingCart} />} modal>
                {close => (
                    <StyledModal className="modal">
                        <StyledModalHeader className="header">
                            <div> My Cart </div>
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </StyledModalHeader>
                        {cart.length ?
                        <div className="content">
                            {
                                cart.length && cart.map(({ item }) => {
                                    return <StyledCartItem key={item.id}>
                                        <StyledSpan>Face: {item.face}</StyledSpan>
                                        <StyledSpan>Price: {item.price}$</StyledSpan>
                                        <h5 style={{ marginTop: 30 }}>Quantity: {item.quantity}</h5>
                                        <ButtonIcon
                                            onClick={() => removeItem(item.id)}
                                            icon={faMinusCircle}
                                            style={{ color: 'red', marginTop: 25 }}
                                        />
                                    </StyledCartItem>
                                })
                            }
                            <StyledCartItem total>
                                <StyledSpan>Total: {totalPrice}$</StyledSpan>
                            </StyledCartItem>
                            <div style={{ textAlign: 'right' }}>
                                {<ButtonBuy
                                    className="button"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Process to pay!
                                </ButtonBuy>}
                            </div>
                        </div>
                        : <StyledCartItem>
                            <h3>Your cart is empty</h3>
                        </StyledCartItem> }
                    </StyledModal>
                )}
            </Popup>
            <NotificationNumberWarpper>{cartQuantity}</NotificationNumberWarpper>
        </div>
    </ActionsBarWrapper>
}

export default ActionsBar;
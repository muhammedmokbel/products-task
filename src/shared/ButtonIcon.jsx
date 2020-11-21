import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';


const StyledButton = styled.button`
    background-color: inherit;
    border: none;
    width: 30px;
    height: 30px;
    font-size: 24px;
    color: white;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:hover{
        color: rgb(100 78 163)
    }
`

const ButtonIcon = props => {
    const { icon, ...otherProps} = props;
    return <StyledButton {...otherProps}>
        <FontAwesomeIcon icon={icon}/>
    </StyledButton>
}

export default ButtonIcon;
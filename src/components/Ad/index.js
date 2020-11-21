import { StyledFaceItem } from "../FacesContent";
import styled from 'styled-components';

const AdText = styled.h5`
    position: absolute;
    background: #59575757;
    bottom: 0px;
    width: 100%;
    left: 0px;
    height: 63px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color:black;
    margin:0;
`

const Ad = props => {
    return (
        <StyledFaceItem>
            <a target="_blank" href={""} style={{position:'relative'}}>
                <img alt="Ad Image" class="ad" src={`http://localhost:3000/ads/?r=${Math.floor(Math.random() * 1000)}`}/>
                <AdText>A word from our sponsors</AdText>
            </a>
        </StyledFaceItem>
    )
}

export default Ad;
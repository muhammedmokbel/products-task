
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    padding:20px;
    text-align: center;
    background: linear-gradient(90deg,rgb(1 104 174) 44%,rgba(17,189,239,1) 76%);
    color: white;
    font-size: 16px;
    display:flex;
    justify-content: space-between;
    align-items: center;
`


export default function Header(props) {
    return <HeaderWrapper>
       <div>
           <span>\^_^/ </span>
           <span> ASCII FACES FOR BONAT CO.</span>
       </div>
       <div style={{width:200}}>
            <span>By: Mahmoud Ihmaid</span>
       </div>
    </HeaderWrapper>
}
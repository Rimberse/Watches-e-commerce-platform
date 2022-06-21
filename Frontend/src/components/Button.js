import styled from 'styled-components'
import { Link} from 'react-router-dom'

export const Button = styled(Link)`
background: ${({primary}) => (primary ? '#000d1a' :
'CD853F')};
white-space: nowrap;
z-index: 100;
outline: none;
border: none;
min-width: 100px;
max-width: 200px;
cursor: pointer;
text-decoration: none;
transition: 0.7s;
display: flex;
justify-content: center;
align-items: center;
padding: ${({big}) => (big ? '16px 40px' : '14px 24px')};
color: ${({primary}) => (primary ? '#fff' : '#000d1a')};
font-size: ${({big}) => (big ? '20px' : '14px')};
&:hover{
    background: #cd853f;
    transform: scale(1.05);
}
`;
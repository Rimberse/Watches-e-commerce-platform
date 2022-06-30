import React from 'react'
import styled, {css} from 'styled-components/macro'
import {Link } from 'react-router-dom' 
import { menuData } from '../../data/MenuData';
import { Button } from '../Button';
import {VscThreeBars} from 'react-icons/vsc'

const Nav = styled.nav`
    background-color: #2C2D2D;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    z-index: 100;
    position: fixed;
    width: 100%;

`;

const NavLink = css`
color: #fff;
display: flex;
align-items: center;
padding: 0 1rem;
height: 100%;
cursor: pointer;
text-decoration: none

`

const Logo = styled(Link)`
    ${NavLink};
    font-style: italic;
    font-size: 32px;
    padding-top: 2px;

`;

const MenuBars = styled(VscThreeBars)`
display: none;

// le bouton s'affiche tant que la fenetre ne dépasse pas 768px de large
@media screen and (max-width: 768px) {
    display: block;
    height: 50px;
    width: 30px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 45%);
    
}
`;

const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -48px;
padding-top: 5px;


@media screen and (max-width: 768px) {
    display: none;
}
`;

const NavBtn = styled.div`
display: flex;
align-items: center;
margin-right: 24px;
padding-top: 5px;
@media screen and (max-width: 768px) {
    display: none;
}
`;

const NavMenuLinks = styled.div`

color: #fff;
display: flex;
align-items: center;
padding: 0 2rem;
height: 40px;
cursor: pointer;
&:hover{
    transition: 0.5s;
    transform: scale(1.05);
    color: #FC922E;
    
}
`

const Navbar = ({toggle}) => {
  return (
    <Nav>
        <Logo to="/">WebShop </Logo>
        <MenuBars onClick={toggle}/>
        <NavMenu>
            {menuData.map((item, index) => (
                <NavMenuLinks css={`
                    
                `} to={item.link} key={index}>
                    {item.title}
                </NavMenuLinks>
            ))}
        </NavMenu>
        <NavBtn>
            <Button to='/contact' primary='true'>Contact Us</Button>
        </NavBtn>
    </Nav>
    
  )
}

export default Navbar
import React from 'react';
import { Nav,NavLink,NavMenu,NavBtn,NavBtnLink } from './NavbarElements';

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink to="/">
            <img src={require("../../images/logo.png")} alt="logo" style={{ width: "125px", height: "90px", marginRight: "80px" }}/>
        </NavLink>
        <NavMenu>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact-us">Contact</NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to="/signup">Sign Up</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
}

export default Navbar;
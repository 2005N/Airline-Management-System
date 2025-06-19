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
            <NavBtnLink to="/signup" style={{ marginRight: "15px" }}>Sign Up</NavBtnLink>
            <NavBtnLink to="/login">Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  );
}

export default Navbar;
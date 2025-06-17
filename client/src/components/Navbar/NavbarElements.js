import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #000;
  height: 90px;
  display: flex;
  justify-content: space-between; /* ⬅️ Spread items horizontally */
  align-items: center;
  padding: 0 2rem; /* ⬅️ Space on both sides */
  z-index: 10;
  box-shadow: 0px 1px 10px #999;
  flex-wrap: wrap; /* ⬅️ Allow wrapping on small screens */
  overflow-x: hidden;
`;

export const NavLink = styled(Link)`
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 20px; /* ⬅️ space between links */
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: none; /* Optional: hide on mobile if using a hamburger menu */
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

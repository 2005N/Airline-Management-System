import {useParams} from 'react-router-dom';
import { Nav,NavLink,NavMenu,NavBtn,NavBtnLink} from '../Navbar/NavbarElements';

const CustomerNavbar = () => {
    const {id}=useParams();
  return (
    <div>
        <Nav>
            <NavMenu>
            <NavLink to={`/ViewProfile/${id}`} >
                View Profile
            </NavLink>
            <NavLink to={`/BookTicket/${id}`} >
                Book Flight
            </NavLink>
            <NavLink to={`/ViewCustomerTickets/${id}`} >
                View Tickets
            </NavLink>
            <NavLink to={`/addreview/${id}`} >
                Add Review
            </NavLink>
            </NavMenu> 
            <NavBtn>
                <NavBtnLink to='/' style={{marginLeft:'550px'}}>Logout</NavBtnLink>
            </NavBtn>
        </Nav>
    </div>
  )
}

export default CustomerNavbar
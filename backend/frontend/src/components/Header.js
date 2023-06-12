import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../actions/userAction'

function Header() {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  const userLogin= useSelector(state=> state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () =>{
    dispatch(logout())
  }

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect style={{ backgroundColor: '#FFA500', color: 'white' }}>
        <Container>
          <Link to="/">
            <Navbar.Brand className="text-white font-weight-bold">LA TUA CASA SMART</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Link to="/cart" className={`nav-link ${isCartPage ? 'active' : ''} text-white`}>
              <i className="fas fa-shopping-basket"></i> Carrello
            </Link>

              {userInfo ? (
                <NavDropdown title={<span className="text-white">{userInfo.name} </span>} id='username'>
                  <NavDropdown.Item as={Link} to="/profile">Profilo</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Esci</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link text-white">
                  <i className="fas fa-user-circle"></i> Accedi
                </Link>


              )}

              {userInfo && userInfo.isAdmin &&(
                <NavDropdown title={<span className="text-white">Admin </span>} id='adminmenue'>
                  <NavDropdown.Item as={Link} to="/admin/userlist">Utenti registrati</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/productlist">Prodotti registrati</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">Lista ordini</NavDropdown.Item>
                </NavDropdown>


              )}



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

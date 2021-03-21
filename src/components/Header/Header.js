import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleLogout } from '../Login/loginManager'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const logout = () => {
        handleLogout()
            .then(() => {
                setLoggedInUser({})
            })
    }


    return (
        <Container>
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Brand href="/home">Pick n Drop</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link><Link to='/home' className="text-dark">Home</Link></Nav.Link>
                        <Nav.Link><Link to='/destination' className="text-dark">Destination</Link></Nav.Link>
                        <Nav.Link><Link to='/blog' className="text-dark">Blog</Link></Nav.Link>
                        <Nav.Link><Link to='/contact' className="text-dark">Contact</Link></Nav.Link>
                        {
                            loggedInUser.displayName && <Nav.Link className="disabled text-primary">{loggedInUser.displayName}</Nav.Link>
                        }
                        {
                            !loggedInUser.email
                                ? <Link to='/login' className="btn btn-primary">Login</Link>
                                : <Link to='/home' onClick={logout} className="btn btn-success">Logout</Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;
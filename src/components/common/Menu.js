import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Restaurants, Orders, Question, Logout } from '../../icons/icons';
import { useAuth } from '../../contexts/AuthContext'

const Menu = (props) => {
    const { logout } = useAuth();

    return(
        <Navbar>
            <Container className='px-2 justify-content-center justify-content-md-start'>
                <Nav>
                    <Nav.Item>
                        <Nav.Link 
                            eventKey="restaurantes"
                            as={Link}
                            to='/'
                            active={props.location?.pathname === '/'}
                        >
                            <Restaurants className='icon' /> Restaurantes
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="ordenes"
                            as={Link}
                            to='/ordenes'
                            active={(props.location?.pathname === '/ordenes')}    
                        >
                            <Orders className='icon' /> Órdenes
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="ayuda"
                            as={Link}
                            to='/ayuda'
                            active={(props.location?.pathname === '/ayuda')}
                        >
                            <Question className='icon' /> Ayuda
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='ml-auto'>
                        <Nav.Link
                            eventKey="sesion"
                            onClick={logout}
                        >
                            <Logout className='icon ml-2' /> Salir
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Menu;
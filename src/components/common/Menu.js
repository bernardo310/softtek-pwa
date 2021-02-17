import React, { Component } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import restaruants from '../../assets/restaurants.svg';
import orders from '../../assets/orders.svg';
import question from '../../assets/question.svg';

class Menu extends Component {
    render() {
        return(
            <Navbar>
                <Container className='px-2'>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link eventKey="restaurantes" as={Link} to='/'><img src={restaruants} className='icon' /> Restaurantes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="ordenes" as={Link} to='/ordenes'><img src={orders} className='icon' /> Órdenes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="ayuda" as={Link} to='/ayuda'><img src={question} className='icon' /> Ayuda</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default Menu;
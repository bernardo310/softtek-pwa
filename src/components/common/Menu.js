import React, { Component } from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Restaurants, Orders, Question } from '../../icons/icons';

class Menu extends Component {
    render() {
        console.log(this.props);
        return(
            <Navbar>
                <Container className='px-2 justify-content-center justify-content-md-start'>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link 
                                eventKey="restaurantes"
                                as={Link}
                                to='/'
                                active={this.props.location?.pathname === '/'}
                            >
                               <Restaurants className='icon' /> Restaurantes
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="ordenes"
                                as={Link}
                                to='/ordenes'
                                active={(this.props.location?.pathname === '/ordenes')}    
                            >
                                <Orders className='icon' /> Órdenes
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="ayuda"
                                as={Link}
                                to='/ayuda'
                                active={(this.props.location?.pathname === '/ayuda')}
                            >
                                <Question className='icon' /> Ayuda
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default Menu;
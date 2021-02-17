import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantList from './RestaurantList';
import Searchbar from '../common/Searchbar';
//import { useAuth } from '../contexts/AuthContext'

class RestaurantsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [
                {
                    name: 'Buffalo Wild Wings',
                    img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                    openingTime: '09:00',
                    closingTime: '19:00',
                    cash: false,
                    card: true,
                },
                {
                    name: 'Starbucks',
                    img: 'https://1000marcas.net/wp-content/uploads/2019/12/Starbucks-Logo.png',
                    openingTime: '09:00',
                    closingTime: '19:00',
                    cash: true,
                    card: true,
                },
                {
                    name: 'Blatt Salad Haus',
                    img: 'https://www.franquiciasen.mx/Content/imgAnuncios/bsh-blatt-salat-haus.jpg',
                    openingTime: '09:00',
                    closingTime: '19:00',
                    cash: true,
                    card: true,
                },
                {
                    name: 'Restaurante con un nombre muy largo',
                    img: 'https://st2.depositphotos.com/7109552/11377/v/600/depositphotos_113775112-stock-illustration-vintage-restaurant-and-cafe-label.jpg',
                    openingTime: '09:00',
                    closingTime: '19:00',
                    cash: true,
                    card: false,
                },
                {
                    name: 'McDonalds',
                    img: 'https://tentulogo.com/wp-content/uploads/2017/07/mcdonalds-logo.jpg',
                    openingTime: '09:00',
                    closingTime: '19:00',
                    cash: false,
                    card: true,
                },

            ]
        }
    }
    //const { currentUser } = useAuth()
    render() {
        return (
            <Container>
                <Row className='justify-content-between'>
                    <Col xs='auto' className='vertical-center'>
                        <h1>Restaurantes</h1>
                    </Col>
                    <Col xs='auto' className='vertical-center'>
                        <p>icono de shop</p>
                    </Col>
                </Row>
                <Row className='mb-4'>
                    <Col xs={12} md={4}>
                        <Searchbar />
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col xs={12}>
                        <RestaurantList restaurants={this.state.restaurants}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RestaurantsView;

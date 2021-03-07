import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantList from './RestaurantList';
import Searchbar from '../common/Searchbar';
import Menu from '../common/Menu';
import { ShoppingBag } from '../../icons/icons';
const { db } = require('../../firebase');
//import { useAuth } from '../contexts/AuthContext'

class RestaurantsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [
                /*{
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
                },*/
            ]
        }
    }
    componentDidMount() {
        const collectionRef = db.collection('locations');
        collectionRef.limit(1).get().then(snapshot => {
            snapshot.forEach(doc => {
                collectionRef.doc(doc.id).collection("restaurants").get().then(snapshot => {
                    const restaurants = [];
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        restaurants.push({
                            name: data.name,
                            img: data.imageURL,
                            openingTime: data.hours.substring(2, 8),
                            closingTime: data.hours.substring(10, 16),
                            cash: data.paymentTypes.includes("Efectivo") ? true : false,
                            card: data.paymentTypes.includes("Tarjeta") ? true : false,
                            phone: data.phone,
                            id: data.id
                        })
                    })
                    this.setState({ restaurants })
                }).catch(err => {
                    console.log("Error getting sub-collection documents", err);
                })
            })
        }).catch(err => {
            console.log(err)
        });
    }

    //const { currentUser } = useAuth()
    render() {
        //console.log('restt', this.restaurantes)
        return (
            <>
                <Menu {...this.props} />
                <Container className='mb-5 mt-3'>
                    <Row className='justify-content-between'>
                        <Col xs='auto' className='vertical-center'>
                            <h1>Restaurantes</h1>
                        </Col>
                        <Col xs='auto' className='vertical-center'>
                            <ShoppingBag className='header-icon' />
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col xs={12} md={4}>
                            <Searchbar placeholder='Busca un restaurante'/>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={12}>
                            <RestaurantList restaurants={this.state.restaurants} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default RestaurantsView;

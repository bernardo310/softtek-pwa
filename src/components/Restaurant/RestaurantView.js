import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './ProductList';
import { Link } from "react-router-dom";
import Searchbar from '../common/Searchbar';
import { ArrowLeft, Phone, ShoppingBag, Clock, Money, BankCards } from '../../icons/icons';

class RestaurantView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    name: 'Boneless medianas',
                    img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                    description: 'Paquete de 10 piezas de boneless en cualquiera de nuestras deliciosas salsas',
                    price: '120.00',
                },
                {
                    name: 'Boneless medianas',
                    img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                    description: 'Paquete de 10 piezas de boneless en cualquiera de nuestras deliciosas salsas',
                    price: '120.00',
                },
                {
                    name: 'Boneless medianas',
                    img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                    description: 'Paquete de 10 piezas de boneless en cualquiera de nuestras deliciosas salsas',
                    price: '120.00',
                },
                {
                    name: 'Boneless medianas',
                    img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                    description: 'Paquete de 10 piezas de boneless en cualquiera de nuestras deliciosas salsas',
                    price: '120.00',
                },
                {
                    name: 'Boneless medianas',
                    img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                    description: 'Paquete de 10 piezas de boneless en cualquiera de nuestras deliciosas salsas',
                    price: '120.00',
                },
            ],
            restaurantData: {
                name: 'Buffalo Wild Wings',
                img: 'https://www.buffalowildwings.com/globalassets/bww-logo_rgb_icon.png',
                openingTime: '09:00',
                closingTime: '19:00',
                cash: false,
                card: true,
                phoneNumber: '(+52) 811 123 4567',

            },
            menuSections: ['Boneless', 'Alitas', 'Hamburguesas', 'Ensaladas', 'Bebidas', 'Postres'],
            selectedSection: 'Boneless',
            addedItems: 0,
        }

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        let addedItems = this.state.addedItems;
        addedItems++;
        this.setState({addedItems});
    }

    render() {
        let restaurant = this.state.restaurantData;
        console.log(this.props.routerProps);
        return(
            <>
                <Container className='pb-3'>
                    <Row className='py-4 header'>
                        <Col xs='auto' className='vertical-center'>
                            <Link to='/'>
                                <ArrowLeft className='header-icon' />
                            </Link>
                        </Col>
                        <Col>
                            <Searchbar placeholder='Busca un producto'/>
                        </Col>
                        <Col xs='auto' className='vertical-center'>
                            <Link to='/carrito' className='shopping-link'>
                                <ShoppingBag className='header-icon' />
                                {this.state.addedItems > 0 &&
                                    <div className='added-items'><p className='text-smallest'>{this.state.addedItems}</p></div>
                                }
                            </Link>
                        </Col>
                    </Row>
                    <Row className='mt-4 mb-2'>
                        <Col xs={6} md='auto'>
                            <img src={restaurant.img} className='restaurant-img' />
                        </Col>
                        <Col xs={6} md={4}>
                            <Row>
                                <Col xs={12}>
                                    <h4 className='m-0'>{restaurant.name}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p className='text-smaller'><Clock className='icon' /> {restaurant.openingTime} - {restaurant.closingTime}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p className='text-smaller'><Phone className='icon' /> {restaurant.phoneNumber}</p>
                                </Col>
                            </Row>
                            <Row className='no-gutters'>
                                {restaurant.cash && 
                                    <Col xs='auto' className='pr-1'>
                                        <div className='cash-pill'>
                                            <p className='text-smallest m-0'><Money className='icon' /> Efectivo</p>
                                        </div>
                                    </Col>
                                }
                                {restaurant.card && 
                                    <Col xs='auto'>
                                        <div className='card-pill'>
                                            <p className='text-smallest m-0'><BankCards className='icon' /> Tarjeta</p>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row className='restaurant-sections pb-4 pt-2'>
                        <Col xs={12}>
                            <ul className='menu-sections-list'>
                                {this.state.menuSections.map((section, i) => (
                                    <li 
                                        key={i}
                                        className={`menu-sections-item ${this.state.selectedSection === section && 'active'}`}
                                        onClick={() => this.setState({selectedSection: section})}
                                    >
                                        <a href={`#${section}`}>{section}</a>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ProductList products={this.state.products} addToCart={this.addToCart} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default RestaurantView;

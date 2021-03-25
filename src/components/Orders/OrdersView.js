import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingBag } from '../../icons/icons';
import OrderList from './OrderList';
import Menu from '../common/Menu';

class OrdersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {   
                    id: 0,
                    restaurantName: 'Buffalo Wild Wings',
                    status: 'Recibida',
                    date: '10/01/2020',
                    total: 320.00,
                    estimatedDeliveryTime: 15,
                    parkingSpot: null,
                    isInParkingSpot: false,
                    paymentType: 'Efectivo',
                    seeProducts: false,
                    products: [
                        {
                            id: 0,
                            addedOfProduct: 1, 
                            name: 'Boneless grandes'
                        },
                        {
                            id: 1,
                            addedOfProduct: 1, 
                            name: 'Boneless medianas'
                        },
                    ]
                },
                {   
                    id: 1,
                    restaurantName: 'Blatt Salat Haus',
                    status: 'Entregada',
                    date: '15/12/2019',
                    total: 280.20,
                    estimatedDeliveryTime: 15,
                    parkingSpot: 'B2',
                    isInParkingSpot: true,
                    paymentType: 'Tarjeta',
                    seeProducts: false,
                    products: [
                        {
                            id: 0,
                            addedOfProduct: 1, 
                            name: 'Blatt Sanwish Buffalo'
                        },
                        {
                            id: 1,
                            addedOfProduct: 1, 
                            name: 'Limonada'
                        },
                    ]
                },
                {   
                    id: 2,
                    restaurantName: 'Starbucks',
                    status: 'Cancelada',
                    date: '15/12/2019',
                    total: 280.20,
                    estimatedDeliveryTime: 15,
                    parkingSpot: 'B2',
                    isInParkingSpot: true,
                    paymentType: 'Tarjeta',
                    seeProducts: true,
                    products: [
                        {
                            id: 0,
                            addedOfProduct: 1, 
                            name: 'Chai latte'
                        },
                        {
                            id: 1,
                            addedOfProduct: 1, 
                            name: 'Brownie de chocolate'
                        },
                    ]
                },
            ],
        }

        this.setSeeProduct = this.setSeeProduct.bind(this);
    }

    setSeeProduct(idOrder) {
        let orders = this.state.orders;

        for(let i = 0; i < orders.length; i++) {
            if(orders[i].id === idOrder) {
                orders[i].seeProducts = !orders[i].seeProducts;
            }
        }

        this.setState({orders});
    }

    //const { currentUser } = useAuth()
    render() {
        return (
            <>
                <Menu {...this.props}/>
                <Container className='mb-5 mt-3'>
                    <Row className='justify-content-between'>
                        <Col xs='auto' className='vertical-center'>
                            <h1 className='mb-0'>Órdenes</h1>
                        </Col>
                        <Col xs='auto' className='vertical-center'>
                            <Link to='/carrito' className='shopping-link'>
                                <ShoppingBag className='header-icon mb-0' />
                                {this.state.addedItems > 0 &&
                                    <div className='added-items'><p className='text-smallest'>{this.state.addedItems}</p></div>
                                }
                            </Link>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={12}>
                            <OrderList orders={this.state.orders} setSeeProduct={this.setSeeProduct} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default OrdersView;

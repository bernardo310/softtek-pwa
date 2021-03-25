import React, { Component,  useRef, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShoppingBag } from '../../icons/icons';
import OrderList from './OrderList';
import Menu from '../common/Menu';
import Button from '../common/Button';
import Input from '../common/Input';

const ChangeParkingSpotModal = (props) => {
    const [parkingSpot, setParkingSpot] = useState('');
    const [allOrders, setAllOrders] = useState(false);
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>Cambiar cajón de estacionamiento</h4>
                <Input label='Cajón' size='sm' className='mt-4 mb-3' handleValue={(value) => setParkingSpot(value)} />
                <label className='checkbox-wrapper'>
                    Aplicar para todas las órdenes en progreso
                    <input type='checkbox' checked={allOrders} name='camino' value='En camino' onChange={() => setAllOrders(!allOrders)} />
                    <span className='checkmark'></span>
                </label>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} label='Cancelar' />
                <Button variant='primary' onClick={() => props.changeParkingSpot(parkingSpot, props.order, allOrders)} label='Cambiar' disabled={parkingSpot?.length === 0} />
            </Modal.Footer>
        </Modal>
    );
}

class OrdersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [
                {   
                    id: 0,
                    restaurantName: 'Restaurante 1',
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
                    restaurantName: 'Restaurante 2',
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
                    id: 2,
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
                    id: 3,
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
            changeParkingSpotModalShow: false,
            order: null,
        }

        this.setSeeProduct = this.setSeeProduct.bind(this);
        this.showParkingSpotModal = this.showParkingSpotModal.bind(this);
        this.changeParkingSpot = this.changeParkingSpot.bind(this);
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

    showParkingSpotModal(order) {
        this.setState({changeParkingSpotModalShow: true, order});
    }

    changeParkingSpot(parkingSpot, order, allOrders) {
        let orders = this.state.orders;

        if(allOrders) {
            for(let i = 0; i < orders.length; i++) {
                if(orders[i].status === 'Recibida' && orders[i].date === order.date) {
                    orders[i].isInParkingSpot = true;
                    orders[i].parkingSpot = parkingSpot;
                }
            }
        } else {
            for(let i = 0; i < orders.length; i++) {
                if(orders[i].id === order.id) {
                    orders[i].isInParkingSpot = true;
                    orders[i].parkingSpot = parkingSpot;
                }
            }
        }

        this.setState({orders, changeParkingSpotModalShow: false});
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
                            <OrderList 
                                orders={this.state.orders}
                                setSeeProduct={this.setSeeProduct}
                                showParkingSpotModal={this.showParkingSpotModal}
                            />
                        </Col>
                    </Row>
                </Container>
                <ChangeParkingSpotModal
                    show={this.state.changeParkingSpotModalShow}
                    onHide={() => this.setState({changeParkingSpotModalShow: false})}
                    order={this.state.order}
                    changeParkingSpot={this.changeParkingSpot}
                />
            </>
        );
    }
}

export default OrdersView;

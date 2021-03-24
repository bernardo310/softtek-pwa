import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BankCards, Car, Clock, Money, Restaurants } from '../../icons/icons';
import Button from '../common/Button';

const OrderList = (props) => {

    const renderStatusBlock = (order) => {
        let status = order.status;
        switch (status) {
            case 'Entregada':
                return(
                    <div className='delivered-pill'>
                        <p className='text-smallest m-0'>Entregada</p>
                    </div>
                );
            case 'Recibida':
                return(
                    <div className='received-pill'>
                        <p className='text-smallest m-0'>Recibida</p>
                    </div>
                );
            case 'Cancelada':
                return(
                    <div className='cancelled-pill'>
                        <p className='text-smallest m-0'>Cancelada</p>
                    </div>
                );
            default:
                break;
        }
    }

    const renderCardButtons = (order) => {

    } 

    return(
        <>
            {props.orders.map(order => (
                <Row>
                    <Col xs={12}>
                        <Card className='my-2 order-card'>
                            <Card.Body>
                                <Row className='justify-content-between'>
                                    <Col>
                                        <p className='text-smallest gray-text'>{order.date}</p>
                                    </Col>
                                    <Col xs='auto'>
                                        {renderStatusBlock(order)}
                                    </Col>
                                </Row>
                                {order.status !== 'Cancelada' &&
                                    <>
                                        <Row>
                                            <Col>
                                                <p className='text-smallest gray-text'><Clock className='icon' /> {order.status === 'Entregada' ? 'Entregada'  : `Entrega estimada: ${order.estimatedDeliveryTime} min.`}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className='text-smallest gray-text'><Car className='icon' /> {order.isInParkingSpot ? `Cajón ${order.parkingSpot}`  : `En camino`}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {order.paymentType === 'Efectivo' && 
                                                <Col>
                                                    <p className='text-smallest gray-text'><Money className='icon' /> Efectivo</p>
                                                </Col>
                                            }
                                            
                                            {order.paymentType === 'Tarjeta' && 
                                                <Col>
                                                    <p className='text-smallest gray-text'><BankCards className='icon' /> Tarjeta</p>
                                                </Col>
                                            }
                                        </Row>
                                    </>
                                }
                                <Row>
                                    <Col>
                                        <p className='text-smallest gray-text'><Restaurants className='icon' /> products</p>
                                    </Col>
                                </Row>
                                <Row>
                                    {renderCardButtons(order)}
                                    <Col>
                                        <Button label='Ver productos' block />
                                    </Col>
                                    <Col>
                                        <Button variant='primary' label='Cambiar cajón' block />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </>
    );
}

export default OrderList;
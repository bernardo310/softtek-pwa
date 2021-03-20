import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../common/Button';
import Input from '../common/Input';
import { ArrowLeft, Clock, AddToBag} from '../../icons/icons';
import { useHistory } from 'react-router-dom';
import { use100vh } from 'react-div-100vh';

const CartView = (props) => {
    const height = use100vh();
    const history = useHistory();
    const [location, setLocation] = useState(null);
    const [payment, setPayment] = useState(null);

    return(
        <Container className='mb-5 mt-3'>
            <Row>
                <Col xs='auto' className='vertical-center' onClick={() => history.goBack()}>
                    <ArrowLeft className='header-icon mb-0' />
                </Col>
                <Col className='vertical-center'>
                    <h1 className='mb-0'>Carrito</h1>
                </Col>
            </Row>
            {props.productsLength > 0 ?
            <>
                <Row>
                    <Col xs={12}>
                        <h3>Aquí van los productos</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h2>Detalles de la orden</h2>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12}>
                        <h6 className='text-smaller main-text bold'>Datos de contacto</h6>
                        <Input label='Nombre' className='my-3'/>
                        <Input label='Teléfono' size='sm'/>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12}>
                        <h6 className='text-smaller main-text bold'>Ubicación</h6>
                        <label className='radio-wrapper'>
                            Voy en camino
                            <input type='radio' checked={location === 'En camino'} name='camino' value='En camino' onChange={() => setLocation('En camino')} />
                            <span className='checkmark'></span>
                        </label>
                        <label className='radio-wrapper'>
                            Estoy en un cajón de estacionamiento
                            <input type='radio' checked={location === 'En cajón'} name='cajon' value='En cajón' onChange={() => setLocation('En cajón')} />
                            <span className='checkmark'></span>
                        </label>
                        {location === 'En cajón' && 
                            <Input label='Cajón' size='xs' className='mt-4 mb-3' />
                        }
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12}>
                        <h6 className='text-smaller main-text bold'>Tipo de pago</h6>
                        <label className='radio-wrapper'>
                            Efectivo
                            <input type='radio' checked={payment === 'Efectivo'} name='efectivo' value='Efectivo' onChange={() => setPayment('Efectivo')} />
                            <span className='checkmark'></span>
                        </label>
                        <label className='radio-wrapper'>
                            Tarjeta
                            <input type='radio' checked={payment === 'Tarjeta'} name='tarjeta' value='Tarjeta' onChange={() => setPayment('Tarjeta')} />
                            <span className='checkmark'></span>
                        </label>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12}>
                        <p className='text-smaller text-center'><Clock className='icon' /> Tiempo de entrega estimado: 15 min.</p>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col xs={12}>
                    <Button variant='primary' label='Confirmar orden ($480.00)' block />
                    </Col>
                </Row>
            </>
            :
            <div style={{height: `calc(${height}px - 37px - 4rem`}} className='vertical-center text-center'>
                <Row className='justify-content-center'>
                    <Col xs={6}>
                        <AddToBag className='empty-space-icon' />
                        <p className='non-bold mb-4 mt-2'>¡Oh no! Parece que aun no tienes productos.</p>
                        <Button variant='primary' label='¡Ver restaurantes!' onClick={() => history.push('/')} />
                    </Col>
                </Row>
            </div>
            }
        </Container>
    );
}

export default CartView;
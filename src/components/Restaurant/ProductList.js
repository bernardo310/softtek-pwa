import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from '../common/Button';

class ProductList extends Component {

    render() {
        return(
            <div id='Boneless'>
                {this.props.products.map((product) => (
                    <>
                        <Row>
                            <Col>
                                <Row>
                                    <Col xs={12}>
                                        <p>{product.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <p className='text-smaller'>{product.description}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs='auto'>
                                <img src={product.img} className='list-img' />
                            </Col>
                        </Row>
                        <Row className='mt-3 justify-content-between'>
                            <Col xs='auto'>
                                <p className='text-smaller main-text'>${product.price}</p>
                            </Col>
                            <Col xs='auto'>
                                <Button label='Ver más' className='mr-2' />
                                <Button label='¡Agregar!' variant='primary' onClick={this.props.addToCart} />
                            </Col>
                        </Row>
                        <hr />
                    </>
                ))}
            </div>
        );
    }
}

export default ProductList;
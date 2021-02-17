import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import clock from '../../assets/clock.svg';
import money from '../../assets/money.svg';
import bankCards from '../../assets/bankCards.svg';

class RestaurantList extends Component {
    render() {
        return(
            <>
                {this.props.restaurants.map((restaurant) => (
                    <>
                        <Row>
                            <Col xs='auto'>
                                <img src={restaurant.img} className='list-img' />
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={12}>
                                        <p>{restaurant.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <p className='text-smaller'><img src={clock} className='icon' /> {restaurant.openingTime} - {restaurant.closingTime}</p>
                                    </Col>
                                </Row>
                                <Row className='no-gutters'>
                                    {restaurant.cash && 
                                        <Col xs='auto' className='pr-1'>
                                            <div className='cash-pill'>
                                                <p className='text-smallest m-0'><img src={money} className='icon' /> Efectivo</p>
                                            </div>
                                        </Col>
                                    }
                                    {restaurant.card && 
                                        <Col xs='auto'>
                                            <div className='card-pill'>
                                                <p className='text-smallest m-0'><img src={bankCards} className='icon' /> Tarjeta</p>
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                    </>
                ))}
            </>
        );
    }
}

export default RestaurantList;
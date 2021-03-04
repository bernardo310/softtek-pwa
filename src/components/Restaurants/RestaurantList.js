import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Clock, Money, BankCards } from '../../icons/icons';
import { useHistory } from "react-router-dom";


const RestaurantList = (props) => {

    const history = useHistory();

    const navigateToRestaurant = (restaurant) => {
        const name = restaurant.name.replace(/\s/g, '');
        history.push(`/restaurant/${name}`);
    }

    return(
        <>
            {props.restaurants.map((restaurant) => (
                <>
                    <Row onClick={() => navigateToRestaurant(restaurant)}>
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
                                    <p className='text-smaller'><Clock className='icon' /> {restaurant.openingTime} - {restaurant.closingTime}</p>
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
                    <hr />
                </>
            ))}
        </>
    );
}

export default RestaurantList;
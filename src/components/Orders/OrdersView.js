import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import OrderList from './OrderList';
import Menu from '../common/Menu';

class OrdersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    //const { currentUser } = useAuth()
    render() {
        return (
            <>
                <Menu {...this.props}/>
                <Container className='mb-5 mt-3'>
                    <Row className='justify-content-between'>
                        <Col xs='auto' className='vertical-center'>
                            <h1>Órdenes</h1>
                        </Col>
                        <Col xs='auto' className='vertical-center'>
                            <p>icono de shop</p>
                        </Col>
                    </Row>
                    <Row className='justify-content-center mt-5'>
                        <Col xs={12}>
                            {/*<OrderList orders={this.state.orders}/>*/}
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default OrdersView;

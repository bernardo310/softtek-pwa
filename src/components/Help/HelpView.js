import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HelpList from './HelpList';
import Menu from '../common/Menu';

class HelpView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faq: [
                {
                    question: '¿Puedo actualizar el “cajon de estacionamiento”?',
                    answer: 'Respuesta 1',
                },
                {
                    question: 'Pregunta 2',
                    answer: 'Respuesta 2',
                },
                {
                    question: 'Pregunta 3',
                    answer: 'Respuesta 3',
                },
                {
                    question: 'Pregunta 4',
                    answer: 'Respuesta 4',
                },
                {
                    question: 'Pregunta 5',
                    answer: 'Respuesta 5',
                },
                {
                    question: 'Pregunta 6',
                    answer: 'Respuesta 6',
                },
            ]
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
                            <h1>Ayuda</h1>
                        </Col>
                        <Col xs='auto' className='vertical-center'>
                            <p>icono de shop</p>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col xs={12}>
                            <HelpList faq={this.state.faq} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default HelpView;

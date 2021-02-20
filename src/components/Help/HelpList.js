import React, { Component } from 'react';
import { Row, Col, Card, Accordion } from 'react-bootstrap';
import { Restaurants } from '../../icons/icons';

class HelpList extends Component {
    render() {
        return(
            <Row>
                <Col xs={12}>
                    <Accordion>
                    {this.props.faq.map((question, i) => (
                        <Card className='my-2 faq-card'>
                            <Accordion.Toggle as={Card.Header} eventKey={`${i}`}>
                                <p className='m-0'>{question.question}</p>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={`${i}`}>
                                <Card.Body className='pt-0'>
                                    <hr className='mt-0' />
                                    <p className='text-smallest'>{question.answer}</p>
                                </Card.Body>
                            </Accordion.Collapse>
                            <Restaurants className='icon' />
                        </Card>        
                    ))}
                    </Accordion>
                </Col>
            </Row>
        );
    }
}

export default HelpList;
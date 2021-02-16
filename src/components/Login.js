import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Input from './common/Input';
import Button from './common/Button';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e) {
        console.log('login')
        e.preventDefault()
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch (err) {
            console.log(err)
            setError('Error iniciando sesion')
        }
        setLoading(false);
    }

    return (
        <Container className='vertical-center full-height'>
            <Row className='justify-content-center'>
                <Col xs={12} md={5} className='text-center'>
                    <h1>Plaza Real Order To Go</h1>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={12} md={3}>
                    {error ? <p>{error}</p> : ''}
                    <form onSubmit={handleSubmit}>
                        {/*<p>correo</p>
                        <input type="text" ref={emailRef} />

                        <p>password</p>
                        <input type="text" ref={passwordRef} />
                        <button type="submit" disabled={loading}>login</button>
                        <br />
                        */}
                        <Input type='email' label='Correo' ref={emailRef} />
                        <Input type='password' label='Contraseña' ref={passwordRef} />
                        <Button type='submit' disabled={loading} label='Iniciar sesión' variant='primary'/>
                    </form>
                </Col>
            </Row>
            <Row className='justify-content-center '>
                <Col xs={12} md={3} className='text-center'>
                    <hr />
                    <p className='text-smallest'>¡Crea una cuenta nueva <Link to="/signup">aquí</Link>!</p>
                </Col>
            </Row>
        </Container>
    )
}

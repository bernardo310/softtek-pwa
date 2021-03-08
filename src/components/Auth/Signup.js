import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Input from '../common/Input';
import Button from '../common/Button';
import googleLogo from '../../assets/google-logo.png';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const { signup, currentUser, loginWithGoogle } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e) {
        //console.log('signup',emailRef.current.value, passwordRef.current.value)
        e.preventDefault()
        if (passwordRef.current.value !== confirmpasswordRef.current.value) return setError('Las contraseñas deben ser iguales')
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(err) {
            console.log(err)
            setError('Error creando cuenta')
        }
        setLoading(false);
    }

    async function handleGoogleLogIn(e) {
        e.preventDefault();
        if (passwordRef.current.value !== confirmpasswordRef.current.value) return setError('Las contraseñas deben ser iguales')
        await loginWithGoogle(emailRef.current.value, passwordRef.current.value);
        history.push('/')
    }

    return (
        <Container className='vertical-center full-height'>
            <Row className='justify-content-center'>
                <Col xs={12} md={5} className='text-center'>
                    <h1>Plaza Real Order To Go</h1>
                    <h2>Crear cuenta</h2>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={12} md={3}>
                    {error ? <p>{error}</p> : ''}
                    {/*{JSON.stringify(currentUser)}*/}
                    <form onSubmit={handleSubmit}>
                        {/*<p>correo</p>
                        <input type="text" ref={emailRef} />
                        <p>password</p>
                        <input type="text" ref={passwordRef} />
                        <p>confirm password</p>
                        <input type="text" ref={confirmpasswordRef} />
                        <button type="submit" disabled={loading}>registrar</button>*/}

                        <Input type='email' label='Correo' ref={emailRef} />
                        <Input type='password' label='Contraseña' ref={passwordRef} />
                        <Input type='password' label='Confirmar contraseña' ref={confirmpasswordRef} />
                        <Button type='submit' disabled={loading} label='Registrarme' variant='primary'/>
                    </form>
                    <p className='text-smallest text-center my-3'>o</p>
                    <button onClick={handleGoogleLogIn} className='google-button' ><img src={googleLogo} loading='lazy' height='20px' /><p className='text-smaller'>Registrate con google</p></button>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={12} md={3} className='text-center'>
                    <hr />
                    <p className='text-smallest'>¿Ya tienes cuenta? <Link to="/login"> Inicia sesión</Link></p>
                </Col>
            </Row>
        </Container>
    )
}

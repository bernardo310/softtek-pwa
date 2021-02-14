import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

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
        <div>
            {error ? <p>{error}</p> : ''}
            <form onSubmit={handleSubmit}>
                <p>correo</p>
                <input type="text" ref={emailRef} />
                <p>password</p>
                <input type="text" ref={passwordRef} />
                <button type="submit" disabled={loading}>login</button>
            </form>
            <div>
                Crear cuenta nueva <Link to="/signup"> </Link>
            </div>
        </div>
    )
}

import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    async function handleSubmit(e) {
        console.log('signup')
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

    return (
        <div>
            {error ? <p>{error}</p> : ''}
            {JSON.stringify(currentUser)}
            <form onSubmit={handleSubmit}>
                <p>correo</p>
                <input type="text" ref={emailRef} />
                <p>password</p>
                <input type="text" ref={passwordRef} />
                <p>confirm password</p>
                <input type="text" ref={confirmpasswordRef} />
                <button type="submit" disabled={loading}>registrar</button>
            </form>
            <div>
                Ya tengo cuenta <Link to="/login"> </Link>
            </div>
        </div>
    )
}

import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Restaurantes() {
    const { currentUser } = useAuth()
    return (
        <div>
            <h1>Restaurantes</h1>
            <p>{currentUser.email}</p>
        </div>
    )
}

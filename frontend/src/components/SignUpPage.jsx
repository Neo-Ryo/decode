import React from 'react'
import style from './Signup.module.css'
import { Container, Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'

export default function SignUpPage() {
    const history = useHistory()
    const handleRedirectLogin = () => {
        let path = '/login'
        return history.push(path)
    }

    const handleRedirectRegister = () => {
        let path = '/register'
        return history.push(path)
    }

    return (
        <Container style={{ marginTop: '40vh' }}>
            <h1>Have you already an account?</h1>
            <div className={style.inline}>
                <Button
                    outline
                    color="info"
                    style={{ margin: 10 }}
                    onClick={() => handleRedirectLogin()}
                >
                    Log in
                </Button>
                <Button
                    outline
                    color="warning"
                    style={{ margin: 10 }}
                    onClick={() => handleRedirectRegister()}
                >
                    Create an account
                </Button>
            </div>
        </Container>
    )
}

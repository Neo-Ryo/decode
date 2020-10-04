import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button, Container, Spinner } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import url from '../urls'

export default function Login() {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => postUser(data)

    const handleBackButton = () => {
        let path = '/'
        return history.push(path)
    }

    const postUser = async (data) => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${url}/users/login`, data)
            if (res.data.uuid) {
                history.push('/decode')
                setIsLoading(false)
                toast.success('wElcOme BaCK dEcOder')
            } else throw new Error()
        } catch (error) {
            toast.error('Something went wrong, try again')
            console.log(error)
        }
    }

    if (isLoading) {
        return <Spinner color="info">loading</Spinner>
    }

    const renderLogin = () => {
        return (
            <Container>
                <Button
                    style={{ margin: 20 }}
                    outline
                    block
                    color="danger"
                    onClick={() => handleBackButton()}
                >
                    Back
                </Button>
                <h1 style={{ marginTop: '30vh' }}>
                    {' '}
                    &sum; &prod; &notin; DECODE &empty; &nabla; &exist;
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>enter your name</label>
                        <input name="pseudo" ref={register} />
                    </div>
                    <div>
                        <label>enter your pA$$WoRd</label>
                        <input type="password" name="password" ref={register} />
                    </div>
                    <Button color="primary" type="submit">
                        submit
                    </Button>
                </form>
            </Container>
        )
    }
    return renderLogin()
}

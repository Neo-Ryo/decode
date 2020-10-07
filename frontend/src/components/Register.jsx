import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button, Container, Spinner, Collapse } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import url from '../urls'

export default function Register() {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState({ pseudo: '', password: '' })
    const [users, setUsers] = useState({})
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => postUser(data)
    const [isOpen, setIsOpen] = useState(false)

    const handleBackButton = () => {
        let path = '/'
        return history.push(path)
    }

    const getUsers = async () => {
        try {
            setIsLoading(true)
            const users = await axios.get(`${url}/users`)
            setUsers(users.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const postUser = async (data) => {
        try {
            setIsLoading(true)
            const res = await axios.post(`${url}/users/register`, data)
            const { uuid } = res.data
            localStorage.setItem('uuid', uuid)
            toast.success('wElcoMe nEw dEcoDER')
            history.push('/decode')
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const renderSubmitButton = () => {
        if (isOpen) {
            return (
                <Button disabled color="primary" type="submit">
                    submit
                </Button>
            )
        } else {
            return (
                <Button color="primary" type="submit">
                    submit
                </Button>
            )
        }
    }

    const collapseContent = () => {
        if (isOpen) {
            return <p style={{ color: 'red' }}>already taken !!</p>
        }
        return
    }

    const handleChange = (e) => {
        setProfile({ pseudo: e.target.value })
        const exist = users.find((i) => i.pseudo === e.target.value)
        if (exist) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (isLoading) {
        return <Spinner color="info">loading</Spinner>
    }

    const renderRegister = () => {
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
                <h3>ChOosE a nAme aNd crYpt your profile with a pAsSWorD</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>enter your name</label>
                        <input
                            onChange={(e) => handleChange(e)}
                            name="pseudo"
                            ref={register}
                        />
                        <Collapse isOpen={isOpen}>{collapseContent()}</Collapse>
                    </div>
                    <div>
                        <label>enter your pA$$WoRd</label>
                        <input type="password" name="password" ref={register} />
                    </div>
                    {renderSubmitButton()}
                </form>
            </Container>
        )
    }
    return renderRegister()
}

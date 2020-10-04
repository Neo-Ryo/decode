import React from 'react'
import { Button, Container } from 'reactstrap'
import { useForm } from 'react-hook-form'

export default function DashBoard() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    return (
        <Container style={{ marginTop: '30vh' }}>
            <h3>pseudo</h3>
            <p>choose a level</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="gender" ref={register}>
                    <option value="level1">LVL 1</option>
                    <option value="level2">LVL 2</option>
                    <option value="level3">LVL 3</option>
                </select>
                <Button type="submit">START</Button>
            </form>
        </Container>
    )
}

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
    Container,
    Button,
    Spinner,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap'
import { useForm } from 'react-hook-form'

export default function Decode() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)
    const [isLoading, setIsLoading] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [levelDropdown, setLevelDropdown] = useState({
        level: 'Select a level',
        boxes: 0,
    })

    const toggle = () => setDropdownOpen((prevState) => !prevState)

    const levels = [
        { level: 'easy', boxes: 5 },
        { level: 'medium', boxes: 7 },
        { level: 'hard', boxes: 9 },
        { level: 'EXTREME', boxes: 20 },
    ]

    const onFocusHandler = (e) => {
        const inputNum = e.target.name.split('-')
        const newValue = parseFloat(inputNum[1]) + 1
        const newFocus = `input-${newValue}`
        console.log(newFocus)
        document.getElementById(newFocus).focus()
    }

    const inputs = []
    const indicators = []
    const numbers = levelDropdown.boxes
    for (let i = 1; i <= numbers; i++) {
        inputs.push(
            <input
                style={{ width: 30, height: 30, margin: 5 }}
                ref={register}
                name={`input-${i}`}
                id={`input-${i}`}
                maxLength={1}
                type="text"
                onChange={(e) => onFocusHandler(e)}
            />
        )
        indicators.push()
    }
    useEffect(() => {}, [levelDropdown])

    const handleDropdown = (e) => {
        const newState = levels.filter((i) => i.level === e.target.value)
        setLevelDropdown(newState[0])
    }

    if (isLoading) {
        return <Spinner color="primary" />
    }
    return (
        <Container>
            <h1>WiLL yOu Be abLe to DecOde</h1>
            <form onSubmit={(e) => handleDropdown(e)}>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret> </DropdownToggle>
                    <DropdownMenu>
                        {levels.map((l) => (
                            <DropdownItem
                                onClick={(e) => handleDropdown(e)}
                                value={l.level}
                            >
                                {l.level}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </form>
            <form onSubmit={handleSubmit(onSubmit)}>
                {inputs}
                <Button color="info" type="submit">
                    submit
                </Button>
            </form>
        </Container>
    )
}

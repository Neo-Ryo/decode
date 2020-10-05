import React, { useEffect, useState } from 'react'
import {
    Container,
    Button,
    Spinner,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap'
import Indicators from './Indicators'
import { useForm } from 'react-hook-form'

export default function Decode() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log('data submitted :', data)
        compareHashPwd(data)
    }
    const [isLoading, setIsLoading] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [indicatorColor, setIndicatorColor] = useState([])
    const [codeHashed, setCodeHashed] = useState([])
    const [levelDropdown, setLevelDropdown] = useState({
        level: 'Select a level',
        boxes: 0,
    })

    const toggle = () => setDropdownOpen((prevState) => !prevState)

    const levels = [
        { level: 'easy', boxes: 5 },
        { level: 'medium', boxes: 7 },
        { level: 'hard', boxes: 9 },
        { level: 'EXTREME', boxes: 13 },
    ]

    const colors = ['none', 'lightgreen', 'orange', 'red']
    const bcrypt = require('bcryptjs')

    const handleKeyUp = (e) => {
        const numBoxes = levelDropdown.boxes
        const inputNum = e.target.name.split('-')
        const valueUp = parseFloat(inputNum[1]) + 1
        const valueDown = parseFloat(inputNum[1]) - 1
        if (valueUp <= numBoxes && e.keyCode !== 8) {
            const newFocus = `input-${valueUp}`
            document.getElementById(newFocus).focus()
        }
        if (e.keyCode === 8 && valueDown > 0) {
            const newFocus = `input-${valueDown}`
            document.getElementById(newFocus).focus()
        }
    }

    const decode = []
    const createPassword = (numChar) => {
        const code = Math.random().toString(18).slice(-numChar)
        const arrayCode = code.split('')
        console.log('coucou', numChar)
        for (let i = 0; i < numChar; i++) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(arrayCode[i], salt, function (err, hash) {
                    decode.push(hash)
                })
            })
        }
        setCodeHashed(decode)
        console.log('decode :', decode)
        console.log('code :', code)
    }
    const answerArray = []

    const compareHashPwd = (data) => {
        const answerObj = data
        const answerKeys = Object.keys(answerObj)
        for (let i = 0; i < answerKeys.length; i++) {
            bcrypt.compare(answerObj[answerKeys[i]], codeHashed[i], function (
                err,
                res
            ) {
                if (res === true) {
                    return answerArray.push(colors[1])
                } else {
                    const checkForMore = answerObj[answerKeys[i]]
                    console.log('checkForMore :', checkForMore)
                    for (let j = 0; j < answerKeys.length; j++) {
                        bcrypt.compare(checkForMore, codeHashed[j], function (
                            err,
                            res
                        ) {
                            if (res === true) {
                                return answerArray.push(colors[2])
                            } else if (
                                j === levelDropdown.boxes - 2 &&
                                res === false
                            ) {
                                return answerArray.push(colors[3])
                            }
                        })
                    }
                }
            })
        }
        console.log('answerArray :', answerArray)
        setIndicatorColor(answerArray)
    }

    const inputs = []
    const indicators = []
    const numbers = levelDropdown.boxes
    for (let i = 1; i <= numbers; i++) {
        inputs.push(
            <div style={{ display: 'inline-block', marginTop: '5vh' }}>
                <Indicators
                    name={`input-${i}`}
                    colorIndicator={indicatorColor[i - 1]}
                />
                <input
                    style={{
                        width: 30,
                        height: 30,
                        margin: 5,
                        textAlign: 'center',
                    }}
                    ref={register}
                    name={`input-${i}`}
                    id={`input-${i}`}
                    maxLength={1}
                    type="text"
                    onKeyUp={(e) => handleKeyUp(e)}
                    required
                />
            </div>
        )
        indicators.push()
    }
    useEffect(() => {
        // compareHashPwd('code', decode)
    }, [levelDropdown, answerArray])

    const handleDropdown = (e) => {
        const newState = levels.filter((i) => i.level === e.target.value)
        setLevelDropdown(newState[0])
        createPassword(newState[0].boxes)
    }

    if (isLoading) {
        return <Spinner color="primary" />
    }
    return (
        <Container style={{ marginTop: '15vh' }}>
            <h1>WiLL yOu Be abLe to DecOde</h1>
            <form onSubmit={(e) => handleDropdown(e)}>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret style={{ marginTop: '5vh' }}>
                        {levelDropdown.level}{' '}
                    </DropdownToggle>
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

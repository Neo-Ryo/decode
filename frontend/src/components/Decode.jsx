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
import axios from 'axios'
import UserCard from './UserCard'
import ScoreCard from './ScoreCard'
import Indicators from './Indicators'
import { useForm } from 'react-hook-form'
import url from '../urls'
import ArrayOfTrials from './ArrayOfTrials'

export default function Decode() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        // console.log('data submitted :', data)
        compareHashPwd(data)
    }
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})
    const [buttonLoader, setButtonLoader] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [indicatorColor, setIndicatorColor] = useState([])
    const [codeHashed, setCodeHashed] = useState([])
    const [rawCode, setRawCode] = useState('')
    const [openVault, setOpenVault] = useState(false)
    const [trials, setTrials] = useState([])
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

    const handleKeyUp = (e) => {
        const numBoxes = levelDropdown.boxes
        const inputNum = e.target.name.split('-')
        const valueUp = parseFloat(inputNum[1]) + 1
        const valueDown = parseFloat(inputNum[1]) - 1
        if (
            valueUp <= numBoxes &&
            e.keyCode !== 8 &&
            e.keyCode !== 13 &&
            e.keyCode !== 16
        ) {
            const newFocus = `input-${valueUp}`
            document.getElementById(newFocus).focus()
        }
        if ((e.keyCode === 8 || e.keyCode === 37) && valueDown > 0) {
            const newFocus = `input-${valueDown}`
            document.getElementById(newFocus).focus()
        }
    }

    const handleOnclick = async () => {
        try {
            setOpenVault(false)
            setIndicatorColor([])
            setCodeHashed([])
            setRawCode('')
        } catch (error) {
        } finally {
            createPassword(5)
        }
    }

    const postTrial = () => {
        const uuid = localStorage.getItem('uuid')
        axios.put(`${url}/users/${uuid}/trials`)
    }

    const postSuccess = () => {
        const uuid = localStorage.getItem('uuid')
        axios.put(`${url}/users/${uuid}/success`)
    }

    const createPassword = (numChar) => {
        setOpenVault(false)
        const code = Math.random().toString(18).slice(-numChar)
        const arrayCode = code.split('')
        const answerArray = []
        // console.log('coucou', numChar)
        for (let i = 0; i < numChar; i++) {
            answerArray.push(colors[0])
        }
        setCodeHashed(arrayCode)
        setRawCode(code)
        console.log('raw code :', code)
    }

    const compareHashPwd = async (data) => {
        try {
            const answerObj = await data
            setButtonLoader(true)
            const answerArray = []
            const answerKeys = Object.keys(answerObj)
            const resultTrue = answerKeys.length
            const trialString = []
            let result = 0
            // console.log('code hashed :', codeHashed)
            // console.log(rawCode.includes(answerObj[answerKeys[1]]))
            for (let i = 0; i < answerKeys.length; i++) {
                // console.log(answerObj[answerKeys[i]])
                trialString.push(answerObj[answerKeys[i]])
                if (answerObj[answerKeys[i]] === codeHashed[i]) {
                    answerArray.push(colors[1])
                    result += 1
                } else if (rawCode.includes(answerObj[answerKeys[i]])) {
                    answerArray.push(colors[2])
                } else {
                    answerArray.push(colors[3])
                }
            }
            const string = trialString.join('')
            console.log('string :', string)
            setIndicatorColor(answerArray)
            setTrials([...trials, string])
            if (result === resultTrue) {
                postSuccess()
                setTrials([])
                setOpenVault(true)
            } else {
                postTrial()
            }
        } catch (error) {
            throw Error(error)
        } finally {
            setButtonLoader(false)
        }
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

    const getUser = async () => {
        try {
            setIsLoading(true)
            const uuid = localStorage.getItem('uuid')
            const res = await axios.get(`${url}/users/${uuid}`)
            setUser(res.data)
            setIsLoading(false)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [levelDropdown, indicatorColor])

    const handleDropdown = (e) => {
        const newState = levels.filter((i) => i.level === e.target.value)
        setLevelDropdown(newState[0])
        createPassword(newState[0].boxes)
        setIndicatorColor([])
    }

    const renderScore = () => {
        const { trials } = user
        const { successing } = user
        const actualScore = (successing / trials) * 100
        return actualScore
    }

    if (isLoading) {
        return <Spinner color="primary" />
    }

    if (openVault) {
        return (
            <div>
                <Button color="danger" block onClick={() => handleOnclick()}>
                    {' '}
                    Back
                </Button>
                <p>Congrats!!</p>
                <img
                    src="https://media.giphy.com/media/LtQLmuR22JeFy/giphy.gif"
                    alt="openning vault"
                />
            </div>
        )
    }
    return (
        <Container style={{ marginTop: '3vh' }}>
            <h1>WiLL yOu Be abLe to DecOde</h1>
            <UserCard pseudo={user.pseudo} />
            <ScoreCard score={renderScore()} />
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
                <ArrayOfTrials array={trials} />
                {inputs}
                <Button color="info" type="submit">
                    {buttonLoader ? <Spinner /> : 'submit'}
                </Button>
            </form>
        </Container>
    )
}

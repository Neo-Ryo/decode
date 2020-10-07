import React from 'react'

export default function ArrayOfTrials({ array }) {
    const newArray = array.slice(Math.max(array.length - 5, 0))
    if (array) {
        return (
            <div>
                {newArray.map((el) => (
                    <p style={{ fontSize: 30 }}>{el}</p>
                ))}
            </div>
        )
    } else {
        return <></>
    }
}

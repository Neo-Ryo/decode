import React from 'react'

export default function Indicators({ colorIndicator, name }) {
    return (
        <div
            style={{
                width: 30,
                height: 30,
                margin: 5,
                borderRadius: '100%',
                border: 'solid 1px',
                backgroundColor: colorIndicator,
            }}
            name={name}
        ></div>
    )
}

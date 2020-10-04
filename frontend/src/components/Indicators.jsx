import React from 'react'

export default function Indicators({ colorIndicator }) {
    return (
        <div
            style={{
                width: 30,
                height: 30,
                margin: 5,
                borderRadius: '100%',
                backgroundColor: colorIndicator,
            }}
        ></div>
    )
}

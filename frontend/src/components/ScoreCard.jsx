import React from 'react'
import AnimatedNumber from 'animated-number-react'

export default function UserCard({ score }) {
    const fixed = (value) => Number.parseFloat(value).toFixed(2)
    return (
        <div>
            <p>
                <b style={{ fontSize: score }}>
                    <AnimatedNumber value={fixed(score)} /> %
                </b>{' '}
                of success!
            </p>
        </div>
    )
}

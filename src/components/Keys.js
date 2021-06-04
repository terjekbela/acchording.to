import React from 'react'
import './Keys.css';

export default function Keys(props) {
    // eslint-disable-next-line
    const { notes, ...restProps } = props;
    const keys = [...notes.midi].sort((a, b) => a - b).join(', ')

    return (
        <div key="123" className="keys">
            {keys}
        </div>
    )
}
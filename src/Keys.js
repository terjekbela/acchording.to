import React from 'react'
import './Keys.css';

export default function Keys(props) {
    // eslint-disable-next-line
    const { notes, ...restProps } = props;

    return (
        <div key="123" className="keys">
            MIDI keys: { notes }
        </div>
    )
}
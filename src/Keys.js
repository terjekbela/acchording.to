import React from 'react'
import './Keys.css';

function Keys(props) {
    // eslint-disable-next-line
    const { notes, ...restProps } = props;

    return (
        <div className="keys">
            { notes }
        </div>
    )
}

export default Keys

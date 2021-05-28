import React from 'react'
import './Clef.css';

function Clef(props) {
    const {type, ...restProps} = props
    return (
        <clef className={type}></clef>
    )
}

export default Clef

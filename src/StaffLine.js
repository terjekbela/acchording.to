import React from 'react'
import './StaffLine.css';

function StaffLine(props) {
    return (
        <line className={props.type}></line>
    )
}

export default StaffLine

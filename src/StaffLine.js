import React from 'react'
import './StaffLine.css';

function StaffLine(props) {
    return (
        <div className={'line ' + props.type}></div>
    )
}

export default StaffLine

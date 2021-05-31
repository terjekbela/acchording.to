import React from 'react'
import './StaffSpace.css';

function StaffSpace(props) {
    return (
        <div className={'space ' + props.type}></div>
    )
}

export default StaffSpace

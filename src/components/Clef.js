import React from 'react'
import './Clef.css';

function Clef(props) {
    // eslint-disable-next-line
    const {type, ...restProps} = props
    return (
        <div className={'clef ' + type}></div>
    )
}

export default Clef

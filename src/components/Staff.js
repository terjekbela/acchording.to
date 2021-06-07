import React from 'react'
import './Staff.css';
import Clef       from './Clef'
import StaffLine  from './StaffLine'
import StaffSpace from './StaffSpace'

function Staff(props) {
    const {clef, ...restProps} = props
    const items = []
    let key=1
    for(let i=0; i<props.ledgerTop*2; i++) {
        items.push(i%2 ? <StaffSpace key={key++} type="ledger" /> : <StaffLine key={key++} type="ledger" />)
    }
    for(let i=0; i<9; i++) {
        items.push(i%2 ? <StaffSpace key={key++} /> : <StaffLine key={key++} />)
    }
    for(let i=0; i<props.ledgerBottom*2; i++) {
        items.push(i%2 ? <StaffLine key={key++} type="ledger" /> : <StaffSpace key={key++} type="ledger" />)
    }
    return (
        <div className="staff">
            <Clef type={clef} />
            {items}
        </div>
    )
}

export default Staff
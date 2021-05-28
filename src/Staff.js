import React from 'react'

import './Staff.css';
import Clef       from './Clef'
import StaffLine  from './StaffLine'
import StaffSpace from './StaffSpace'

function Staff(props) {
    const {clef, ...restProps} = props
    const items = [];
    for(let i=0; i<props.ledgerTop*2; i++) {
        items.push(i%2 ? <StaffSpace type="ledger" /> : <StaffLine type="ledger" />)
    }
    for(let i=0; i<9; i++) {
        items.push(i%2 ? <StaffSpace /> : <StaffLine />)
    }
    for(let i=0; i<props.ledgerBottom*2; i++) {
        items.push(i%2 ? <StaffLine type="ledger" /> : <StaffSpace type="ledger" />)
    }
    return (
        <staff>
            <Clef type={clef} />
            {items}
        </staff>
    )
}

export default Staff

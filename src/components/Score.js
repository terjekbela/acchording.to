import React from 'react'
import './Score.css';
import System from './System'
import Keys from './Keys'

function Score(props) {
    const { notes, ...restProps } = props;
    return (
        <div className="score">
            <System type='grand' clef={['g','g','c','f']}/>
            <Keys notes={notes} />
        </div>
    );
}

export default Score
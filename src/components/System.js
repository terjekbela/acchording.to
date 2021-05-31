import React from 'react'
import './System.css';
import Staff from './Staff'

function System(props) {
    // eslint-disable-next-line
    const { clef, keySign, ...restProps } = props;
    switch(props.type) {
        case 'single':
            return (
                <div className="system single">
                    <Staff className="single" clef={clef[0]} keySign={keySign} ledgerTop='4' ledgerBottom='4' />
                </div>
            )
        case 'grand':
            return (
                <div className="system grand">
                    <Staff className="treble" clef={clef[0]} keySign={keySign} ledgerTop='2' ledgerBottom='3' />
                    <Staff className="bass"   clef={clef[1]} keySign={keySign} ledgerTop='3' ledgerBottom='2' />
                </div>
            )
        case 'satb':
            return (
                <div className="system satb">
                    <Staff className="soprano" clef={clef[0]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                    <Staff className="alto"    clef={clef[1]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                    <Staff className="tenor"   clef={clef[2]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                    <Staff className="bass"    clef={clef[3]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                </div>
            )
        default:
    }
}

System.defaultProps = {
    type: 'grand',
    clef: ['treble','bass']
};

//System.propTypes = {
//    type: PropTypes.string,
//    clef: PropTypes.array
//};

export default System
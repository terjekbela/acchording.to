import React from 'react'
import './System.css';
import Staff from './Staff'

function System(props) {
    const { clef, keySign, ...restProps } = props;
    switch(props.type) {
        case 'single':
            return (
                <system className="single">
                    <Staff className="single" clef={clef[0]} keySign={keySign} ledgerTop='4' ledgerBottom='4' />
                </system>
            )
        case 'grand':
            return (
                <system className="grand">
                    <Staff className="treble" clef={clef[0]} keySign={keySign} ledgerTop='2' ledgerBottom='3' />
                    <Staff className="bass"   clef={clef[1]} keySign={keySign} ledgerTop='3' ledgerBottom='2' />
                </system>
            )
        case 'satb':
            return (
                <system className="satb">
                    <Staff className="soprano" clef={clef[0]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                    <Staff className="alto"    clef={clef[1]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                    <Staff className="tenor"   clef={clef[2]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                    <Staff className="bass"    clef={clef[3]} keySign={keySign} ledgerTop='1' ledgerBottom='1' />
                </system>
            )
        default:
    }
}

System.defaultProps = {
    type: 'grand',
    clef: ['treble','bass']
};

export default System
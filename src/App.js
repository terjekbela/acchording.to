import React, { useState } from 'react'

import './App.css';
import Nav   from './Nav'
import Score from './Score'
import Keys  from './Keys'

function App() {
    const [notes, setNotes] = useState(new Set());
    //const [keySig, setkeySig] = useState(['f#', 'c#']);
    
    // runs on page load and connects all midi inputs
    window.addEventListener('DOMContentLoaded', function(){
        navigator.requestMIDIAccess().then(
            (midi) => {
                [...midi.inputs.values()].forEach((i) => midiConnectInput(i))
                midi.onstatechange = midiOnStateChange
            },
            (err) => console.log('No MIDI devices.')
        )
    });

    // receives midi messages, stores the in the notes Set and invokes note display
    const midiInMessage = (message) => {
        let command = message.data[0]
        let note = message.data[1]
        let velocity = (message.data.length > 2) ? message.data[2] : 0;
        switch (command) {
            case 144:
                if(velocity > 0) {
                    setNotes((notes)=>{notes.add(note); console.log(notes)})
                } else {
                    setNotes((notes)=>{notes.delete(note); console.log(notes)})
                }
                break;
            case 128:
                setNotes((notes)=>{notes.delete(note); console.log(notes)})
                break;
            default:
        }
    }

// connects to the midi input received
    const midiConnectInput = (input) => {
        input.onmidimessage = midiInMessage;
    }

// cycles through all inputs on midi state change (user plugges midi keyboard in)
    const midiOnStateChange = (event) => {
//    const selectEl = document.querySelector('midiport select');
//    while (selectEl.firstChild) selectEl.removeChild(selectEl.lastChild);
//    const optionEl = document.createElement("option");
//    optionEl.appendChild(document.createTextNode('MIDI'));
//    selectEl.appendChild(optionEl);
        [...event.target.inputs.values()].forEach((i)=>midiConnectInput(i))
    }

    return (
        <div className="App">
            <Nav />
            <Score />
            <Keys notes={notes} />
        </div>
    );
}





export default App
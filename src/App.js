import React, { useState } from 'react'

import './App.css';
import Nav   from './components/Nav'
import Score from './components/Score'
import Keys  from './components/Keys'

export default function App() {
    const [notes, setNotes] = useState(new Set());
    
    // runs on page load and connects all midi inputs
    window.addEventListener('DOMContentLoaded', () => {
        navigator.requestMIDIAccess({sysexEnabled:false}).then(
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
                    setNotes((notesState) => {
                        if(!notesState.has(note)) {
                            return new Set(notesState).add(note)
                        } else {
                            return notesState
                        }
                    })
                } else {
                    setNotes((notesState) => {
                        if(notesState.has(note)) {
                            let n = new Set(notesState)
                            n.delete(note)
                            return n
                        } else {
                            return notesState
                        }
                    })
                }
                break;
            case 128:
                setNotes((notesState) => {
                    if(notesState.has(note)) {
                        let n = new Set(notesState)
                        n.delete(note)
                        return n
                    } else {
                        return notesState
                    }
                })
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
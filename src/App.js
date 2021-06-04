import React, { useState, useEffect } from 'react'

import './App.css';
import Nav   from './components/Nav'
import Score from './components/Score'

export default function App() {
    const [notes, setNotes] = useState({midi: new Set()});

    // runs on page load and connects all midi inputs
    useEffect(() => {
        navigator.requestMIDIAccess({sysexEnabled:false}).then(
            (midi) => {
                [...midi.inputs.values()].forEach((i) => i.onmidimessage = midiInMessage)
                midi.onstatechange = (event) => {
                    [...event.target.inputs.values()].forEach((i) => i.onmidimessage = midiInMessage)
                }
            },
            (err) => console.log('No MIDI devices: ', err.message)
        )
    }, [])

    // receives midi messages, stores them in the notes.midi Set
    const midiInMessage = (message) => {
        let command = message.data[0]
        let note = message.data[1]
        let velocity = (message.data.length > 2) ? message.data[2] : 0;
        if(command===144 || (command===128 && velocity===0)){
            setNotes((n) => {
                if(!n.midi.has(note)) return {midi: new Set(n.midi).add(note)}
                return n
            })
        } else if (command===128) {
            setNotes((n) => {
                if(n.midi.has(note)) {
                    let midi = new Set(n.midi)
                    midi.delete(note)
                    return {midi}
                }
                return n
            })
        }
    }

    return (
        <div className="App">
            <Nav />
            <Score notes = {notes} />
        </div>
    );
}
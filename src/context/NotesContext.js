import React, { useState, useContext, useEffect} from 'react'

const NotesContext = React.createContext()
const NotesUpdateContext = React.createContext()

export function useNotes() {
    return useContext(NotesContext)
}

export function useNotesUpdate() {
    return useContext(NotesUpdateContext)
}

export default function NotesProvider({children}) {
    const [notes, setNotes] = useState({midi: new Set()});

    // runs once to connect inputs and associates change handler
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
        if(command===144){
            setNotes((n) => {
                if(n.midi.has(note)) return n
                return {midi: new Set(n.midi).add(note)}
            })
        } else if (command===128 || (command===144 && velocity===0)) {
            setNotes((n) => {
                if(!n.midi.has(note)) return n
                let midi = new Set(n.midi)
                midi.delete(note)
                return {midi}
            })
        }
    }

    return (
        <NotesContext.Provider value={notes}>
            <NotesUpdateContext.Provider value={setNotes}>
                {children}
            </NotesUpdateContext.Provider>
        </NotesContext.Provider>
    )
}
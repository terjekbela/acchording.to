import React from 'react'
import './Keys.css';
import { useNotes } from '../context/NotesContext'

export default function Keys() {
    const notes = useNotes();
    const keys = [...notes.midi].sort((a, b) => a - b).join(', ')

    return (
        <div className="keys">
            {keys}
        </div>
    )
}
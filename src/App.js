import React from 'react'

import './App.css';
import Nav   from './components/Nav'
import Score from './components/Score'
import NotesProvider from './context/NotesContext'

export default function App() {
    return (
        <div className="App">
            <NotesProvider>
                <Nav />
                <Score />
            </NotesProvider>
        </div>
    );
}
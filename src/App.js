import React, { /*useState*/ } from 'react'

import './App.css';
import Nav   from './Nav'
import Score from './Score'
import Keys  from './Keys'

function App() {

    //const [notes, setNotes]   = useState(['d', 'f#', 'a']);
    //const [keySig, setkeySig] = useState(['f#', 'c#']);

    return (
        <div className="App">
            <Nav />
            <Score />
            <Keys />
        </div>
    );
}

export default App

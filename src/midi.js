let notes = new Set;

// runs one on page load and connects all midi inputs
navigator.requestMIDIAccess().then(
    (midi) => {
        [...midi.inputs.values()].forEach((i)=>midiConnectInput(i));
        midi.onstatechange = midiOnStateChange
    },
    (err) => console.log('No MIDI devices.')
);

// receives midi messages, stores the in the notes Set and invokes note display
function midiInMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;
    switch (command) {
        case 144:
            velocity > 0 ? notes.add(note) : notes.delete(note);
            notePlace();
            break;
        case 128:
            notes.delete(note);
            notePlace();
            break;
    }
}

// cycles through all inputs on midi state change (user plugges midi keyboard in)
function midiOnStateChange(event) {
    const selectEl = document.querySelector('midiport select');
    while (selectEl.firstChild) selectEl.removeChild(selectEl.lastChild);
    const optionEl = document.createElement("option");
    optionEl.appendChild(document.createTextNode('MIDI'));
    selectEl.appendChild(optionEl);
    [...event.target.inputs.values()].forEach((i)=>midiConnectInput(i));
}

// connects to the midi input received
function midiConnectInput(input) {
    input.onmidimessage = midiInMessage;
    const selectEl = document.querySelector('midiport select');
    const optionEl = document.createElement("option");
    optionEl.appendChild(document.createTextNode(input.name));
    selectEl.appendChild(optionEl);
}
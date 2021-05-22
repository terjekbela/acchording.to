let notes = new Set;

navigator.requestMIDIAccess().then(
    (midi) => {
        [...midi.inputs.values()].forEach((i)=>{
            i.onmidimessage = midiInMessage;
            const selectEl = document.querySelectorAll('midiport select optgroup')[0];
            const optionEl = document.createElement("option");
            optionEl.appendChild(document.createTextNode(i.name));
            selectEl.appendChild(optionEl);
        });
        [...midi.outputs.values()].forEach((o)=>{
            o.onmidimessage = midiOutMessage;
            const selectEl = document.querySelectorAll('midiport select optgroup')[1];
            const optionEl = document.createElement("option");
            optionEl.appendChild(document.createTextNode(o.name));
            selectEl.appendChild(optionEl);
        });
    },
    () => console.log('No MIDI devices.')
);

function midiInMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;
    switch (command) {
        case 144:
            velocity > 0 ? notes.add(note) : notes.delete(note);
            break;
        case 128:
            notes.delete(note);
            break;
    }
    notePlace();
}

function midiOutMessage(message) {}

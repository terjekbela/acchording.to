let notes = new Set;

navigator.requestMIDIAccess().then(
    (midi) => {
        for (let input of midi.inputs.values()) {
            input.onmidimessage = midiMessage;
        }
    },
    () => console.log('No MIDI devices.')
);

function midiMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;
    switch (command) {
        case 144:
            if (velocity > 0) notes.add(note);
            else notes.delete(note);
            break;
        case 128:
            notes.delete(note);
            break;
    }
    midiDisplay();
}

function midiDisplay() {
    let lines = document.querySelectorAll('.top line,.top space');
    if (lines.length) {
        lines.forEach(linesEl => {
            let midiNote = parseInt(linesEl.id.replace('midi',''));
            if (notes.has(midiNote)) {
                if (!linesEl.hasChildNodes()) {
                    let noteEl = document.createElement("note");
                    linesEl.appendChild(noteEl);
                }
            } else {
                while(linesEl.hasChildNodes()) {
                    linesEl.removeChild(linesEl.firstChild);
                }
            }
        });
    }
}
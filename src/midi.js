let notes = new Set;

navigator.requestMIDIAccess().then(
    (midi) => {
        for (let input of midi.inputs.values()) {
            input.onmidimessage = midiMessage;
            //console.log(input);
        };
        for (let output of midi.outputs.values()) {
            //console.log(output);
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
    midiPlace();
}

function midiPlace() {
    document.querySelectorAll('note').forEach((e) => e.remove());
    let notesArr = [...notes].sort();
    console.log(notesArr);
    notesArr.forEach((n,i) => {
        if(i > 0 || notesArr.length<4) {
            midiPlaceNote(n, 'top');
        } else {
            midiPlaceNote(n, 'bottom');
        }
    });
}

function midiPlaceNote(note, staff) {
    let noteEl = document.createElement("note");
    if (midiMatchNote(note, 'top') && midiMatchNote(note, 'bottom')) {
        let linesEl = document.querySelector('staff.' + staff + ' #n' + note);
        linesEl.appendChild(noteEl);
    } else if (midiMatchNote(note, 'top')) {
        let linesEl = document.querySelector('staff.top' + ' #n' + note);
        linesEl.appendChild(noteEl);
    } else if (midiMatchNote(note, 'bottom')) {
        let linesEl = document.querySelector('staff.bottom' + ' #n' + note);
        linesEl.appendChild(noteEl);
    }
}

function midiMatchNote(note, staff) {
    return document.querySelectorAll('staff.' + staff + ' #n' + note).length > 0;
}

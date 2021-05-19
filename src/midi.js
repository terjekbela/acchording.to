let notes = new Set;

navigator.requestMIDIAccess().then(
    (midi) => {
        [...midi.inputs.values()].forEach((i)=>i.onmidimessage = midiMessage);
        [...midi.outputs.values()].forEach((o)=>console.log(o));
    },
    () => console.log('No MIDI devices.')
);

function midiMessage(message) {
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

function notePlace() {
    let notesArr = [...notes].sort();
    //console.log(notesArr);
    document.querySelectorAll('note').forEach((e) => {  // ugly
        e.parentElement.classList.remove('show');
        e.remove();
    });
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
    let lineEl = null; // a line or a space really
    if (noteMatchStaff(note, 'top') && noteMatchStaff(note, 'bottom')) {
        lineEl = document.querySelector('staff.' + staff + ' .n' + note);
    } else if (noteMatchStaff(note, 'top')) {
        lineEl = document.querySelector('staff.top .n' + note);
    } else if (noteMatchStaff(note, 'bottom')) {
        lineEl = document.querySelector('staff.bottom .n' + note);
    }
    if (lineEl!==null) {
        lineEl.appendChild(noteEl);
        if (lineEl.classList.contains('ledger')) {
            lineEl.classList.add('show');
        }
    }
}

function noteMatchStaff(note, staff) {
    return document.querySelectorAll('staff.' + staff + ' .n' + note).length > 0;
}

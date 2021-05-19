let notes = new Set;

navigator.requestMIDIAccess().then(
    (midi) => {
        [...midi.inputs.values()].forEach((i)=>i.onmidimessage = midiMessage);
//      [...midi.outputs.values()].forEach((o)=>console.log(o));
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
            notePlaceNote(n, 'top');
        } else {
            notePlaceNote(n, 'bottom');
        }
    });
}

function notePlaceNote(note, staff) {
    let noteEl = document.createElement("note");
    let lineEl = null; // a line or a space really
    if (noteMatchStaff(note, 'top') && noteMatchStaff(note, 'bottom')) {
        lineEl = noteMatchLine(note, staff);
    } else if (noteMatchStaff(note, 'top')) {
        lineEl = noteMatchLine(note, 'top');
    } else if (noteMatchStaff(note, 'bottom')) {
        lineEl = noteMatchLine(note, 'bottom');
    }
    if (lineEl!==null) {
        lineEl.appendChild(noteEl);
        if (lineEl.classList.contains('ledger')) lineEl.classList.add('show');
        if (lineEl.classList.contains('s' + note)) noteEl.classList.add('sharp');
    }
}

function noteMatchStaff(note, staff) {
    if(document.querySelectorAll('staff.' + staff + ' .n' + note).length) {
        return true;
    } else if(document.querySelectorAll('staff.' + staff + ' .s' + note).length) {
        return true;
    }
    return false;
}

function noteMatchLine(note, staff) {
    lineElNatural = document.querySelector('staff.' + staff + ' .n' + note);
    lineElSharp   = document.querySelector('staff.' + staff + ' .s' + note);
    lineElFlat    = document.querySelector('staff.' + staff + ' .f' + note);
    if (lineElNatural!==null) return lineElNatural;
    if (lineElSharp!==null) return lineElSharp;
    if (lineElFlat!==null) return lineElFlat;
    return null;
}
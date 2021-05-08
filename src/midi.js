navigator.requestMIDIAccess().then(midiSuccess, midiFailure);

function midiSuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = midiMessage;
    }
}

function midiFailure() {
    console.log('Could not access your MIDI devices.');
}

function midiMessage(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;
    switch (command) {
        case 144:
            if (velocity > 0) {
                midiNoteOn(note, velocity);
            } else {
                midiNoteOff(note);
            }
            break;
        case 128:
            midiNoteOff(note);
            break;
    }
}

function midiNoteOn(note) {
    console.log('on:' + note);
}

function midiNoteOff(note) {
    console.log('off:' + note);
}

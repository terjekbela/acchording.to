function notePlace() {
    let notesArr = [...notes].sort();
    document.querySelectorAll('note').forEach((e) => {  // ugly
        e.parentElement.classList.remove('show');
        e.remove();
    });
    document.querySelectorAll('line.ledger').forEach((e) => {  // ugly
        e.classList.remove('show');
    });
    console.log(notes);
    notesArr.forEach((note,i,a) => {
        let staff = (i > 0 || a.length<4)?'top':'bottom';
        let lineEl = null;
        if (noteMatchStaff(note, 'top') && noteMatchStaff(note, 'bottom')) {
            lineEl = noteMatchLine(note, staff);
        } else if (noteMatchStaff(note, 'top')) {
            lineEl = noteMatchLine(note, 'top');
        } else if (noteMatchStaff(note, 'bottom')) {
            lineEl = noteMatchLine(note, 'bottom');
        }
        if (lineEl!==null) {
            let noteEl = document.createElement("note");
            lineEl.appendChild(noteEl);
            if (lineEl.classList.contains('ledger')) lineEl.classList.add('show');
            if (lineEl.classList.contains('s' + note)) noteEl.classList.add('sharp');
            if (lineEl.classList.contains('f' + note)) noteEl.classList.add('flat');
            ledgerLines = Array.from(lineEl.classList).filter((c)=>{
                return c.charAt(0)=='l' && c!='ledger';
            });
            if(ledgerLines.length) {
                ledgerLines.forEach((lineClass)=>{
                    let sel = '.n'+lineClass.substr(1,3);
                    lineEl.parentElement.querySelector(sel).classList.add('show');
                });
            }
        }
    });
}

function noteMatchStaff(note, staff) {
    if(document.querySelectorAll('staff.' + staff + ' .n' + note).length) {
        return true;
    } else if(document.querySelectorAll('staff.' + staff + ' .s' + note).length) {
        return true;
    } else if(document.querySelectorAll('staff.' + staff + ' .f' + note).length) {
        return true;
    } else return false;
}

function noteMatchLine(note, staff) {
    lineElNatural = document.querySelector('staff.' + staff + ' .n' + note);
    lineElSharp   = document.querySelector('staff.' + staff + ' .s' + note);
    lineElFlat    = document.querySelector('staff.' + staff + ' .f' + note);
    if (lineElNatural!==null) return lineElNatural;
    if (lineElFlat!==null) return lineElFlat;
    if (lineElSharp!==null) return lineElSharp;
    return null;
}
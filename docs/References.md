# References and inspirations for SATB.ninja

## SMuFL
### https://www.smufl.org/
SMuFL is a font specification that provides a way of mapping musical symbols required by music notation into Unicode.

## LEland font
### https://github.com/MuseScoreFonts/Leland
The fonts have been initially developed for MuseScore (https://www.musescore.org) music composition software. Leland is compliant with Standard Music Font Layout (SMuFL), which provides a standard way of mapping the thousands of musical symbols required by conventional music notation into the Private Use Area in Unicode's Basic Multilingual Plane for a single (format-independent) font. The font is named after Leland Smith, creator of the SCORE music notation software.

## WEB MIDI API
### https://webaudio.github.io/web-midi-api/
Defines an API supporting the MIDI protocol within the bbrowser, enabling web applications to send and receive MIDI messages. It is intended to enable non-music MIDI applications as well as music ones, by providing low-level access to the MIDI devices available on the users' systems. The Web MIDI API is not intended to describe music or controller inputs semantically; it is designed to expose the mechanics of MIDI input and output interfaces, and the practical aspects of sending and receiving MIDI messages, without identifying what those actions might mean semantically.

## HARMONET
### https://proceedings.neurips.cc/paper/1991/file/a7aeed74714116f3b292a982238f83d2-Paper.pdf
A system employing connectionist networks for music processing. After being trained on some dozen Bach chorales using error backpropagation, the system is capable of producing four-part chorales in the style of J.S.Bach, given a one-part melody. The system solves a musical real-world problem on a performance level appropriate for musical practice. HARMONET's power is based on a new coding scheme capturing musically relevant information and the integration of backpropagation and symbolic algorithms in a hierarchical system, combining the advantages of both.

## PyChoReLib
### http://chordrecognizer.sourceforge.net/
A Python library that provides a number of classes which offer the following functionality: transformation of a list of note names to a chord name; inversions are indicated using a slash and the root note; can recognize intervals; recognition does take into account the difference between e.g. 'f#' and 'gb'; intervals and chords can be transposed.

## Chord identifier plugin
### https://github.com/dmitrio95/msc_plugins/
A Chord Identifier Plugin for MuseScore, written by Ke Xu and ported to MS3 by Dmitri Ovodok. Based on other harmony finder and chord notation plugins for the same software.
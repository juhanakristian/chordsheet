import React, { useEffect } from "react";

import { draw } from "vexchords";

type Note = string | number;

interface ChordProps {
  notes: Note[];
  name: string;
}

function Chord(props: ChordProps) {
  const elementId = `c${props.notes.join("")}`;
  const chordNotes = props.notes.map((note, index) => [index + 1, note]);

  useEffect(() => {
    draw(`#${elementId}`, {
      chord: chordNotes,
    });
  });

  return (
    <div>
      <div className="">{props.name}</div>
      <div id={elementId}></div>
    </div>
  );
}

export default Chord;

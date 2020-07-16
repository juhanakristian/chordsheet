import React, { useEffect, useLayoutEffect, useRef } from "react";

import { draw } from "vexchords";

import { useWindowSize } from "../hooks/size";

type Note = string | number;

interface ChordProps {
  notes: Note[];
  name: string;
}

function Chord(props: ChordProps) {
  const container = useRef(null);
  const { width, height } = useWindowSize();
  const elementId = `c${props.notes.join("")}`;
  const chordNotes = props.notes.map((note, index) => [index + 1, note]);

  useLayoutEffect(() => {
    const selector = `#${elementId}`;
    document.querySelector(selector).innerHTML = "";

    draw(selector, {
      chord: chordNotes,
    }, {
      width: container.current.offsetWidth,
    });
  }, [container, width]);

  return (
    <div
      className="flex flex-col overflow-hidden border-2 border-solid rounded-lg group hover:border-blue-400"
    >
      <div className="text-center bg-gray-200 group-hover:bg-blue-400">
        {props.name}
      </div>
      <div className="max-w-sm" ref={container} id={elementId}></div>
    </div>
  );
}

export default Chord;

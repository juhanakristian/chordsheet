import React, { useState, useEffect, useRef } from "react";

import { draw } from "vexchords";

import { useWindowSize } from "../hooks/size";
import AddIcon from "../icons/AddIcon";
import IconButton from "./IconButton";

type Note = string | number;

export interface ChordData {
  notes: Note[];
  name: string;
}

interface ChordProps {
  data: ChordData;
  onAdd: (data: ChordData) => void;
}

function Chord(props: ChordProps) {
  const container = useRef(null);
  const [hover, setHover] = useState(false);
  const { width, height } = useWindowSize();

  const elementId = `c${props.data.notes.join("")}`;
  const chordNotes = props.data.notes.map((note, index) => [index + 1, note]);

  useEffect(() => {
    const selector = `#${elementId}`;
    // Clear the container
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex flex-row pl-2 pr-2 bg-gray-200 group-hover:bg-blue-400"
      >
        <div className="flex-grow">
          {props.data.name}
        </div>
        <IconButton onClick={() => props.onAdd(props.data)}>
          <AddIcon size={12} color="#63b3ed" />
        </IconButton>
      </div>
      <div className="max-w-sm" ref={container} id={elementId}></div>
    </div>
  );
}

export default Chord;

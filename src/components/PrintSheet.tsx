import React, { useEffect } from "react";

import { draw } from "vexchords";

import { ChordData } from "./Chord";

import { getChordIdentifier } from "../App";

import "../index.css";

interface SheetProps {
  chords: ChordData[];
}

function PrintSheet(props: SheetProps) {
  useEffect(() => {
    for (const c of props.chords) {
      const id = getChordIdentifier(c);
      const selector = `#printsheet_${id}`;
      // Clear the container
      document.querySelector(selector).innerHTML = "";

      draw(
        selector,
        {
          ...c,
        },
        {
          width: 150,
          height: 210,
        }
      );
    }
  }, [props.chords]);

  const chords = props.chords.map((c: ChordData) => {
    const id = getChordIdentifier(c);
    return (
      <div
        style={{ width: 150, height: 210 }}
        key={id}
        id={`printsheet_${id}`}
      ></div>
    );
  });

  return (
    <div className="w-full h-full bg-white border border-solid shadow-xl aspect-ratio-a4 print">
      <div className="absolute flex">{chords}</div>
    </div>
  );
}

export default PrintSheet;

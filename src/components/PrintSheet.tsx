import React from "react";

import { draw } from "vexchords";

import { ChordData } from "./Chord";

import { getChordIdentifier } from "../App";

import "../index.css";

interface SheetProps {
  chords: ChordData[];
}

function PrintSheet(props: SheetProps) {
  React.useLayoutEffect(() => {
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
      <div key={id}>
        <div className="m-auto text-sm text-center" style={{ width: 150 }}>
          {c.name}
        </div>
        <div
          style={{ width: 150, height: 210, marginTop: -10 }}
          id={`printsheet_${id}`}
        ></div>
      </div>
    );
  });

  return (
    <div className="relative p-2 bg-white border border-solid shadow-xl aspect-ratio-a4 print">
      <div className="absolute flex flex-wrap min-w-full">{chords}</div>
    </div>
  );
}

export default PrintSheet;

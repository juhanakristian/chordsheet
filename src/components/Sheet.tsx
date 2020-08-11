import React, { useEffect } from "react";

import { draw } from "vexchords";

import { ChordData } from "./Chord";

import { getChordIdentifier } from "../App";

interface SheetProps {
  chords: ChordData[];
}

function Sheet(props: SheetProps) {
  useEffect(() => {
    for (const c of props.chords) {
      const id = getChordIdentifier(c);
      const selector = `#sheet_${id}`;
      // Clear the container
      document.querySelector(selector).innerHTML = "";

      draw(
        selector,
        {
          chord: c.chord,
        },
        {
          width: 50,
          height: 70,
        }
      );
    }
  }, [props.chords]);

  const chords = props.chords.map((c: ChordData) => {
    const id = getChordIdentifier(c);
    return (
      <div style={{ width: 50, height: 70 }} key={id} id={`sheet_${id}`}></div>
    );
  });

  return (
    <div
      id="print"
      className="bg-white border border-solid shadow-xl aspect-ratio-a4"
    >
      <div className="absolute flex">{chords}</div>
    </div>
  );
}

export default Sheet;

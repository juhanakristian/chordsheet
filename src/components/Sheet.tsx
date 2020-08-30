import React, { useEffect } from "react";

import { draw } from "vexchords";

import { ChordData } from "./Chord";

import { getChordIdentifier } from "../App";

import "../index.css";

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
          ...c,
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
      <div key={id}>
        <div className="m-auto text-center text-xxs" style={{ width: 50 }}>
          {c.name}
        </div>
        <div
          className="pt-1"
          data-testid={`sheet-chord-${id}`}
          style={{ width: 50, height: 70, marginTop: -10 }}
          id={`sheet_${id}`}
        ></div>
      </div>
    );
  });

  return (
    <div className="relative p-2 bg-white border border-solid shadow-xl aspect-ratio-a4">
      <div className="absolute flex flex-wrap min-w-full">{chords}</div>
    </div>
  );
}

export default Sheet;

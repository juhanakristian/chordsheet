import React, { useEffect } from "react";
import { ChordData } from "./Chord";

import { draw } from "vexchords";
import { getChordIdentifier } from "../App";

interface SheetProps {
  chords: ChordData[];
}

function Sheet(props: SheetProps) {
  useEffect(() => {
    for (const c of props.chords) {
      const id = getChordIdentifier(c);
      const selector = `#sheet_${id}`;
      draw(selector, {
        chord: c.chord,
      });
    }
  }, [props.chords]);

  const chords = props.chords.map((c: ChordData) => {
    const id = getChordIdentifier(c);
    return <div key={id} id={`sheet_${id}`}></div>;
  });

  return (
    <div className="bg-white border border-solid shadow-xl aspect-ratio-a4">
      {chords}
    </div>
  );
}

export default Sheet;

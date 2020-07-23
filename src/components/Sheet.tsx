import React, { useEffect } from "react";
import { ChordData } from "./Chord";

import { draw } from "vexchords";

interface SheetProps {
  chords: ChordData[];
}

function Sheet(props: SheetProps) {
  useEffect(() => {
    console.log("useEffect");
    for (const c of props.chords) {
      console.log(c);
      const selector = `#${c.name}_${c.notes.join("")}`;
      draw(selector, {
        chord: c.notes,
      });
    }
  }, [props.chords]);

  const chords = props.chords.map((c: ChordData) => {
    const identifier = `${c.name}_${c.notes.join("")}`;
    return <div key={identifier} id={identifier}></div>;
  });

  return (
    <div className="bg-white border border-solid shadow-xl aspect-ratio-a4">
      {chords}
    </div>
  );
}

export default Sheet;

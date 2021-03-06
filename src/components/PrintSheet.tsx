import React from "react";

import { draw } from "vexchords";

import { ChordData } from "./Chord";

import "../index.css";

export function getChordIdentifier(data: ChordData) {
  const t = data.chord.join("").replace(/,/g, "");
  return `${data.name}-${t}`;
}
interface Props {
  title: string;
  chords: ChordData[];
}

function PrintSheet({ chords, title }: Props) {
  React.useLayoutEffect(() => {
    for (const c of chords) {
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
  }, [chords]);

  const chordsComponents = chords.map((c: ChordData) => {
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
      <div className="text-3xl text-center border-none outline-none">
        {title}
      </div>
      <div className="absolute flex flex-wrap min-w-full">
        {chordsComponents}
      </div>
    </div>
  );
}

export default PrintSheet;

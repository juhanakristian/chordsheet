import React, { useEffect } from "react";

import { draw } from "vexchords";

interface ChordProps {
  identifier: string;
}

function Chord(props: ChordProps) {
  const elementId = `chord-${props.identifier}`;
  useEffect(() => {
    draw(`#${elementId}`, {
      chord: [
        [1, 2],
        [2, 1],
        [3, 2],
        [4, 0],
        [5, "x"],
        [6, "x"],
      ],
    });
  });
  return <div id={elementId}></div>;
}

export default Chord;

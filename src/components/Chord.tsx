import React from "react";

import { draw } from "vexchords";

import { useWindowSize } from "../hooks/size";
import AddIcon from "../icons/AddIcon";
import IconButton from "./IconButton";

type ChordNote = [number, number];

export interface ChordData {
  chord: ChordNote[];
  name: string;
}

interface ChordProps {
  data: ChordData;
  identifier: string;
  onAdd: (data: ChordData) => void;
}

function Chord(props: ChordProps) {
  const container = React.useRef(null);
  const [hover, setHover] = React.useState(false);
  const { width } = useWindowSize();

  React.useLayoutEffect(() => {
    const selector = `#${props.identifier}`;
    // Clear the container
    document.querySelector(selector).innerHTML = "";

    draw(
      selector,
      {
        ...props.data,
      },
      {
        width: container.current.offsetWidth,
        height: container.current.offsetWidth * (70 / 50),
      }
    );
  }, [container, width, props.identifier, props.data]);

  return (
    <div
      className="flex flex-col overflow-hidden border-2 border-solid rounded-lg group hover:border-blue-400"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex flex-row pl-2 pr-2 bg-gray-200 group-hover:bg-blue-400">
        <div role="heading" className="flex-grow group-hover:text-white">
          {props.data.name}
        </div>
        {hover && (
          <IconButton label="add" onClick={() => props.onAdd(props.data)}>
            <AddIcon />
          </IconButton>
        )}
      </div>
      <div>
        <div
          className="m-auto"
          style={{ maxWidth: 110 }}
          ref={container}
          id={props.identifier}
        ></div>
      </div>
    </div>
  );
}

export default Chord;

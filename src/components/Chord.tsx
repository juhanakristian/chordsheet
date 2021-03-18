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
  onClick?: (data: ChordData) => void;
  highlight?: boolean;
}

function Chord({ identifier, onClick, highlight, data }: ChordProps) {
  const container = React.useRef(null);
  const { width } = useWindowSize();

  React.useLayoutEffect(() => {
    const selector = `#${identifier}`;
    // Clear the container
    document.querySelector(selector).innerHTML = "";

    draw(
      selector,
      {
        ...data,
      },
      {
        width: container.current.offsetWidth,
        height: container.current.offsetWidth * (70 / 50),
      }
    );
  }, [container.current, width, identifier, data]);

  const borderColor = highlight ? "border-yellow-400" : "border-gray-200";
  const headerBgColor = highlight ? "bg-yellow-400" : "bg-gray-200";

  return (
    <div
      className={`flex flex-col overflow-hidden border-2 border-solid ${borderColor} rounded-lg cursor-pointer group hover:border-blue-400`}
      onClick={() => onClick && onClick(data)}
    >
      <div
        className="relative flex items-center justify-center h-0"
        style={{ paddingTop: "calc(297 / 210 * 100%)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className={`flex flex-row pl-2 pr-2 ${headerBgColor} group-hover:bg-blue-400`}
          >
            <div role="heading" className="flex-grow group-hover:text-white">
              {data.name}
            </div>
          </div>
          <div>
            <div className="m-auto" ref={container} id={identifier}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chord;

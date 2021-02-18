import React from "react";

import { useWindowSize } from "../hooks/size";
import AddIcon from "../icons/AddIcon";
import IconButton from "./IconButton";

interface Props {
  onClick: () => void;
}

export default function AddChord({ onClick }: Props) {
  const [hover, setHover] = React.useState(false);
  const { width } = useWindowSize();

  return (
    <div
      className="flex flex-col overflow-hidden bg-gray-100 border-2 border-solid rounded-lg cursor-pointer group hover:border-blue-400"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* <div className="flex flex-row pl-2 pr-2 bg-gray-200 group-hover:bg-blue-400"></div> */}
      <div
        className="relative flex items-center justify-center h-0"
        style={{ paddingTop: "calc(297 / 210 * 100%)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="flex items-center justify-center w-full h-full">
            <IconButton label="add" onClick={onClick}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

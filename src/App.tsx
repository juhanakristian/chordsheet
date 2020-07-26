import React, { useState, useEffect } from "react";

import Sheet from "./components/Sheet";
import Search from "./components/Search";
import Chord, { ChordData } from "./components/Chord";

import { ipcRenderer } from "electron";

export function getChordIdentifier(data: ChordData) {
  const t = data.chord.join("").replace(/,/g, "");
  return `${data.name}-${t}`;
}

function App() {
  const [chords, setChords] = useState([]);
  const [selected, setSelected] = useState([]);

  function handleAddClicked(data: ChordData) {
    const isSelected = selected.find((c: ChordData) => c.name === data.name);
    if (isSelected) return;

    setSelected([...selected, data]);
    console.log(selected);
  }

  useEffect(() => {
    const result = ipcRenderer.sendSync("read-config");
    setChords(result);
  }, []);

  const chordsComponents = chords.map((data, index) => {
    const id = getChordIdentifier(data);

    return <Chord
      key={id}
      identifier={id}
      data={data}
      onAdd={(data) => handleAddClicked(data)}
    />;
  });

  return (
    <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden">
      <div className="flex flex-row w-full h-full">
        <div className="w-full overflow-auto">
          <div className="pt-5 pl-5 pr-10">
            <Search value="" onChange={(value: string) => {}} />
          </div>

          <div className="grid grid-flow-row grid-cols-8 gap-4 p-5 ">
            <div className="col-span-6">
              {chordsComponents}
            </div>
          </div>
        </div>
        <div className="flex-grow-0 hidden w-4/12 p-10 bg-blue-900">
          <Sheet chords={selected} />
        </div>
      </div>
    </div>
  );
}

export default App;

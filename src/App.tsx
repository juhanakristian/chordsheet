import React, { useState, useEffect } from "react";

import Sheet from "./components/Sheet";
import Search from "./components/Search";
import Chord, { ChordData } from "./components/Chord";

import { ipcRenderer } from "electron";

function App() {
  const [chords, setChords] = useState([]);
  const [selected, setSelected] = useState([]);

  function handleAddClicked(data: ChordData) {
  }

  useEffect(() => {
    const result = ipcRenderer.sendSync("read-config");
    setChords(result);
  }, []);

  const chordsComponents = chords.map((chord, index) => {
    const chordId = `${index}-${chord.notes.join("")}`;
    const data = {
      notes: chord.notes,
      name: chord.name,
    };

    return <Chord
      key={chordId}
      data={data}
      onAdd={(data) => handleAddClicked(data)}
    />;
  });

  return (
    <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden">
      <div className="flex flex-row w-full h-full">
        <div className="w-8/12 overflow-auto">
          <div className="pt-5 pl-5 pr-10">
            <Search value="" onChange={(value: string) => {}} />
          </div>

          <div className="grid grid-flow-row grid-cols-6 gap-4 p-5 ">
            {chordsComponents}
          </div>
        </div>
        <div className="flex-grow-0 w-4/12 p-10 bg-blue-900">
          <Sheet />
        </div>
      </div>
    </div>
  );
}

export default App;

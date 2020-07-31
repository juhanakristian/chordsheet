import React, { useState, useEffect } from "react";

import Sheet from "./components/Sheet";
import Search from "./components/Search";
import Chord, { ChordData } from "./components/Chord";
import Sidebar from "./components/Sidebar";

import { ipcRenderer } from "electron";

export function getChordIdentifier(data: ChordData) {
  const t = data.chord.join("").replace(/,/g, "");
  return `${data.name}-${t}`;
}

function App() {
  const [chords, setChords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

    return (<div className="col-span-4 sm:col-span-2 lg:col-span-1">
      <Chord
        key={id}
        identifier={id}
        data={data}
        onAdd={(data) => handleAddClicked(data)}
      />
    </div>);
  });

  return (
    <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden">
      <div className="flex flex-row w-full h-full">
        <div className="w-full overflow-auto overflow-x-hidden">
          <div className="flex pt-5 pl-5 pr-10">
            <Search value="" onChange={(value: string) => {}} />
            <div className="flex-grow"></div>
            <button
              className=""
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {"<<"}
            </button>
          </div>

          <div className="grid grid-flow-row grid-cols-8 gap-4 p-5 ">
            {chordsComponents}
          </div>
        </div>
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Sheet chords={selected} />
        </Sidebar>
      </div>
    </div>
  );
}

export default App;

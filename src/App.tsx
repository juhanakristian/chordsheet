import React, { useRef, useState, useEffect } from "react";

import Sheet from "./components/Sheet";
import Search from "./components/Search";
import Chord, { ChordData } from "./components/Chord";
import Sidebar from "./components/Sidebar";
import Button from "./components/Button";

import IconButton from "./components/IconButton";
import PrintIcon from "./icons/PrintIcon";

import { ipcRenderer } from "electron";

import "./index.css";
import PrintSheet from "./components/PrintSheet";

export function getChordIdentifier(data: ChordData) {
  const t = data.chord.join("").replace(/,/g, "");
  return `${data.name}-${t}`;
}

function App() {
  const [chords, setChords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchString, setSearchString] = useState("");

  function handleAddClicked(data: ChordData) {
    const isSelected = selected.find((c: ChordData) => c.name === data.name);
    if (isSelected) return;

    setSelected([...selected, data]);
  }

  function handlePrint() {
    window.print();
  }

  function handleClear() {
    console.log('"Clear" clicked');
    setSelected([]);
  }

  useEffect(() => {
    const result = ipcRenderer.sendSync("read-config");
    setChords(result);
  }, []);

  const filteredChords = chords.filter((data: ChordData) => {
    if (!searchString || searchString.length == 0) return true;

    const pattern = new RegExp(`^${searchString}`);
    if (pattern.test(data.name)) return true;

    return false;
  });

  const chordsComponents = filteredChords.map((data: ChordData) => {
    const id = getChordIdentifier(data);

    return (
      <div key={id} className="col-span-4 sm:col-span-2 lg:col-span-1">
        <Chord
          identifier={id}
          data={data}
          onAdd={(data) => handleAddClicked(data)}
        />
      </div>
    );
  });

  return (
    <>
      <PrintSheet chords={selected} />
      <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden no-print">
        <div className="flex flex-row w-full h-full">
          <div className="w-full overflow-auto overflow-x-hidden">
            <div className="flex pt-5 pl-5 pr-10 no-print">
              <Search
                value={searchString}
                onChange={(value: string) => {
                  setSearchString(value);
                }}
              />
              <div className="flex-grow"></div>
              <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
                <PrintIcon size={24} />
              </IconButton>
            </div>

            <div className="grid grid-flow-row grid-cols-8 gap-4 p-5 debug">
              {chordsComponents}
            </div>
          </div>
          <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
            <Sheet chords={selected} />
            <div className="flex justify-between mt-2">
              <Button onClick={handleClear}>Clear</Button>
              <Button
                onClick={handlePrint}
                icon={<PrintIcon size={16} color="#fff" />}
              >
                Print
              </Button>
            </div>
          </Sidebar>
        </div>
      </div>
    </>
  );
}

export default App;

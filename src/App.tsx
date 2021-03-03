import React from "react";

import IconButton from "./components/IconButton";
import PrintIcon from "./icons/PrintIcon";

import { ipcRenderer } from "electron";

import "./index.css";
import PrintSheet from "./components/PrintSheet";
import SheetTitle from "./components/SheetTitle";
import AddChord from "./components/AddChord";
import ChordModal from "./components/ChordModal";

function App() {
  const [chords, setChords] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [chordDialogOpen, setChordDialogOpen] = React.useState(false);

  function handlePrint() {
    window.print();
  }

  React.useEffect(() => {
    let mounted = true;
    async function invokeAsync() {
      const result = await ipcRenderer.invoke("read-config");
      if (mounted) setChords(result);
    }

    invokeAsync();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <PrintSheet chords={selected} />
      <ChordModal
        open={chordDialogOpen}
        onClose={() => setChordDialogOpen(false)}
        onAdd={() => {}}
        chords={chords}
      />
      <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden no-print">
        <div className="flex flex-row w-full h-full">
          <div className="w-full overflow-auto overflow-x-hidden">
            <div className="flex justify-center pt-4">
              <SheetTitle />
            </div>
            <div className="flex justify-between pt-5 pl-5 pr-10 no-print">
              <h2 className="text-2xl">Chords</h2>
              <IconButton label="print" onClick={handlePrint}>
                <PrintIcon />
              </IconButton>
            </div>

            <div className="grid grid-flow-row grid-cols-6 gap-4 p-5 debug">
              {/* {chordsComponents} */}
              <AddChord onClick={() => setChordDialogOpen(true)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

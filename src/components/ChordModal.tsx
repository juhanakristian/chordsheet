import React from "react";
import Button from "./Button";
import Chord, { ChordData } from "./Chord";

import { Modal, ModalActions, ModalContent } from "./Modal";
import Search from "./Search";

interface Props {
  onAdd: (chord: ChordData[]) => void;
  onClose: () => void;
  open: boolean;
  chords: ChordData[];
}

export function getChordIdentifier(data: ChordData) {
  const t = data.chord.join("").replace(/,/g, "");
  return `${data.name}-${t}`;
}

export default function ChordModal({ onAdd, onClose, open, chords }: Props) {
  const [searchString, setSearchString] = React.useState("");
  const [selected, setSelected] = React.useState<ChordData[]>([]);

  React.useEffect(() => {
    if (!open) setSelected([]);
  }, [open]);

  function isSelected(chord: ChordData) {
    return selected.find((c: ChordData) => c.name === chord.name) !== undefined;
  }

  function handleChordClick(data: ChordData) {
    if (isSelected(data)) {
      const updated = selected.filter((c) => c.name !== data.name);
      setSelected(updated);
      return;
    }

    setSelected([...selected, data]);
  }

  const filteredChords = chords.filter((data: ChordData) => {
    if (!searchString || searchString.length == 0) return true;

    const pattern = new RegExp(`^${searchString}`);
    if (pattern.test(data.name)) return true;

    return false;
  });

  const chordsComponents = open
    ? filteredChords.map((data: ChordData) => {
        const id = getChordIdentifier(data);

        return (
          <div key={id} className="col-span-4 sm:col-span-2 lg:col-span-1">
            <Chord
              identifier={id}
              data={data}
              onClick={(data) => handleChordClick(data)}
              highlight={isSelected(data)}
            />
          </div>
        );
      })
    : null;

  return (
    <Modal title="Choose chords" open={open} onClose={onClose}>
      <ModalContent>
        <Search
          value={searchString}
          onChange={(value: string) => {
            setSearchString(value);
          }}
        />
        <div className="grid grid-flow-row grid-cols-6 gap-4 mt-4 debug">
          {chordsComponents}
        </div>
      </ModalContent>
      <ModalActions>
        <div className="flex items-center">
          <div>{selected.map((c) => c.name).join(", ")}</div>
          <Button onClick={() => onAdd(selected)}>Add</Button>
        </div>
      </ModalActions>
    </Modal>
  );
}

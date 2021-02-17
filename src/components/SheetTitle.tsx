import React from "react";

export default function SheetTitle() {
  const [title, setTitle] = React.useState("Set sheet title..");
  const edited = React.useRef(false);

  return (
    <input
      className="text-2xl text-center border-none outline-none"
      name="title"
      value={title}
      onChange={(e) => {
        edited.current = true;
        setTitle(e.currentTarget.value);
      }}
      onFocus={() => {
        if (!edited.current) {
          setTitle("");
        }
      }}
    ></input>
  );
}

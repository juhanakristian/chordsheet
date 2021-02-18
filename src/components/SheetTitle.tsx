import React from "react";

const defaultText = "Set sheet title..✍️";

export default function SheetTitle() {
  const [title, setTitle] = React.useState(defaultText);
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
      onBlur={() => {
        if (!title || title.length === 0) setTitle(defaultText);
      }}
      onFocus={() => {
        if (!edited.current) {
          setTitle("");
        }
      }}
    ></input>
  );
}

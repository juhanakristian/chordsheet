import React from "react";

const defaultText = "Set sheet title..✍️";

export default function SheetTitle() {
  const [title, setTitle] = React.useState("");
  const edited = React.useRef(false);

  return (
    <input
      className="text-3xl text-center border-none outline-none"
      name="title"
      value={title}
      placeholder={defaultText}
      onChange={(e) => {
        // edited.current = true;
        setTitle(e.currentTarget.value);
      }}
      // onBlur={() => {
      //   if (!title || title.length === 0) setTitle(defaultText);
      // }}
      // onFocus={() => {
      //   if (!edited.current) {
      //     setTitle("");
      //   }
      // }}
    ></input>
  );
}

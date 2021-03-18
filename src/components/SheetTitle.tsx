import React from "react";

const defaultText = "Set sheet title..✍️";

interface Props {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SheetTitle({ title, onChange }: Props) {
  return (
    <>
      <input
        className="text-3xl text-center border-none outline-none no-print"
        name="title"
        value={title}
        placeholder={defaultText}
        onChange={onChange}
      ></input>
      <span className="text-3xl text-center border-none outline-none print">
        {title}
      </span>
    </>
  );
}

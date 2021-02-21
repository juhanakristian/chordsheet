import React, { ReactNode } from "react";

interface IconButtonProps {
  label?: string;
  children: ReactNode;
  onClick: () => void;
}

export default function IconButton(props: IconButtonProps) {
  function handleClick() {
    props.onClick();
  }

  return (
    <button
      className="flex items-center justify-center w-10 h-10 p-2 rounded-full focus:outline-none hover:bg-gray-100"
      onClick={handleClick}
      aria-label={props.label}
    >
      {props.children}
    </button>
  );
}

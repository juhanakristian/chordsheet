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
      className="focus:outline-none"
      onClick={handleClick}
      aria-label={props.label}
    >
      {props.children}
    </button>
  );
}

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
    <div>
      <button
        className="flex items-center justify-center w-6 h-6 rounded-full focus:outline-none"
        onClick={handleClick}
        aria-label={props.label}
      >
        {props.children}
      </button>
    </div>
  );
}

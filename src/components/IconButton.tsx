import React, { ReactNode } from "react";

interface IconButtonProps {
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
      >
        {props.children}
      </button>
    </div>
  );
}

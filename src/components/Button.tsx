import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  color?: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  let classes =
    "flex items-center justify-center p-2 pl-6 m-2 pr-6 text-black rounder-sm active:bg-grey-500 focus:outline-none";
  if (props.icon) {
    classes =
      "flex items-center justify-begin p-2 pl-6 m-2 pr-6 text-black rounder-sm borderactive:bg-grey-500 focus:outline-none";
  }

  return (
    <button
      className="flex items-center justify-center p-2 pl-6 pr-6 m-2 text-white bg-blue-400 border-blue-500 rounded-md shadow-sm focus:border-2 active:bg-blue-500 focus:outline-none"
      onClick={props.onClick}
    >
      {props.icon && <div className="mr-2">{props.icon}</div>}
      {props.children}
    </button>
  );
}

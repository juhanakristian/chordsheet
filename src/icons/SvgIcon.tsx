import React, { ReactChild, ReactChildren } from "react";

interface SvgIconProps {
  size: number;
  color?: string;
  children?: ReactChild | ReactChildren;
}

export default function SvgIcon(props: SvgIconProps) {
  const color = props.color ? props.color : "#000";
  return (<div
    className="flex flex-col justify-center align-middle"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill={color}
    >
      {props.children}
    </svg>
  </div>);
}

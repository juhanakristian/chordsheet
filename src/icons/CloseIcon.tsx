import React, { ReactChild, ReactChildren } from "react";

interface IconProps {
  color?: string;
  children?: ReactChild | ReactChildren;
}

export default function CloseIcon(props: IconProps) {
  return <span className="text-xl">✕</span>;
}

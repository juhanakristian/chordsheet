import React, { ReactChild, ReactChildren } from "react";

import SvgIcon from "./SvgIcon";

interface IconProps {
  size: number;
  color?: string;
  children?: ReactChild | ReactChildren;
}

export default function AddIcon() {
  return <span className="text-xl">➕</span>;
}

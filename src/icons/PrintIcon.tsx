import React, { ReactChild, ReactChildren } from "react";

import SvgIcon from "./SvgIcon";

interface IconProps {
  size?: number;
  color?: string;
  children?: ReactChild | ReactChildren;
}

export default function PrintIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16 18h-8v-1h8v1zm-2 1h-6v1h6v-1zm10-14v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 10h-12v7h12v-7zm4-8h-20v9h2v-3h16v3h2v-9zm-1.5 1c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z" />
    </SvgIcon>
  );
}

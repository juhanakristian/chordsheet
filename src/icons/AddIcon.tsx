import React, { ReactChild, ReactChildren } from "react";

import SvgIcon from "./SvgIcon";

interface IconProps {
  size: number;
  color?: string;
  children?: ReactChild | ReactChildren;
}

export default function AddIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z"
      />
    </SvgIcon>
  );
}

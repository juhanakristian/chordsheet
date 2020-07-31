import React, { ReactChild, ReactChildren } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  children: ReactChild | ReactChildren;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <div>
      {props.open && (
        <div
          className="absolute w-full h-full "
          style={{ left: 0, top: 0 }}
          onClick={() => props.onClose()}
        >
        </div>
      )}
      <div
        className="absolute h-full m-0 duration-200 bg-blue-900 transition-right"
        style={{
          maxWidth: "100%",
          width: 300,
          right: props.open ? 0 : -300,
        }}
      >
        <div className="p-10">
          <button onClick={() => props.onClose()}>X</button>
          {props.children}
        </div>
      </div>
    </div>
  );
}

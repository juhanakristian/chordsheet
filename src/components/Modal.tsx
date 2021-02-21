import React from "react";
import CloseIcon from "../icons/CloseIcon";
import IconButton from "./IconButton";

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  children: React.ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return <div className="p-4">{children}</div>;
}

export function Modal({ title, children, open, onClose }: Props) {
  return (
    <div
      className="fixed z-10 flex w-full h-full bg-black bg-opacity-50 "
      style={{ display: open ? "block" : "none" }}
      onClick={onClose}
    >
      <div
        className="fixed z-20 bg-white rounded-md shadow-lg top-20 left-20 right-20"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
          <h2 id="dialog-title" className="text-2xl">
            {title}
          </h2>
          <IconButton label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}

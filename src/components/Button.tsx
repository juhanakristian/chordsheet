import React, { ReactNode } from "react";

import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  color?: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <div className="p-4">
      <button
        className="flex items-center justify-center h-8 p-2 pl-6 pr-6 text-lg text-white bg-blue-400 border-blue-500 rounded-md w-min-12 active:bg-blue-500 focus:outline-none"
        onClick={props.onClick}
      >
        <motion.div className="capitalize" whileTap={{ scale: 1.1 }}>
          {props.icon && <div className="mr-2">{props.icon}</div>}
          {props.children}
        </motion.div>
      </button>
    </div>
  );
}

import React, {
  ReactNode,
} from "react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  console.log(props.icon);
  let classes =
    "flex items-center justify-center p-2 pl-6 pr-6 m-2 text-white bg-red-600 rounded-full active:bg-red-800 focus:outline-none";
  if (props.icon) {
    classes =
      "flex items-center justify-begin p-2 pl-6 pr-6 m-2 text-white bg-red-600 rounded-full active:bg-red-800 focus:outline-none";
  }

  return (
    <div>
      <button
        className={classes}
        onClick={props.onClick}
      >
        {props.icon && (
          <div className="mr-2">
            {props.icon}
          </div>
        )}
        {props.children}
      </button>
    </div>
  );
}

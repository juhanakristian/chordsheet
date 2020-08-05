import React, {
  useState,
  useEffect,
  useRef,
  ReactChild,
  ReactChildren,
} from "react";

interface IconButtonProps {
  children: ReactChild | ReactChildren;
  onClick: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const buttonRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(buttonRef.current.width);
  }, [buttonRef]);

  function handleClick() {
    props.onClick();
  }

  return (
    <div>
      <button
        ref={buttonRef}
        className="flex items-center justify-center w-6 h-6 rounded-full focus:outline-none"
        onClick={handleClick}
      >
        {props.children}
      </button>
    </div>
  );
}

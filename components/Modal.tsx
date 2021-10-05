import { useState } from "react";

function Modal({ open = false, children, onBackgroundClick }) {
  return (
    <div hidden={!open} className="fixed top-0 left-0 w-screen h-screen">
      <div className="w-full h-full opacity-50 z-10 absolute top-0 left-0 bg-black"></div>
      <div
        className="absolute z-20 w-full h-full flex items-start py-4 justify-center"
        onClick={onBackgroundClick}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full mx-3 md:w-1/3 bg-white p-4 rounded-md"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
export function useModal() {
  const [open, setOpen] = useState(false);
  return {
    Modal: function M({ children }) {
      return (
        <Modal
          {...{
            children,
            open,
            onBackgroundClick() {
              setOpen(false);
            },
          }}
        />
      );
    },
    open,
    actions: {
      open() {
        setOpen(true);
      },
      close() {
        setOpen(false);
      },
    },
  };
}

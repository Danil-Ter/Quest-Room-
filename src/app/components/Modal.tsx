import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 p-10 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-extrabold text-white">Залишити заявку</h1>
          <button className="text-white" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

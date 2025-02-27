"use client";

import React from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

interface ModalProps {
  isOpen: boolean;
  title?: string;
  closeModal: () => void;
  children?: any;
  hasDefaultCloseButton?: boolean;
}

export const AppModal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl mx-auto mt-9 relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      {props.hasDefaultCloseButton !== false && (
        <button
          onClick={props.closeModal}
          className="absolute top-4 right-6 text-3xl font-semibold text-gray-500 hover:text-gray-900"
        >
          &times;
        </button>
      )}
      {props.title && (
        <div className="mb-3 border-b-2 border-gray-500">
          <h2 className="text-2xl font-semibold mb-4">{props.title}</h2>
        </div>
      )}
      <div>{props.children}</div>
    </Modal>
  );
};

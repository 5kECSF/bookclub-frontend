"use client";

import { Modal } from "antd";
import { useEffect, useState } from "react";
import { GenericButton } from "../ui/genericButton";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  dataTest?: string;
  name?: string;
}

export const AlertDeleteModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  dataTest,
  name,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Are you sure you want to delete ${name}?`}
      open={isOpen}
      onCancel={onClose}
      footer={[]}
    >
      <p>item with name {name} will be deleted.</p>
      <div>This action is cant be undone</div>
      <div
        data-test={dataTest}
        className="flex w-full items-center justify-end space-x-2 pt-6"
      >
        <GenericButton
          data-test="close-btn"
          disabled={loading}
          intent="outline"
          onClick={onClose}
        >
          Cancel
        </GenericButton>
        <GenericButton
          data-test="delete-btn"
          disabled={loading}
          className="bg-red-700 text-white"
          onClick={onConfirm}
        >
          Continue
        </GenericButton>
      </div>
    </Modal>
  );
};

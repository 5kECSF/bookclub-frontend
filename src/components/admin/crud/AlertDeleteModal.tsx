"use client";

import { Modal } from "antd";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";

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
        <Button
          data-test="close-btn"
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          data-test="delete-btn"
          disabled={loading}
          className="bg-red-700 text-white"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

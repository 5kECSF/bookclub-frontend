"use client";

import { AddEditModal } from "@/app/admin/user/add-edit-modal";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui_custom/modal";
import { MTD } from "@/lib/constants";
import { KY } from "@/lib/constants/routes";
import { useMakeReqState } from "@/lib/state/hooks/useMutation";
import { ACCOUNT_STATUS, IUser } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
interface ModalContent {
  title: string;
  message: string;
  successToast: string;
}
const actions: Partial<Record<ACCOUNT_STATUS, ModalContent>> = {
  ACTIVE: {
    title: "UnBlock",
    message: "This User will be unblocked and can Access the System Again",
    successToast: "Unblocked",
  },
  UN_APPROVED: {
    title: "Approve",
    message: "This User will be Approved and can request books",
    successToast: "Approved",
  },
  BLOCKED: {
    title: "Block",
    message: "This User will be blocked and can not login to the system!",
    successToast: "Blocked",
  },
};
export const MiniAction = ({ row }: { row: IUser }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState(ACCOUNT_STATUS.REGISTERED);
  const { makeReq, loading } = useMakeReqState();

  const queryClient = useQueryClient();

  const onAction = async () => {
    const resp = await makeReq(
      `${KY.user}/${row._id}`,
      { accountStatus: actionStatus },
      MTD.PATCH,
    );
    if (!resp.ok) {

      toast.error(resp.message);
      return;
    }
    //change the name to idx
    toast.success(
      `Succesfully ${actions[actionStatus]?.successToast} the user: ${row?.firstName} ${row?.lastName}`,
    );
    await queryClient.invalidateQueries({ queryKey: [KY.user] });
    setActionStatus(ACCOUNT_STATUS.REGISTERED);
  };
  return (
    <div>
      {/* ----------   edit Delete buttons*/}
      <div className="flex gap-2">
        <Button
          onClick={() => setEditOpen(true)}
          className="text-white [background:linear-gradient(161.68deg,_#3498db,_#2980b9)] "
        >
          Edit
        </Button>
        {/* =============== Approve The USER ========= */}
        {row.accountStatus == ACCOUNT_STATUS.UN_APPROVED && (
          <Button
            variant={"outline"}
            data-type="delete-knowledge-btn"
            onClick={() => {
              setActionStatus(ACCOUNT_STATUS.UN_APPROVED);
            }}
            className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
          >
            Approve
          </Button>
        )}
        {/* ==================   Block The User ============= */}
        {(row.accountStatus == ACCOUNT_STATUS.ACTIVE ||
          row.accountStatus == ACCOUNT_STATUS.UN_APPROVED ||
          !row.accountStatus) && (
          <Button
            variant={"outline"}
            onClick={() => {
              setActionStatus(ACCOUNT_STATUS.BLOCKED);
            }}
            className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
          >
            Block
          </Button>
        )}
        {/* ==================   UN Blocke the user The User ============= */}
        {(row.accountStatus == ACCOUNT_STATUS.BLOCKED ||
          !row.accountStatus) && (
          <Button
            variant={"outline"}
            onClick={() => {
              setActionStatus(ACCOUNT_STATUS.ACTIVE);
            }}
            className=" text-white [background:linear-gradient(161.68deg,_#fa7c54,_#ec2c5a)]"
          >
            UN Block
          </Button>
        )}
      </div>

      <AddEditModal
        isOpen={editOpen}
        onClose={setEditOpen}
        isUpdate={true}
        user={row}
      />
      {/* =========  Action Modal */}
      <Modal
        title={`Are you sure you want to ${actions[actionStatus]?.title} the user ${row?.firstName} ${row?.lastName}?`}
        isOpen={actionStatus != ACCOUNT_STATUS.REGISTERED}
        onClose={() => {
          setActionStatus(ACCOUNT_STATUS.REGISTERED);
        }}
      >
        <p>{actions[actionStatus]?.message}</p>

        <div
          data-test={"delete-knowledge-btn"}
          className="flex w-full items-center justify-end space-x-2 pt-6"
        >
          <Button
            data-test="close-btn"
            disabled={loading}
            variant="outline"
            onClick={() => {
              setActionStatus(ACCOUNT_STATUS.REGISTERED);
            }}
          >
            Cancel
          </Button>
          <Button
            data-test="delete-btn"
            disabled={loading}
            className="bg-red text-white"
            onClick={onAction}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  );
};

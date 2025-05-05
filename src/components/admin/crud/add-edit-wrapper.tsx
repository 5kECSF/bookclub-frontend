import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export const AddEditWrapper = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-inherit flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">{title}</h3>
        </div>

        {children}
      </div>
    </div>
  );
};

interface IModalProps {
  isOpen: boolean;
  isUpdate: boolean;
  title: string;
  onClose: (e?: any) => void;
  children: ReactNode;
}
export const AddEditModalWrapper = ({
  children,
  title,
  isUpdate,
  isOpen,
  onClose,
}: IModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mt-8 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? `Update ${title}` : `Create ${title}`}
          </DialogTitle>
        </DialogHeader>
        <div className="w-inherit flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {title}
              </h3>
            </div>

            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

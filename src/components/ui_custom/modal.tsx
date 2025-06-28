import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
interface IModalProps {
  isOpen: boolean;
  title: string;
  footer?: boolean;
  onClose: (e?: any) => void;
  children: ReactNode;
}
export const Modal = ({
  children,
  title,
  footer = false,
  isOpen,
  onClose,
}: IModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mt-8 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}

        {footer && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

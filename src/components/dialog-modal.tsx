"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmCancelDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  choice: string;
}

const ConfirmCancelDialog = ({
  open,
  onClose,
  onConfirm,
  choice,
}: ConfirmCancelDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{choice} Your Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onConfirm}>Yes</Button>
          <Button variant="outline" onClick={onClose}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCancelDialog;

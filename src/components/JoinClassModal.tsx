import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCODE_LINK } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { ClassInfo } from "@/types";
import { ChevronLeftIcon, CopyIcon } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

function JoinClassModal({
  isOpen,
  setIsOpen,
  classInfo,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  classInfo: ClassInfo;
}) {
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="w-[500px] bg-secondary"
      >
        <DialogHeader>
          <p
            className="group/goback flex w-[max-content] cursor-pointer items-center gap-2 text-sm font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeftIcon className="size-4" />
            <span className="group-hover/goback:underline">
              Back to Class List
            </span>
          </p>
          <DialogTitle className="text-lg font-bold">
            Join {classInfo.classroom} {classInfo.subject}
          </DialogTitle>
          <div className="flex gap-4 pt-2 text-lg font-bold">
            <div className="flex items-center gap-2">
              <p>ID: {classInfo.id}</p>
              <CopyIcon
                className="size-7 cursor-pointer rounded-sm bg-primary p-1.5 text-white hover:bg-primary/90"
                onClick={() =>
                  navigator.clipboard.writeText(classInfo.id).then(() => {
                    toast({
                      description: "ID has been copied",
                    });
                  })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <a href={QRCODE_LINK} target="_blank" rel="noopener noreferrer">
                Link
              </a>
              <CopyIcon
                className="size-7 cursor-pointer rounded-sm bg-primary p-1.5 text-white hover:bg-primary/90"
                onClick={() =>
                  navigator.clipboard.writeText(QRCODE_LINK).then(() => {
                    toast({
                      description: "Link has been copied",
                    });
                  })
                }
              />
            </div>
          </div>
        </DialogHeader>
        <div className="flex justify-center">
          <div className="rounded-sm bg-white p-4">
            <QRCodeCanvas value={QRCODE_LINK} size={360} />
          </div>
        </div>
        <DialogFooter className="">
          <p className="w-full text-center">Version 1.1.7</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JoinClassModal;

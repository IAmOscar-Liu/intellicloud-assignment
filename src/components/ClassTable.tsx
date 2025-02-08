import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllClasses } from "@/store/classSlice";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  Loader2Icon,
  PackageOpenIcon,
  SquareMousePointerIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ClassDetailModal from "./ClassDetailModal";
import JoinClassModal from "./JoinClassModal";
import { Button } from "./ui/button";

function ClassTable({ className }: { className?: string }) {
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(
    undefined,
  );
  const { isLoading, classlist } = useAppSelector((state) => state.class);
  const dispatch = useAppDispatch();

  const selectedClass = useMemo(() => {
    if (!selectedClassId || !classlist) return undefined;
    return classlist.find((c) => c.id === selectedClassId);
  }, [selectedClassId]);

  useEffect(() => {
    dispatch(getAllClasses());
  }, []);

  return (
    <>
      <div className={cn("", className)}>
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center gap-3">
            <Loader2Icon className="size-8 animate-spin text-primary" />
            <p className="text-xl">Loading...</p>
          </div>
        ) : classlist.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-3">
            <PackageOpenIcon className="size-12 text-primary" />
            <p className="text-xl">No data!</p>
          </div>
        ) : (
          <Table>
            <TableCaption>A list of your classes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Classroom</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>students</TableHead>
                <TableHead className="flex items-center justify-end text-foreground">
                  <span className="me-2">1 - 10</span>
                  <ChevronLeftIcon className="size-6 p-1 text-border" />
                  <ChevronRightIcon className="size-6 cursor-pointer p-1" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classlist.map((classInfo, index) => (
                <TableRow className="even:bg-secondary" key={classInfo.id}>
                  <TableCell className="font-medium">
                    {classInfo.classroom}
                  </TableCell>
                  <TableCell>{classInfo.subject}</TableCell>
                  <TableCell>{classInfo.instructor}</TableCell>
                  <TableCell>{classInfo.students}</TableCell>
                  <TableCell className="w-[200px] text-right">
                    <Button
                      size="sm"
                      disabled={index > 2}
                      onClick={() => {
                        setSelectedClassId(classInfo.id);
                        setIsJoinDialogOpen(true);
                      }}
                    >
                      <SquareMousePointerIcon />
                      <span>Join</span>
                    </Button>
                    <Button
                      className="ms-2"
                      size="sm"
                      disabled={index > 2}
                      onClick={() => {
                        setSelectedClassId(classInfo.id);
                        setIsDetailDialogOpen(true);
                      }}
                    >
                      <EyeIcon />
                      <span>View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {selectedClass && (
        <JoinClassModal
          isOpen={isJoinDialogOpen}
          setIsOpen={setIsJoinDialogOpen}
          classInfo={selectedClass}
        />
      )}
      {selectedClass && (
        <ClassDetailModal
          isOpen={isDetailDialogOpen}
          setIsOpen={setIsDetailDialogOpen}
          classInfo={selectedClass}
        />
      )}
    </>
  );
}

export default ClassTable;

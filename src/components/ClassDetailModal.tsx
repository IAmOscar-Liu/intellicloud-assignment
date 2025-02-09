import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  filterGuests,
  getStudentMap,
  processStudentlist,
} from "@/lib/processData";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { getClassById } from "@/store/classSlice";
import { ClassInfo, GeneralStudentInfo, GroupInfo } from "@/types";
import { Loader2Icon, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ClassDetailDropdownMenu from "./ClassDetailDropdownMenu";
import StudentCard from "./StudentCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const getTabClass = (active: boolean) =>
  cn(
    "w-[120px] rounded-t-md pointer-events-none bg-white text-primary relative overflow-hidden before:hidden before:absolute before:-bottom-1 before:left-0 before:right-0 before:content-[''] before:h-1 before:shadow-[0_-2px_8px_rgba(0,0,0,0.2)]",
    {
      "pointer-events-auto bg-input text-foreground before:block": !active,
    },
  );

function ClassDetailModal({
  isOpen,
  setIsOpen,
  classInfo,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  classInfo: ClassInfo;
}) {
  const [activeTab, setActiveTab] = useState<"student list" | "group">(
    "student list",
  );
  const dispatch = useAppDispatch();
  const classDetailInfo = useAppSelector((state) => {
    if (state.class.cachedClasses[classInfo.id] !== undefined)
      return state.class.cachedClasses[classInfo.id];
    return undefined;
  });
  // const studentlist = processStudentlist(mockStudentlist);
  // const grouplist = mockGrouplist;

  const { studentlist, grouplist } = useMemo(() => {
    if (!classDetailInfo) return {};
    return {
      studentlist: processStudentlist(classDetailInfo.students),
      grouplist: classDetailInfo.groups,
    };
  }, [classDetailInfo]);

  useEffect(() => {
    if (!isOpen) setActiveTab("student list");
  }, [isOpen]);

  useEffect(() => {
    dispatch(getClassById(classInfo.id));
  }, [classInfo]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby={undefined}
        className="min-w-[700px] bg-secondary"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {classInfo.classroom} {classInfo.subject}{" "}
            <UserRound className="size-5" />
            <span className="self-start text-lg">
              {classInfo.students}
              <span className="px-0.5">/</span>30
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="-mx-6 -mb-6 h-[510px] pt-10">
          <div className="relative h-full rounded-md bg-white py-6 shadow-[0_-2px_8px_rgba(0,0,0,0.2)]">
            <div className="absolute bottom-[calc(100%)] left-8 right-6 flex h-9 justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("student list")}
                  className={getTabClass(activeTab === "student list")}
                >
                  Student List
                </button>
                <button
                  onClick={() => setActiveTab("group")}
                  className={getTabClass(activeTab === "group")}
                >
                  Group
                </button>
              </div>
              <ClassDetailDropdownMenu menuTriggerClass="-translate-y-1 hover:bg-border" />
            </div>
            {!studentlist || !grouplist ? (
              <div className="flex h-full items-center justify-center gap-3">
                <Loader2Icon className="size-8 animate-spin text-primary" />
                <p className="text-xl">Loading...</p>
              </div>
            ) : activeTab === "student list" ? (
              <Studentlist classId={classInfo.id} studentlist={studentlist} />
            ) : (
              <Grouplist
                classId={classInfo.id}
                studentlist={studentlist}
                grouplist={grouplist}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Studentlist({
  classId,
  studentlist,
}: {
  classId: string;
  studentlist: GeneralStudentInfo[];
}) {
  return (
    <div className="grid h-full grid-cols-5 gap-3 overflow-y-auto px-8">
      {studentlist.map((student) => (
        <StudentCard
          key={student.serialNo}
          classId={classId}
          student={student}
        />
      ))}
    </div>
  );
}

function Grouplist({
  classId,
  grouplist,
  studentlist,
}: {
  classId: string;
  grouplist: GroupInfo[];
  studentlist: GeneralStudentInfo[];
}) {
  const studentMap = useMemo(() => {
    return getStudentMap(filterGuests(studentlist));
  }, [studentlist]);

  return (
    <div className="h-full overflow-y-auto px-8">
      <Accordion type="multiple" className="w-full">
        {grouplist.map((group) => (
          <AccordionItem key={group.id} value={group.name}>
            <AccordionTrigger>{group.name}</AccordionTrigger>
            <AccordionContent className="grid grid-cols-5 gap-3">
              {group.members
                .map((serialNo) => studentMap.get(serialNo))
                .filter((student) => student !== undefined)
                .map((student) => (
                  <StudentCard
                    key={student.id}
                    classId={classId}
                    student={{ ...student, guest: false }}
                  />
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ClassDetailModal;

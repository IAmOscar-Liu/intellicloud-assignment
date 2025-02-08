import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store";
import {
  decrementStudentPoint,
  incrementStudentPoint,
} from "@/store/classSlice";
import { GeneralStudentInfo } from "@/types";

function StudentCard({
  classId,
  student,
}: {
  classId: string;
  student: GeneralStudentInfo;
}) {
  const dispatch = useAppDispatch();

  return (
    <div
      key={student.serialNo}
      className={cn("rounded-md border-[1.5px] border-primary", {
        "border-border": student.guest,
      })}
    >
      <div
        className={cn("bg-primary py-1 text-center text-background", {
          "bg-border": student.guest,
        })}
      >
        {student.serialNo}
      </div>
      <div
        className={cn(
          "border-b-[1.5px] border-b-primary py-4 text-center text-2xl",
          {
            "border-b-border text-border": student.guest,
          },
        )}
      >
        {!student.guest ? student.name : "Guest"}
      </div>
      <div className="flex items-center justify-between px-1.5 py-1">
        <button
          className={cn(
            "rounded-sm bg-destructive px-2 text-sm text-background",
            {
              "pointer-events-none bg-border":
                student.guest || student.point <= 0,
            },
          )}
          onClick={() => {
            if (!student.guest && student.point > 0)
              dispatch(
                decrementStudentPoint({ classId, studentId: student.id }),
              );
          }}
        >
          - 1
        </button>
        <span className={cn({ "text-border": student.guest })}>
          {!student.guest ? student.point : 0}
        </span>
        <button
          className={cn(
            "rounded-sm bg-green-500 px-2 text-sm text-background",
            {
              "pointer-events-none bg-border": student.guest,
            },
          )}
          onClick={() => {
            if (!student.guest)
              dispatch(
                incrementStudentPoint({ classId, studentId: student.id }),
              );
          }}
        >
          + 1
        </button>
      </div>
    </div>
  );
}

export default StudentCard;

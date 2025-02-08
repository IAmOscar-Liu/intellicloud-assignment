import { MAX_STUDENTS } from "@/constants";
import { GeneralStudentInfo, StudentInfo } from "@/types";

export function filterGuests(students: GeneralStudentInfo[]) {
  return students.filter((student) => !student.guest);
}

export function getStudentMap(students: StudentInfo[]) {
  const studentMap = new Map<number, StudentInfo>();
  for (let student of students) {
    studentMap.set(student.serialNo, student);
  }
  return studentMap;
}

export function processStudentlist(students: StudentInfo[], max?: number) {
  const studentMap = getStudentMap(students);

  const results: GeneralStudentInfo[] = [];
  for (let i = 1; i <= (max ?? MAX_STUDENTS); i++) {
    const student = studentMap.get(i);
    if (student) results.push({ ...student, guest: false });
    else results.push({ serialNo: i, guest: true });
  }
  return results;
}

export interface ClassInfo {
  id: string;
  classroom: string;
  subject: string;
  instructor: string;
  students: number;
}

export interface StudentInfo {
  id: string;
  serialNo: number;
  name: string;
  point: number;
  groupId?: string;
}

export type GeneralStudentInfo =
  | (StudentInfo & { guest: false })
  | {
      serialNo: number;
      guest: true;
    };

export interface GroupInfo {
  id: string;
  name: string;
  members: number[];
}

export interface ClassDetailInfo {
  students: StudentInfo[];
  groups: GroupInfo[];
}

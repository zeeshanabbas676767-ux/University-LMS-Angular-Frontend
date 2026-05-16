export interface Attendance {
  id: number;

  studentId: number;
  lectureId: number;

  isPresent: boolean;
  date: string;
}
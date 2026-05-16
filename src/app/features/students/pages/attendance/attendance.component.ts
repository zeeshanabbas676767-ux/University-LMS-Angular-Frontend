import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { AuthService } from '../../../../core/services/auth.service';
import { LectureService } from '../../../../core/services/lecture.service';

@Component({
  selector: 'student-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
})
export class StudentAttendanceComponent implements OnInit {
  attendance: any[] = [];
  
  totalLectures = 0;
  attended = 0;
  percentage = 0;

  constructor(
    private attendanceService: AttendanceService,
      private lectureService: LectureService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const student = this.authService.getStoredUser();
    if (!student) return;

      this.lectureService.getByStudent(student.id).subscribe(lectures => {
      this.totalLectures = lectures.length;  // ← real total (e.g. 4)
      this.recalculate();
    });

    this.attendanceService.getByStudent(student.id).subscribe(data => {
      this.attendance   = data;
      this.attended     = data.filter(a => a.isPresent).length;
     this.recalculate();
    });
  }
   recalculate() {
    this.percentage = this.totalLectures > 0
      ? Math.round((this.attended / this.totalLectures) * 100)
      : 0;
  }
}
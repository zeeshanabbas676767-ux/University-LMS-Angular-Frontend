import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'teachers-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
})
export class TeachersAttendanceComponent implements OnInit {
  lectures: any[] = [];
  selectedLecture: any = null;
  lectureDetail: any[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const teacher = this.authService.getStoredUser();
    if (!teacher) return;

    this.attendanceService.getByTeacher(teacher.id).subscribe(data => {
      this.lectures = data;
    });
  }

  // ← Click a lecture row to see per-student detail
  viewDetail(lecture: any) {
    this.selectedLecture = lecture;
    this.attendanceService.getByLecture(lecture.lectureId).subscribe(data => {
      this.lectureDetail = data;
    });
  }

  back() {
    this.selectedLecture = null;
    this.lectureDetail = [];
  }
}
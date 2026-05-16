import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LectureService } from '../../../../core/services/lecture.service';
import { AttendanceService } from '../../../../core/services/attendance.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Lecture } from '../../../../shared/models/lecture.model';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../../shared/models/courses.model';
import { EnrollmentService } from '../../../../core/services/enrollment.service';

@Component({
  selector: 'student-lecture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lecture.component.html',
})
export class StudentLectureComponent implements OnInit {
  allLectures: Lecture[] = []; 
  lectures: Lecture[] = [];
   enrolledCourses: Course[] = [];                      // ← for dropdown
  selectedCourseId: number | string = ''; 
  studentId = 0;
  markedLectureIds: Set<number> = new Set();
  selectedLecture: Lecture | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private lectureService: LectureService,
    private attendanceService: AttendanceService,
    private authService: AuthService,
     private enrollmentService: EnrollmentService,
    private sanitizer: DomSanitizer        // ← needed for YouTube embed
  ) {}

  ngOnInit() {
    const student = this.authService.getStoredUser();
    if (!student) return;
    this.studentId = student.id;

    this.lectureService.getByStudent(student.id).subscribe(data => {
  //     console.log('Attendance data:', data);  // ← check exact field names
  // data.forEach((a: any) => this.markedLectureIds.add(a.lectureId));

       this.allLectures = data;
      this.lectures = data;    
    });

     // Load enrolled courses for dropdown
    this.enrollmentService.getByStudent(student.id).subscribe(data => {
      this.enrolledCourses = data
        .map((e: any) => e.course)
        .filter((c: any) => c != null);               // ← extract course objects
    });

    // Load already-watched lectures
    this.attendanceService.getByStudent(student.id).subscribe(data => {
      data.forEach((a: any) => this.markedLectureIds.add(a.lectureId));
    });
  }

    // ← Called when dropdown changes
  onCourseChange() {
    if (!this.selectedCourseId || this.selectedCourseId === '') {
      this.lectures = this.allLectures;               // ← show all if "All Courses" selected
    } else {
      this.lectures = this.allLectures.filter(
        l => l.courseId === Number(this.selectedCourseId)
      );
    }
    this.closeVideo();                                 // ← close video when switching course
  }
  

  // ← Convert any YouTube URL to embed URL
  getEmbedUrl(url: string): SafeResourceUrl {
    let videoId = '';

    if (url.includes('youtu.be/')) {
      // https://youtu.be/VIDEO_ID
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      // https://www.youtube.com/watch?v=VIDEO_ID
      const params = new URLSearchParams(url.split('?')[1]);
      videoId = params.get('v') || '';
    } else if (url.includes('youtube.com/embed/')) {
      // Already an embed URL
      videoId = url.split('embed/')[1].split('?')[0];
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  watchLecture(lecture: Lecture) {
    this.selectedLecture = lecture;
    this.safeVideoUrl = this.getEmbedUrl(lecture.videoUrl!);

    // Mark attendance automatically when video opens
    if (!this.markedLectureIds.has(lecture.id)) {
      this.attendanceService.markAttendance(this.studentId, lecture.id).subscribe({
        next: () => {
       this.markedLectureIds = new Set([...this.markedLectureIds, lecture.id]);
      },
        error: (err) => console.error('Attendance error:', err)
      });
    }
  }

  closeVideo() {
    this.selectedLecture = null;
    this.safeVideoUrl = null;
  }

  isWatched(lectureId: number): boolean {
    return this.markedLectureIds.has(lectureId);
  }
}
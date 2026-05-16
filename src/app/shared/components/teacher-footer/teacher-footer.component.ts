import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'teacher-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './teacher-footer.component.html',
})
export class TeacherFooterComponent {
   today: Date = new Date();
}

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'student-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './student-footer.component.html',
})
export class StudentFooterComponent {
   today: Date = new Date();
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeacherNavbarComponent } from '../../shared/components/teacher-navbar/teacher-navbar.component';
import { TeacherFooterComponent } from '../../shared/components/teacher-footer/teacher-footer.component';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [RouterOutlet, TeacherNavbarComponent, TeacherFooterComponent],
  templateUrl: './teachers-layout.component.html'
})
export class TeacherLayoutComponent {}
      
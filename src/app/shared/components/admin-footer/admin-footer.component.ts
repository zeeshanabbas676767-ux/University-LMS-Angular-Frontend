import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'admin-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-footer.component.html',
})
export class AdminFooterComponent {
   today: Date = new Date();
}

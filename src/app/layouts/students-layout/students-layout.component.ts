import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentNavbarComponent } from '../../shared/components/student-navbar/student-navbar.component';
import { StudentFooterComponent } from '../../shared/components/student-footer/student-footer.component';
@Component({
  selector: 'app-student-layout',
  standalone: true,
    imports: [RouterOutlet, StudentNavbarComponent, StudentFooterComponent],
    templateUrl: './students-layout.component.html'
})
export class StudentLayoutComponent {}












// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from '../../customer/components/navbar/navbar.component';
// import { FooterComponent } from '../../customer/components/footer/footer.component';
 
// @Component({
//   selector: 'app-user-layout',
//   standalone: true,
//   imports: [RouterOutlet, NavbarComponent, FooterComponent],
//   templateUrl: './user-layout.component.html'
// })
// export class UserLayoutComponent {}

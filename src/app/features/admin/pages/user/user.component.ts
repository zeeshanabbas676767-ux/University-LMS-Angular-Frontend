import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../shared/models/role.model';
 

@Component({
  selector: 'admin-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user.component.html'
})
export class AdminUserComponent {
  users: User[] = [];
  // filteredUsers: User[] = [];
  role: Role[] = [];
  user = {
    id: 0,
    fullName: '',
    email: '',
    department_Name: '',
    roleId: 0,
    role: { id: 0, name: '' }
  }
  departments: string[] = [];

  selectedDepartment = '';
  error: string | null = null;
  loading = false; 
  IsEditMode = false;
 
  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    this.loadUser();

     this.role = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Teacher' },
    { id: 3, name: 'Student' }
  ];
  } 

  loadUser(): void {
       this.loading = true;
    this.error = null;

   this.auth.getAllUsers().subscribe({
      next: (data) => {
        // this.users = data.filter((u: User) => u.roleId === 3);
       //  this.filteredUsers = this.users;
          // unique departments
          this.users = data;
      this.departments = [...new Set(
        this.users.map(u => u.department_Name)
      )];
      
         this.loading = false;
      },
      error: (err) => {
         const errorMessage = err?.error?.message || err?.message || 'Failed to load Users. Please check if the API is running.';
        this.error = `Error loading users: ${errorMessage}`;
        this.loading = false;
        console.error('Error calling API:', err);
      }
    }); 
}

  createUser() {
    this.auth.createUser(this.user).subscribe(() => {
      this.loadUser(); // Refresh the user list after creation
    });
  }

    saveUser() {
      if(!this.user.fullName || !this.user.email || !this.selectedDepartment || !this.user.roleId) {
        alert('Please fill in all fields');
        return;
      }
      this.user.role.id = Number(this.user.roleId);
  
      if (this.IsEditMode) {
        this.auth.updateUser(this.user).subscribe(() => {
          this.loadUsers();
          this.IsEditMode = false;
           this.resetForm();
        }
        );
      }
        else {
      const payload = {
        fullName: this.user.fullName,
        email: this.user.email,
        department_Name: this.selectedDepartment,
        roleId: Number(this.user.roleId)
      };
      this.auth.createUser(payload as User).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  
    }
  loadUsers() {
    throw new Error('Method not implemented.');
  }
  
    resetForm() {
    this.user = { id: 0, fullName: '', email: '', department_Name: '', roleId: 0, role: { id: 0, name: '' } };
    this.selectedDepartment = '';
    this.IsEditMode = false;
  }
  
    editUser(user: User) {
    this.user = { ...user };
    this.selectedDepartment = user.department_Name;
    this.IsEditMode = true;
  }



// filterStudents() {
//   this.filteredUsers = this.users.filter((u: User) =>
//     (!this.selectedDepartment || u.department_Name === this.selectedDepartment) &&
//     (!this.selectedSection || u.section === this.selectedSection)
//   );
// }

     delete(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    this.auth.delete(id).subscribe({
      next: () => {
        this.users = this.users.filter(p => p.id !== id);
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed');
      }
    });
  }




 


  
  
}

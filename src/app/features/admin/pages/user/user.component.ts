import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/services/auth.service';
 

@Component({
  selector: 'admin-user',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user.component.html'
})
export class AdminUserComponent {
  users: User[] = [];
  error: string | null = null;
  loading = false; 
  IsEditMode = false;
 
  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    this.loadUser();
  } 

  loadUser(): void {
       this.loading = true;
    this.error = null;

   this.auth.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
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

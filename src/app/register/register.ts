import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// IMPORTANT: We will fix this path in STEP 2
import { environment } from '../../environments/environment';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {

  user = { name: '', email: '', password: '' };
  message = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post(`${environment.apiUrl}/api/auth/register`, this.user)
      .subscribe({
        next: () => this.message = 'Account created successfully!',
        error: err => this.message = 'Registration failed: ' + err.error?.message
      });
  }
}

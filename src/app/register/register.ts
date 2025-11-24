import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
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

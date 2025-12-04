import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],   // ← THIS IS REQUIRED
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  message = '';

  constructor(private http: HttpClient) {}

  onRegister() {
    const backendUrl = 'http://10.0.2.15:3000/register';

    this.http.post(backendUrl, this.user).subscribe({
      next: () => this.message = 'Account created successfully!',
      error: () => this.message = 'Registration failed.'
    });
  }
}






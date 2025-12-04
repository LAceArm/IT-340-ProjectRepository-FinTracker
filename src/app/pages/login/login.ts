import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  message = '';

  constructor(private http: HttpClient) {}

  onLogin() {
    const backendUrl = 'http://10.0.2.15:3000/login';

    this.http.post(backendUrl, this.credentials).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.message = 'Login successful!';
        } else {
          this.message = 'Login failed: ' + res.message;
        }
      },
      error: () => this.message = 'Login request failed.'
    });
  }
}

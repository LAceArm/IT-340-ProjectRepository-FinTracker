import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const backendUrl = 'http://192.168.10.30:3000/login';

    this.http.post(backendUrl, this.credentials).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.message = 'Login successful!';

          // Save user info locally so other pages can use it

	  //REQUIRED FOR AUTH GUARD AND BUDGET ROUTES
	  localStorage.setItem('loggedIn', 'true');

	  //REQUIRED FOR userId separately
	  localStorage.setItem('userId', res.userId);

          localStorage.setItem('user', JSON.stringify(res.user));

          // Redirect to dashboard or home page
	  this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        } else {
          this.message = 'Login failed: ' + res.message;
        }
      },
      error: () => {
        this.message = 'Login request failed.';
      }
    });
  }
}

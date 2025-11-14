import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule]
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  onSubmit() {
    console.log('Login data:', this.loginData);
  }
}

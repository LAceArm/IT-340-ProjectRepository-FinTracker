import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();   // (optional – for future JWT storage)
    sessionStorage.clear();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

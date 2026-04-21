import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './budget.html'
})
export class BudgetComponent {

  budget = {
    income: 0,
    rent: 0,
    utilities: 0,
    groceries: 0
  };

  message = '';

  constructor(private http: HttpClient) {}

  saveBudget() {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    this.message = 'Not logged in';
    return;
  }

  const data = {
    partName: 'Total Budget',
    partAmount:
      this.budget.income -
      (this.budget.rent +
       this.budget.utilities +
       this.budget.groceries)
  };

  this.http
    .post(`http://192.168.10.30:3000/budget/${userId}`, data)
    .subscribe({
      next: () => (this.message = 'Budget saved'),
      error: () => (this.message = 'Failed to save budget')
    });
}
}

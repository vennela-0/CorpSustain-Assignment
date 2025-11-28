import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';  // Import CommonModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // You do not need forRoot() in standalone components
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

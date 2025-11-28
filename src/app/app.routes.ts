import { Routes } from '@angular/router';
import { DashboardChat } from './dashboard-chat/dashboard-chat';
import { BlueDashboardComponent } from './blue-dashboard-component/blue-dashboard-component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard-chat', pathMatch: 'full' },
  { path: 'blue-dashboard', component: BlueDashboardComponent },
  { path: 'dashboard-chat', component: DashboardChat }
];

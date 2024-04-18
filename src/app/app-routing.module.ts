import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ShellComponent } from './shared/components/shell/shell.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,pathMatch: 'full' },
  {
    path: '', component: ShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  // { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

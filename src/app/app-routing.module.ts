import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { ShellComponent } from './shared/components/shell/shell.component';
import { TeletravailComponent } from './shared/components/teletravail/teletravail.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { CongeComponent } from './shared/components/conge/conge.component';
import { UsersComponent } from './shared/components/users/users.component';
import { PowerBiReportComponent } from './shared/components/power-bi-report/power-bi-report.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {
    path: 'dashboard', component: ShellComponent, canActivate: [AuthGuard],
    children: [
      { path: 'teletravail', component: TeletravailComponent },
      { path: 'conge', component: CongeComponent},
      {path:'profile',component:ProfileComponent},
      {path:'users',component:UsersComponent},
      {path:'powerBi',component:PowerBiReportComponent}
    ]

  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

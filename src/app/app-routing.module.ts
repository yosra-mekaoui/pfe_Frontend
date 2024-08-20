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
import { ProjectListComponent } from './shared/components/project-list/project-list.component';
import { ProjectDetailComponent } from './shared/components/project-detail/project-detail.component';
import { AddProjectComponent } from './shared/components/add-project/add-project.component';
import { TaskListComponent } from './shared/components/task-list/task-list.component';
import { TaskDetailComponent } from './shared/components/task-detail/task-detail.component';
import { BacklogListComponent } from './shared/components/backlog-list/backlog-list.component';
import { BacklogDetailComponent } from './shared/components/backlog-detail/backlog-detail.component';
import { TaskBoardComponent } from './shared/components/task-board/task-board.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: ShellComponent, canActivate: [AuthGuard],
    children: [
      { path: 'teletravail', component: TeletravailComponent },
      { path: 'conge', component: CongeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'powerBi', component: PowerBiReportComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'projects/:id', component: ProjectDetailComponent },
      { path: 'add/project', component: AddProjectComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/:id', component: TaskDetailComponent },
      { path: 'backlogs', component: BacklogListComponent },
      { path: 'backlogs/:id', component: BacklogDetailComponent },
      { path: 'project/edit/:id', component: AddProjectComponent },
      { path: 'taskboard', component: TaskBoardComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

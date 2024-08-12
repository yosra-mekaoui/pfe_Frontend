import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeletravailComponent } from './components/teletravail/teletravail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CongeComponent } from './components/conge/conge.component';
import { RefreshAnimationComponent} from './components/refresh-animation/refresh-animation.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { BacklogListComponent } from './components/backlog-list/backlog-list.component';
import { BacklogDetailComponent } from './components/backlog-detail/backlog-detail.component';
import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { SprintDetailComponent } from './components/sprint-detail/sprint-detail.component'


@NgModule({
  declarations: [
    TeletravailComponent,
    ProfileComponent,
    CongeComponent,
    RefreshAnimationComponent,
    RefreshComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    TaskListComponent,
    TaskDetailComponent,
    BacklogListComponent,
    BacklogDetailComponent,
    SprintListComponent,
    SprintDetailComponent
  
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

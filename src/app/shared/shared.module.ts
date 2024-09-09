import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeletravailComponent } from './components/teletravail/teletravail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CongeComponent } from './components/conge/conge.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SearchComponent } from './components/search/search.component';}

@NgModule({
  declarations: [
    TeletravailComponent,
    ProfileComponent,
    CongeComponent,
    RefreshComponent,
    AddProjectComponent,
    ProjectListComponent,
    TaskListComponent,
    SearchComponent

  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

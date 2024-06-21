import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeletravailComponent } from './components/teletravail/teletravail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CongeComponent } from './components/conge/conge.component';



@NgModule({
  declarations: [
    TeletravailComponent,
    ProfileComponent,
    CongeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

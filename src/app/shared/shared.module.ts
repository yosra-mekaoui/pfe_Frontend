import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeletravailComponent } from './components/teletravail/teletravail.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    TeletravailComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

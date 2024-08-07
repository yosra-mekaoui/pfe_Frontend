import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeletravailComponent } from './components/teletravail/teletravail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CongeComponent } from './components/conge/conge.component';
import { RefreshAnimationComponent} from './components/refresh-animation/refresh-animation.component';
import { RefreshComponent } from './components/refresh/refresh.component'


@NgModule({
  declarations: [
    TeletravailComponent,
    ProfileComponent,
    CongeComponent,
    RefreshAnimationComponent,
    RefreshComponent
  
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

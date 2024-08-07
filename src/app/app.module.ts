import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ShellComponent } from './shared/components/shell/shell.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../src/app/core/interceptors/jwt.interceptor';
import { AuthService } from '../../src/app/core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TeletravailComponent } from './shared/components/teletravail/teletravail.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { UserService } from './shared/services/user.service';
import { CongeComponent } from './shared/components/conge/conge.component';
import { UsersComponent } from './shared/components/users/users.component';
import { PowerBiReportComponent } from './shared/components/power-bi-report/power-bi-report.component';
import { UserDetailComponent } from './shared/components/user-detail/user-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { RefreshComponent } from './shared/components/refresh/refresh.component';


@NgModule({
  declarations: [AppComponent, DashboardComponent, HeaderComponent, LoginComponent, ShellComponent,TeletravailComponent,ProfileComponent,CongeComponent, UsersComponent, PowerBiReportComponent, UserDetailComponent,RefreshComponent],
  imports: [BrowserModule, AppRoutingModule,    FeatherModule.pick(allIcons), HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,MatDialogModule
  ],

  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

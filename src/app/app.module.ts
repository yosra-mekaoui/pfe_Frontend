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


@NgModule({
  declarations: [AppComponent, DashboardComponent, HeaderComponent, LoginComponent, ShellComponent],
  imports: [BrowserModule, AppRoutingModule,    FeatherModule.pick(allIcons), HttpClientModule, FormsModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, BodyComponent, SidenavComponent, DashboardComponent, FooterComponent, HomeComponent, HeaderComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

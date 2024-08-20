import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  

  DeloitteTitle = 'Deloitte';
  LuanchAdminTitle = 'Luanch Admin';
  LuanchAdminText = 'Just see the my new admin!';
  LuanchAdminTime = '9 AM';
  EventToday = 'Event Today';
  EventTodayText = 'Just a reminder that you have event today!';
  EventTodayTime = '10 AM';
  Checkallnotificationsbutton = 'Check all notifications';
  ActionButton = 'Action';
  AnotherActionButton = 'Another action';
  SomethingElseHereButton = 'Something else here';
  ENButton = 'EN';
  FRButton = 'FR';
  ABButton = 'AB';
  HelloMessage = 'Hello,';
  UserName = 'Yosra Mekaoui';
  MyProfileB = 'Profile';
  MyBalanceB = 'My Balance';  
  InboxB = 'Inbox';
  AccountSettingB = 'Account Setting';
  ViewProfileB = 'View Profile';
  DashboardB = 'Dashboard';
  ApplicationsB = 'Applications';
  AllStaff= 'All Staff';
  TeletravailB = 'teleworks';
  CongesB = 'Leaves';
  ProjetsB = 'Projects';
  TachesB = 'Tasks';
  ComponentsB = 'Components';
  NotificationsB = 'Notifications';
  NotifB1 = 'Notif 1';
  NotifB2 = 'Notif 2';
  ChartsB = 'Task Board';
  ChartJsB1 = 'Power Bi';
  ChartJsB2 = 'Chart Js 2';
  CardsB = 'Cards';
  AuthenticationB = 'Authentication';
  LoginB = 'Login';
  RegisterB = 'Register';
  ExtraB = 'Extra';
  LogoutB2 = 'Logout';
  isRhRole: boolean = false;
  isManagerRole: boolean = false;
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.checkUserRole();
  }
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }

  checkUserRole(): void {
    const userRole = this.authService.getUserRole(); // Assuming this method exists and returns the role
    // RH OR MANAGER
    this.isRhRole = (userRole === 'RH'),
    this.isManagerRole = (userRole === 'Manager')
  }

}

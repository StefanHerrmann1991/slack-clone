import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* auth */
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';

/* routes */
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardChannelComponent } from './dashboard/dashboard-channel/dashboard-channel.component';
import { NavbarChannelComponent } from './navbar/navbar-channel/navbar-channel.component';
import { UserComponent as NavbarUserComponent } from './navbar/user/user.component';
import { NavbarMessagesComponent } from './navbar/navbar-messages/navbar-messages.component';
import { DashboardMessagesComponent } from './dashboard/dashboard-messages/dashboard-messages.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard/:id', component: DashboardComponent,
    children: [{ path: 'dashboard-channel/:channelId', component: DashboardChannelComponent }] 
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'channels', component: NavbarChannelComponent },
  { path: 'messages', component: NavbarMessagesComponent },
  { path: 'user', component: NavbarUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

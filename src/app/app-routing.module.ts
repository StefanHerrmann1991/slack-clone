import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* auth */
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';

/* routes */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChannelComponent as DashboardChannelComponent } from './dashboard/channel/channel.component';

/* mainpage */
/* import { NavbarChannelsComponent } from './navbar/navbar-channels/navbar-channels.component';
import { NavbarMessagesComponent } from './navbar/navbar-messages/navbar-messages.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DashboardChannelComponent } from './dashboard/dashboard-channel/dashboard-channel.component'; */


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard/:id', component: DashboardComponent,
    children: [{ path: 'dashboard-channel/:channelId', component: DashboardChannelComponent }]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'varify-email', component: VerifyEmailComponent },
  /*   { path: 'channels', component: NavbarChannelsComponent },
    { path: 'messages', component: NavbarMessagesComponent },
    { path: 'user-detail', component: UserDetailComponent },
   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MainComponent } from './main/main.component';
import { ChannelComponent } from './main/channel/channel.component';
import { MessageComponent } from './main/message/message.component';
import { EditChannelDialogComponent } from './main/channel/edit-channel-dialog/edit-channel-dialog.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ThreadComponent } from './main/thread/thread.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'main/:id', component: MainComponent,
    children: [
      {
        path: 'channel/:channelId',
        component: ChannelComponent,
        outlet: 'mainOutlet',
        children: [{
          path: 'message/:messageId',
          component: ThreadComponent
        }]
      },

      {
        path: 'channel/edit/:channelId', component: EditChannelDialogComponent
      }
    ]
  },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

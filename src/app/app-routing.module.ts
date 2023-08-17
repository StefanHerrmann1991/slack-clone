import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MainComponent } from './main/main.component';
import { ChannelComponent } from './main/channel/channel.component';
import { MessageComponent } from './main/message/message.component';
import { EditChannelComponent } from './main/channel/edit-channel/edit-channel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '/:id', component: MainComponent,
    children: [
      { 
        path: 'channel/:channelId', component: ChannelComponent 
      },
      {
        path: 'channel/edit/:channelId', component: EditChannelComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, Inject } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { Channel } from 'src/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditChannelMenuComponent } from '../edit-channel-menu/edit-channel-menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-edit-channel-dialog',
  templateUrl: './edit-channel-dialog.component.html',
  styleUrls: ['./edit-channel-dialog.component.sass']
})
export class EditChannelDialogComponent {
  usersData: { email: string, userId: string, username: string }[];
  channelNameInput: any;
  channelDiscription: any;
  isClosedArea: any;
  channelTopic: any;
  channelId = this.data.channelId;
  channel: Channel = new Channel();
  messages: any;
  userId;
  isChannelNameOpen = false;
  isDescriptionOpen = false;
  isTopicOpen = false;
  oldChannelId = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    private userService: UserService,
    private errorService: ErrorMessagesService,
    private router: Router
  ) { }

  ngOnInit() {

       this.channelService.getChannel(this.channelId)
        .subscribe(data => {
          this.channel = new Channel(data)
        }
        );
        this.userId = this.userService.getUserId();
  }

  leaveChannel() {
    this.dialog.closeAll();
    this.router.navigate(['/main', this.userId, { outlets: { mainOutlet: ['channel', 'iLOTSv8LDiFhfw5cAnq8'] } }]);
  }


  toggleChannelPrivacy(): void {
    this.channel.isClosedArea = !this.channel.isClosedArea;
  }

  openDialog(type: string): void {
    switch (type) {
      case 'channelName':
        break;
      case 'description':
        break;
      case 'topic':
        break;
    }

    this.dialog.open(EditChannelMenuComponent, {
      width: '250px',
      data: { type: type, channelId: this.channelId, userId: this.userId }
    });
  }
}

import { Component, Inject } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { Channel } from 'src/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditChannelMenuComponent } from '../edit-channel-menu/edit-channel-menu.component';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';



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


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.channelService.getChannel(this.channelId)
      .subscribe(data => {
        this.channel = new Channel(data)
      }
      );
    this.userId = this.userService.getUserId();
  }


  getChannel(): void {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      });
  }

  leaveChannel(): void {
    this.channelService.leaveChannel(this.channelId, this.userId);
  }

  toggleChannelPrivacy(): void {
    this.channel.isClosedArea = !this.channel.isClosedArea;
  }

  deleteChannel(): void {
    // TODO: Delete the channel logic here
  }

  archiveChannel(): void {
    // TODO: Archive the channel logic here
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

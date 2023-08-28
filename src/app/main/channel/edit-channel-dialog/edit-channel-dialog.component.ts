import { Component, Inject } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { Channel } from 'src/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditChannelMenuComponent } from '../edit-channel-menu/edit-channel-menu.component';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessagesService } from 'src/app/services/error-messages.service';


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
    private userService: UserService,
    private errorService: ErrorMessagesService
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
    if (this.channel && this.channel.usersData && this.channel.channelName !== 'allgemein') {
      // Filter out the user data from the usersData array
      const updatedUsersData = this.channel.usersData.filter(user => user.userId !== this.userId);
      this.channel.usersData = updatedUsersData;
      // Update the channel document in Firestore with the new usersData array
      this.firestore.collection('channels').doc(this.channelId).update({ usersData: updatedUsersData });
    }
    if (this.channel.channelName === 'allgemein') {
      this.errorService.showError(`Membership is required in ${this.channel.channelName}`,
        'Every workspace has one channel that contains all the members of this workspace – this is that channel for you.')
    }
    this.channelService.renderTree();
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

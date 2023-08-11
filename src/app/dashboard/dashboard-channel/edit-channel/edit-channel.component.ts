import { Component } from '@angular/core';
import { ChannelsService } from 'src/app/services/channels.service';
import { Channel } from 'src/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MatTabsModule} from '@angular/material/tabs'; 


@Component({
  selector: 'app-edit-channel',
  templateUrl: './edit-channel.component.html',
  styleUrls: ['./edit-channel.component.sass']
})
export class EditChannelComponent {
  channelNameInput: any;
  channelDiscription: any;
  isClosedArea: any;
  channelTopic: any;
  constructor(
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
  ) { }

  channelId = '';
  channel: Channel = new Channel();
  messages: any;


  getChannel(): void {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);     
      });
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

  editCannel() { }
}

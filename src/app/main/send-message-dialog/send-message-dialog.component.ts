import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/channel.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import 'firebase/compat/firestore';
import { User } from 'firebase/auth';



@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.sass']
})
export class SendMessageDialogComponent {
  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public channelsService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService) { }


  textareaFocused = false;
  placeholderText: string;
  newMessage: Message = new Message();
  messageTextInput: string;
  myDate: any = new Date();
  myTime: any = new Date();
  channelId = '';
  channel: Channel = new Channel();
  private userSubscription?: Subscription;
  currentUser: User | null;


  ngOnInit() {

    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });

    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('channelId');
      this.channelsService.getChannelById(this.channelId).subscribe(channel => {
        this.channel = channel;
      });
    });
  }

  ngOnDestroy() {
    this.channelsService.unsubscribeAll();
  }

  addMessage(userData) {
    let date = this.getData();
    const messageId = this.firestore.createId(); // Generate a unique ID
    this.newMessage = new Message({
      obj: {
        messageId: messageId,
        text: this.messageTextInput,
        time: date,
        username: userData.displayName,
        userId: userData.uid,
        userEmail: userData.email
      }
    });

    // update channel with new message
    this.channel = this.channelsService.addMessageToChannel(this.channel, this.newMessage);
    this.channelsService.updateChannel(this.channelId, this.channel);
  }


  getData() {
    return new Date().toISOString();
  }
}

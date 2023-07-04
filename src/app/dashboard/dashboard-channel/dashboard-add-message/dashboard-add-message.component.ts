import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/channel.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UserInterface as User } from '../../../services/user.service';


@Component({
  selector: 'app-dashboard-add-message',
  templateUrl: './dashboard-add-message.component.html',
  styleUrls: ['./dashboard-add-message.component.sass']
})
export class DashboardAddMessageComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService) { }

  textareaFocused = false;
  placeholderText: string;
  newMessage: Message = new Message();
  messageTextInput: string;
  myDate: any = new Date();
  channelId = '';
  channel: Channel = new Channel();
  private userSubscription?: Subscription;
  currentUser: User | null = null;



  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.channelId = this.route.snapshot.paramMap.get('channelId');
    this.getChannel();
  }


  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      })
  }

  addMessage(userData) {
    let date = this.getData();
    this.getChannel();
  
    // Here's where the Message object should be created.
    this.newMessage = new Message({
      text: this.messageTextInput,
      time: date,
      userName: userData.displayName,
      userId: userData.uid,
      userEmail: userData.email
    });
  
    // push the plain JavaScript object representation to the messages array
    this.channel.messages.push(this.newMessage);
    this.saveChannel();
  }

  saveChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .update(this.channel.toJSON())
  }


  getData() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    return this.myDate;
  }

}











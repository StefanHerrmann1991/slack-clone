import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, tap } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/channel.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard-new-channel-dialog',
  templateUrl: './dashboard-new-channel-dialog.component.html',
  styleUrls: ['./dashboard-new-channel-dialog.component.sass']
})
export class DashboardNewChannelDialogComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  textareaFocused = false;
  placeholderText: string;
  newMessage: Message = new Message();
  messageTextInput: string;
  myDate: any = new Date();
  channelId = '';
  userId = ''; // <-- added this
  channel: Channel = new Channel();


  ngOnInit() {
    debugger
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);
    this.userId = urlSegments[0]; // Gets the userId from the URL
    this.channelId = urlSegments[3]; // Gets the channelId from the URL
    this.getChannel();
    this.getUserData(this.userId);
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

  getUserData(userId) {

    this.firestore
      .collection('users')
      .doc(userId)
      .valueChanges()
      .subscribe((user: any) => {
        if (user.id) this.addMessage(user);
      })
  }

  addMessage(userData) {
    let date = this.getData()
    let userId = userData.userId
    let userName
    if (userData.name) userName = userData.name;
    else userName = userData.email;
    this.newMessage = new Message({
      text: this.messageTextInput,
      time: date,
      userId: userId,
      userName: userName
    })
    console.log(this.newMessage);
  }

  getData() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    return this.myDate;
  }

  getUser(currentUser) {
    if (currentUser) {
      this.firestore
        .collection('users')
        .get()
        .subscribe(snapshot => {
          // Get all the users data from Firestore
          const users: any = snapshot.docs.map(doc => doc.data());
          // Find the current user's data in the users array
          const currentUserData = users.find(user => user.userId === currentUser.uid);
          this.addMessage(currentUserData)
        });
    }
  }

  getCurrentUser() {
    this.afAuth.authState.subscribe(currentUser => {
      this.getUser(currentUser);
    });
  }
}











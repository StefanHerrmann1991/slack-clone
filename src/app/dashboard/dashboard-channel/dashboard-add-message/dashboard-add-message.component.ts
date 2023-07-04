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
import { onAuthStateChanged, getAuth } from 'firebase/auth';

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
    private router: Router,
    ) { }

  textareaFocused = false;
  placeholderText: string;
  newMessage: Message = new Message();
  messageTextInput: string;
  myDate: any = new Date();
  channelId = '';
  userId = ''; // <-- added this
  channel: Channel = new Channel();
  usersId: string;
  usersEmail: string;
  userDisplayName: string;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('channelId');
      this.getChannel();
    })
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

  getCurrentUser() {
    this.afAuth.authState.subscribe(currentUser => {
      if (currentUser) {
   
       
        this.firestore
          .collection('users')
          .get()
          .subscribe(snapshot => {
            onAuthStateChanged(getAuth(), (authUser) => {
              this.usersId = authUser.uid;
              this.usersEmail = authUser.email;
              this.userDisplayName = authUser.displayName;             
            });
          });
      } 
    }); 
  }
}











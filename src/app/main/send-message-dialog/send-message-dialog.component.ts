import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel, Message } from 'src/models/channel.class'; // Adjust if necessary
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.sass']
})
export class SendMessageDialogComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public channelsService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private authService: AuthService) { }


  textareaFocused = false;
  placeholderText = "Type your message here..."; // Initial value
  newMessage: Message = new Message();
  messageTextInput: string;
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

  addMessage(currentUser) {
    if (currentUser) {
      let date = this.getData();
      const messageId = this.firestore.createId(); // Generate a unique ID
    
      this.newMessage = new Message({
        messageId: messageId,
        text: this.messageTextInput,
        time: date,
        username: currentUser.displayName,
        userId: currentUser.uid,
        userEmail: currentUser.email,
      });
    
      // Convert the Message instance to a plain object
      const newMessageData = this.newMessage.toJSON();
    
      // Add new message to the 'messages' subcollection in Firestore
      this.firestore.collection('channels').doc(this.channelId).collection('messages').add(newMessageData)
        .then(() => {
          console.log('Message added to Firestore successfully!');
        })
        .catch(error => {
          console.error('Error adding message to Firestore: ', error);
        });
    } else {
      console.error('No user signed in.');
    }
  }
  

  getData() {
    return new Date().toISOString();
  }
}

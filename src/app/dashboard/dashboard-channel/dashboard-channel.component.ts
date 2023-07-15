import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-channel',
  templateUrl: './dashboard-channel.component.html',
  styleUrls: ['./dashboard-channel.component.sass'],
  providers: [DatePipe],
})
export class DashboardChannelComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private datePipe: DatePipe) { }

  channelId = '';
  channel: Channel = new Channel();
  messages: any;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('channelId'); 
      this.getChannel();   
    })
  }

  getChannel(): void {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);       
        this.messages = this.channel.messages;
        this.messages = this.messages.map(message => ({...message, time: this.transformDate(message.time)}));
        console.log(this.channel)
      })
  }

  transformDate(date: string): string {
    return this.datePipe.transform(date, 'EEEE, d MMMM', 'en-GB');
  }
}
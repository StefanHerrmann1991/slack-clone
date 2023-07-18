import { Component, OnInit, HostListener } from '@angular/core';
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
    private datePipe: DatePipe,
  ) { }

  channelId = '';
  channel: Channel = new Channel();
  messages: any;

  stickyDate = '';
  dateContainerPositions: { date: string; position: number }[] = [];


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
        this.messages = this.groupMessagesByDate(this.channel.messages);
        console.log(this.channel);
      });
  }

  groupMessagesByDate(messages): any[] {
    const groupedMessages = [];
    let currentDate = '';
    let index = -1;

    for (const message of messages) {
      const messageDate = this.datePipe.transform(message.time, 'EEEE, d MMMM', 'en-GB');
      if (messageDate !== currentDate) {
        currentDate = messageDate;
        index++;
        groupedMessages[index] = {
          date: currentDate,
          messages: []
        };
      }

      const messageTime = this.datePipe.transform(message.time, 'HH:mm', 'en-GB');
      groupedMessages[index].messages.push({ ...message, time: messageTime });
    }
    return groupedMessages;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    for (let i = 0; i < this.messages.length; i++) {
      const dateContainer = document.getElementById('date-' + i);
      if (dateContainer && this.isInViewport(dateContainer)) {
        this.stickyDate = this.messages[i].date;
        break;
      }
    }
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }


}
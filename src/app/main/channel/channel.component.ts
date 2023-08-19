import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { EditChannelDialogComponent } from './edit-channel-dialog/edit-channel-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.sass']
})


export class ChannelComponent {
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public channelService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private datePipe: DatePipe,
  ) { }

  showStickyLine: boolean = false;
  channelId = '';
  channel: Channel = new Channel();
  messages: any;
  stickyDate = '';
  dateContainerPositions: { date: string; position: number }[] = [];
  userId: string;

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('channelId');
      this.getChannel();
    })
    this.route.parent.paramMap.subscribe(parentParamMap => {
      this.userId = parentParamMap.get('id');  // Accessing parent route's parameters
         });

  }


openDialog() {
  this.dialog.open(EditChannelDialogComponent, {
    data: { channelId: this.channelId, userId: this.userId },
    width: '550px',
    height: '600px',
    hasBackdrop: true
  });
}

getChannel(): void {
  this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((channel: any) => {
      this.channel = new Channel(channel);
      this.messages = this.groupMessagesByDate(this.channel.messages);
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

@HostListener('window:scroll')
onWindowScroll() {
  for (let i = 0; i < this.messages.length; i++) {
    const dateContainer = document.getElementById('date-' + i);

    if (dateContainer && this.topEdgeInViewport(dateContainer)) {
      this.stickyDate = this.messages[i].date;
      break;
    }
  }
}

topEdgeInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= 0;  // Top edge of the element is at or above the top edge of the viewport
}
}

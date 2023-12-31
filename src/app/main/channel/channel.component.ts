import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { EditChannelDialogComponent } from './edit-channel-dialog/edit-channel-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.sass']
})


export class ChannelComponent implements OnInit {
  channel$: Observable<Channel>;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public channelsService: ChannelsService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  showStickyLine: boolean = false;
  channelId = '';
  channel: Channel = new Channel();
  messages: any;
  stickyDate = '';
  dateContainerPositions: { date: string; position: number }[] = [];
  userId = '';
  messageId = '';
  editingMessageId: string | null = null;
  editingMessageText: string | null = null;
  editingMessageIndex: number | null = null;

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const channelId = paramMap.get('channelId');
        if (channelId) {
          this.channelId = channelId;
          return this.channelsService.getChannelByRouteId(channelId);
        } else {
          console.error('Channel ID not found in route.');
          return throwError('Channel ID not found in route.'); // this will skip subsequent operations and jump straight to error handling if you have any
        }
      })
    ).subscribe(
      channel => {
        // Handle the channel data here, for example:
        this.channel = channel;
        this.getChannel();
        this.getAllMessages(); // Fetch messages once the channel data is available
      },
      error => {
        console.error('Error fetching channel:', error);
      }
    );


    this.userId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnDestroy() {
    this.channelsService.unsubscribeAll();
  }

  openThreadToReply(messageId: string): void {
    this.router.navigate(
      [
        '/main', this.userId,
        {
          outlets: {
            mainOutlet: ['channel', this.channelId],
            threadOutlet: ['channelReply', messageId, { channelId: this.channelId }]
          }
        }
      ],
      { relativeTo: this.activatedRoute }
    );
  }

  deleteMessage(messageId) {
    this.channelsService.deleteMessage(this.channelId, messageId);
  }

  saveMessage() { }
  cancelEditMessage() { }


  openDialog() {
    this.dialog.open(EditChannelDialogComponent, {
      data: { channelId: this.channelId, userId: this.userId },
      width: '550px',
      height: '600px',
      hasBackdrop: true
    });
  }


  getChannel(): void {
    this.channelsService.getChannel(this.channelId)
      .subscribe({
        next: (channel) => {
          this.channel = channel;
        },
        error: (error) => {
          console.error('Error fetching channel:', error);
        }
      });
  }


  getAllMessages(): void {
    this.channelsService.getMessages(this.channelId)
      .subscribe({
        next: (messages) => {
          if (messages && Array.isArray(messages)) {
            this.messages = this.groupMessagesByDate(messages);
            console.log(this.messages);
          } else {
            console.error('Messages retrieval failed or returned non-array response');
          }
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        }
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


  topEdgeInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= 0;  // Top edge of the element is at or above the top edge of the viewport
  }
}

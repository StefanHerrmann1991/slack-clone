import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.sass']
})
export class ThreadComponent {

  constructor(
    private route: ActivatedRoute) {

  }

  channelId: string = '';
  replyId: string = '';


  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const replyId = paramMap.get('messageId');
      this.replyId = replyId;

      const channelId = paramMap.get('channelId');
      this.channelId = channelId;
      console.log(this.channelId);

      if (!this.channelId) {
        console.error('Channel ID not found in route.');
      }
    });
  }


}
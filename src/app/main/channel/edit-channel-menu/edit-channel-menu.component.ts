import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditChannelDialogComponent } from '../edit-channel-dialog/edit-channel-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChannelsService } from 'src/app/services/channels.service';
import { Channel } from 'src/models/channel.class'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-channel-menu',
  templateUrl: './edit-channel-menu.component.html',
  styleUrls: ['./edit-channel-menu.component.sass']
})
export class EditChannelMenuComponent {
  constructor(
    public dialogRef: MatDialogRef<EditChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private overlayContainer: OverlayContainer,
    private channelsService: ChannelsService,

  ) { }

  channel = new Channel();
  channelName: string;
  topic: string;
  description: string;
  channelId = this.data.channelId;


  ngOnInit() {
    if (this.data.theme === 'app-theme') {
      this.overlayContainer.getContainerElement().classList.add(this.data.theme);
    }

    
    // Now, you can use the channelId to fetch the channel data
    if (this.channelId) {
      this.channelsService.getChannel(this.channelId).subscribe(data => {
        this.channel = new Channel(data);
        this.channelName = this.channel.channelName;
        this.description = this.channel.description;
        

      });
    } else {
      console.error('channelId is undefined');
    }
  }



  updateCollectionFromInput(inputValue: string) {
    this.channelsService.updateCollection(this.channelId, 'channels', 'channelName', inputValue)
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}

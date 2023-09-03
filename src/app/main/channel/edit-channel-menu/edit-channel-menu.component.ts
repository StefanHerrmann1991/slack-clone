import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditChannelDialogComponent } from '../edit-channel-dialog/edit-channel-dialog.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChannelsService } from 'src/app/services/channels.service';
import { Channel } from 'src/models/channel.class'
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  channel = new Channel();
  channelName: string;
  channelTopic: string;
  description: string;
  channelId = this.data.channelId;


  
  ngOnInit() { 
    if (this.data.theme === 'app-theme') {
      this.overlayContainer.getContainerElement().classList.add(this.data.theme);
    }    
  
    if (this.channelId) {
      this.channelsService.getChannel(this.channelId).subscribe(
        data => {
          this.channel = new Channel(data);
          this.channelName = this.channel.channelName;
          this.description = this.channel.description;
          this.channelTopic = this.channel.channelTopic;
        },
        error => {
          console.error('Error fetching channel data:', error);
        }
      );
    } else {
      console.error('channelId is undefined');
    }
  }
  
  ngOnDestroy() {
    this.channelsService.unsubscribeAll();
  }


  updateCollectionFromInput(field: string, inputValue: string) {
    this.channelsService.updateCollection(this.channelId, 'channels', field, inputValue)
    this.close();
   
  }


  close(): void {
    this.dialogRef.close();
  }  
}

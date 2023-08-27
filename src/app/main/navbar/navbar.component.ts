import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InviteCollegueDialogComponent } from './invite-collegue-dialog/invite-collegue-dialog.component';
import { CreateChannelDialogComponent } from '../channel/create-channel-dialog/create-channel-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  changeText: boolean;
  hovering: boolean = false;
  /* Only shows the channels names but not the corresponding data. */
  ngOnInit() {    
    this.channelService.renderTree();
  }
  constructor(public dialog: MatDialog, public channelService: ChannelsService) {
    this.changeText = false;
  }

  toggleExpanded(node: any) {
    // Code to toggle the expanded state of the node
    this.channelService.treeControl.toggle(node);
  }
  
  iconBackground: string = '';
  changeBackground(color: string) {
      this.iconBackground = color;
  } 

  createChannel(){};

  
  manageChannels(){};


  openNewChannelDialog() {
    this.dialog.open(CreateChannelDialogComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }

  openInviteCollegueDialog() {
    this.dialog.open(InviteCollegueDialogComponent, {
      width: '650px',
      hasBackdrop: true
    });
  }

}

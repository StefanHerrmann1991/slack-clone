import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavbarNewChannelDialogComponent } from './navbar-channel/navbar-new-channel-dialog/navbar-new-channel-dialog.component';
import { NavbarMessagesComponent } from '../navbar/navbar-messages/navbar-messages.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  channelId = '';

  constructor(private dialog: MatDialog, private firestore: AngularFirestore) { }

  newChannel() {
    this.dialog.open(NavbarNewChannelDialogComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }

  newMessage() {
  /*   this.dialog.open(NavbarNewMessagesDialogComponent, {
      width: '520px',
      hasBackdrop: true
    }); */
  }
}
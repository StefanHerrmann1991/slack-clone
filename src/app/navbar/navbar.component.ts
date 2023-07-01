import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavbarChannelComponent } from './navbar-channel/navbar-channel.component';
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
    this.dialog.open(NavbarChannelComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }

  newMessage() {
    this.dialog.open(NavbarMessagesComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }
}
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavbarNewChannelDialogComponent } from './navbar-channel/navbar-new-channel-dialog/navbar-new-channel-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { NavbarInviteCollegueDialogComponent } from './navbar-messages/navbar-invite-collegue-dialog/navbar-invite-collegue-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  channelId = '';

  constructor(private dialog: MatDialog, private firestore: AngularFirestore) { }

  openNewChannelDialog() {
    this.dialog.open(NavbarNewChannelDialogComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }

  openInviteCollegueDialog() {
    this.dialog.open(NavbarInviteCollegueDialogComponent, {
      width: '650px',
      hasBackdrop: true
    });
  }

}
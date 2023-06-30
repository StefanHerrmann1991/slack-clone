import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelsService } from 'src/app/services/channels.service';
import { startWith, map } from 'rxjs/operators';
import { timePassed } from 'src/app/services/utils/utils.service';
import { getDateTime } from 'src/app/services/utils/utils.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-channel-dialog',
  templateUrl: './new-channel-dialog.component.html',
  styleUrls: ['./new-channel-dialog.component.sass']
})
export class NewChannelDialogComponent implements OnInit {
  channel: Channel = new Channel();
  channelNameInput: string;
  users: any[];
  newChannel: Channel;
  channelDiscription: string = '';
  usersId: string;
  usersEmail: string;
  isClosedArea = false;
  items: Observable<any[]>;
  dataSource: any;
  timestamp: any
  currentUser: any;

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<NewChannelDialogComponent>,
    private afAuth: AngularFireAuth,
    private _formBuilder: FormBuilder,
    private ChannelService: ChannelsService,
  ) {
  }


  // diese Funktion verwenden für saveEditedUser()
  addNewChannel() {
    this.afAuth.authState.subscribe(currentUser => {
      if (currentUser) {
        this.firestore
          .collection('users')
          .get()
          .subscribe(snapshot => {
            onAuthStateChanged(getAuth(), (authUser) => {
              this.usersId = authUser.uid;
              this.usersEmail = authUser.email;
            });
            this.timestamp = getDateTime()
            console.log(this.timestamp);
            if (!this.isClosedArea) this.users = snapshot.docs.map(doc => doc.data());
            this.newChannel = new Channel({
              creatorId: currentUser.uid,
              usersData: this.users,
              channelName: this.channelNameInput,
              discription: this.channelDiscription,
              isClosedArea: this.isClosedArea,
              creationTime: this.timestamp,
              numberOfMembers: this.users.length
            });
            console.log(this.newChannel)
            this.firestore
              .collection('channels')
              .add(this.newChannel.toJSON())
            this.ChannelService.tree = [];
            this.ChannelService.renderTree();
          });
      }
    });
    this.dialogRef.close();
  }

  control = new FormControl('');
  filteredChannels: Observable<string[]>;

  ngOnInit() {
    this.ChannelService.getAllChannels();
    this.filteredChannels = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (this.ChannelService.allChannels) return this.ChannelService.allChannels.filter(channel => this._normalizeValue(channel.channelName).includes(filterValue)).map(channel => channel.channelName);
    else return [];

  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}




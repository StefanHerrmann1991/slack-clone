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
import { getDateTime } from '../../../services/utils.service';
import { Subscription } from 'rxjs';
import { UserInterface as User } from '../../../services/auth-user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-channel-dialog',
  templateUrl: './create-channel-dialog.component.html',
  styleUrls: ['./create-channel-dialog.component.sass']
})
export class CreateChannelDialogComponent {
  channel: Channel = new Channel();
  channelNameInput: string;
  users: any[];
  newChannel: Channel;
  channelDiscription: string = '';
  usersId: string;
  usersEmail: string;
  isClosedArea: boolean = false;
  archived: boolean = false;
  items: Observable<any[]>;
  dataSource: any;
  timestamp: any
  private userSubscription?: Subscription;
  currentUser: User | null = null;
  topic: string = '';


  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<CreateChannelDialogComponent>,
    private afAuth: AngularFireAuth,
    private _formBuilder: FormBuilder,
    private channelsService: ChannelsService,
    private authService: AuthService
  ) { }

  addNewChannel() {

    if (this.currentUser) {
      this.fetchUsersFromFirestore().subscribe(snapshot => {
        this.timestamp = this.getCurrentTimestamp();
        this.users = this.getUsersFromSnapshot(snapshot);
        this.createNewChannel();
        this.addChannelToFirestore();
        this.resetChannelServiceTree();
      });
    }
    this.closeDialog();
  }

  ngOnDestroy() {
    this.channelsService.unsubscribeAll();
  }

  fetchUsersFromFirestore() {
    return this.firestore.collection('users').get();
  }

  getCurrentTimestamp() {
    return getDateTime();
  }

  getUsersFromSnapshot(snapshot) {
    if (!this.isClosedArea) {
      return snapshot.docs.map(doc => doc.data());
    }
    return [];
  }

  createNewChannel() {
    this.newChannel = new Channel({
      creatorId: this.currentUser.uid,
      channelCreator: this.currentUser.displayName,
      usersData: this.users,
      channelName: this.channelNameInput,
      description: this.channelDiscription,
      isClosedArea: this.isClosedArea,
      creationTime: this.timestamp,
      numberOfMembers: this.users.length,
      channelTopic: this.topic,
      archived: this.archived,

    });
  }

  addChannelToFirestore() {
    this.firestore.collection('channels').add(this.newChannel.toJSON()).then(docRef => { 
    });
  }

  resetChannelServiceTree() {
    this.channelsService.tree = [];
    this.channelsService.renderTree();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  control = new FormControl('');
  filteredChannels: Observable<string[]>;

  ngOnInit() {

    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.channelsService.getAllChannels();
    this.filteredChannels = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }



  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (this.channelsService.allChannels) return this.channelsService.allChannels.filter(channel => this._normalizeValue(channel.channelName).includes(filterValue)).map(channel => channel.channelName);
    else return [];

  }


  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}

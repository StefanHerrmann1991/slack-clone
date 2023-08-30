import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from '@angular/fire/firestore';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel, Message } from 'src/models/channel.class';
import { UserService } from './user.service';
import { ErrorMessagesService } from './error-messages.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';

let themes;

interface ChannelsNode {
  name: string;
  channelId: string;
  isClosedArea: boolean;
  children?: ChannelsNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})

export class ChannelsService {

  channelsRef
  channel: Channel = new Channel();
  tree: ChannelsNode[] = [];
  allChannels;
  themes: any;
  channelId: string;


  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private errorService: ErrorMessagesService,
    private router: Router,
    private dialog: MatDialog) { }

  getAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
      })
  }

  getChannel(channelId: string): Observable<Channel> {
    return this.firestore
      .collection('channels')
      .doc<Channel>(channelId)
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error('Error fetching channel:', error);
          return throwError(error);
        })
      );
  }
  
  getChannelById(channelId: string): Observable<Channel> {

    return this.firestore
      .collection('channels')
      .doc(channelId)
      .valueChanges()
      .pipe(map((channel: any) => new Channel(channel)));
  }

  updateChannel(channelId: string, channel: Channel): Promise<void> {
    return this.firestore
      .collection('channels')
      .doc(channelId)
      .update(channel.toJSON());
  }

  addMessageToChannel(channel: Channel, message: Message): Channel {

    channel.messages.push(message);
    return channel;
  }

  private _transformer = (node: ChannelsNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      channelId: node.channelId,
      isClosed: node.isClosedArea,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  renderTree() {
    this.tree = [];
    this.channelsRef = this.firestore.collection('channels');
    this.channelsRef.get().subscribe(snapshot => {
      snapshot.forEach(doc => {
        const channel = new Channel(doc.data());
        const userId = this.userService.getUserId();
        const userIsPartOfChannel = channel.usersData.some(user => user.userId === userId);
        if (userIsPartOfChannel) {
          this.tree.push({ name: `${channel.channelName}`, isClosedArea: channel.isClosedArea, channelId: doc.id });
        }
      });
      themes = [{ name: 'Channels', children: this.tree }];
      this.dataSource.data = themes;
    });
  }

  updateChannelName(id: string, newName: string) {
    this.firestore.collection('channels').doc(id).update({ channelName: newName });
  }

  updateCollection(id: string, collectionName: string, field: string, newValue: any) {
    this.firestore.collection(collectionName).doc(id).update({ [field]: newValue });
  }

  /* TODO */
  leaveChannel(): void {
    if (this.channel && this.channel.usersData && this.channel.channelName !== 'allgemein') {
      let userId = this.userService.getUserId();
      // Filter out the user data from the usersData array
      const updatedUsersData = this.channel.usersData.filter(user => user.userId !== userId);
      this.channel.usersData = updatedUsersData;
      setTimeout(() => {
        this.updateChannel(this.channelId, this.channel);
      }, 2000);
      this.renderTree();
    }
    if (this.channel.channelName === 'allgemein') {
      this.errorService.showError(`Membership is required in ${this.channel.channelName}`,
        'Every workspace has one channel that contains all the members of this workspace – this is that channel for you.')
    }
  }




  deleteChannel(channelId: string): void {

    if (confirm("Are you sure you want to delete this channel? This action cannot be undone.") && this.channel.channelName !== 'allgemein') {
      let userId = this.userService.getUserId();
      this.dialog.closeAll();
      this.router.navigate(['/main', userId, { outlets: { mainOutlet: ['channel', 'iLOTSv8LDiFhfw5cAnq8'] } }]);
      this.firestore.collection('channels').doc(channelId).delete().then(() => {
        console.log("Channel successfully deleted!");
     
      }).catch((error) => {
        console.error("Error removing channel: ", error);
      });
    }


  }

  archiveChannel(channelId: string): void {
    if (confirm("Are you sure you want to archive this channel?") && this.channel.channelName !== 'allgemein') {
      this.firestore.collection('channels').doc(channelId).update({ isArchived: true }).then(() => {
        console.log("Channel successfully archived!");
      }).catch((error) => {
        console.error("Error archiving channel: ", error);
      });
    }
    this.renderTree();
  }



}



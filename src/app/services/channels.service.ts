import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel, Message } from 'src/models/channel.class';
import { UserService } from './user.service';
import { ErrorMessagesService } from './error-messages.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import 'firebase/compat/firestore';
import { Subscription } from 'rxjs';


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
  public subscriptions: Subscription[] = [];


  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private errorService: ErrorMessagesService,
    private router: Router,
    private dialog: MatDialog) { }

  getAllChannels() {
    const sub = this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
    this.subscriptions.push(sub);
  }

  getChannel(channelId: string): Observable<Channel> {
    return this.firestore
      .collection('channels')
      .doc<Channel>(channelId)
      .valueChanges()
      .pipe(
        map(data => new Channel(data)),
        catchError(error => {
          console.error('Error fetching channel:', error);
          throw new Error('Failed to fetch channel.');
        })
      );
  }


  getMessages(channelId: string): Observable<Message[]> {
    return this.firestore
      .collection('channels')
      .doc(channelId)
      .collection('messages')
      .valueChanges({ idField: 'messageId' })  // adding idField to include the document ID in the result
      .pipe(
        map(data => data.map(messageData => new Message(messageData))),
        catchError(error => {
          console.error('Error fetching messages:', error);
          throw new Error('Failed to fetch messages.');
        })
      );
  }



  getChannelByRouteId(id: string): Observable<Channel> {
    return this.firestore
      .collection('channels')
      .doc<Channel>(id)
      .valueChanges()
      .pipe(
        map(data => new Channel(data)),
        catchError(error => {
          console.error('Error fetching channel:', error);
          throw new Error('Failed to fetch channel.');
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
    const sub = this.channelsRef.get().subscribe(snapshot => {
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
    this.subscriptions.push(sub);
  }

  unsubscribeAll() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateChannelName(id: string, newName: string) {
    this.firestore.collection('channels').doc(id).update({ channelName: newName });
  }

  updateCollection(id: string, collectionName: string, field: string, newValue: any) {
    this.firestore.collection(collectionName).doc(id).update({ [field]: newValue });
  }

  /* #allgemeinId */

  leaveChannel(userId: string, channelId: string, channel: Channel): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (channel && channel.usersData && channel.channelName !== 'allgemein') {
        const updatedUsersData = channel.usersData.filter(user => user.userId !== userId);
        this.firestore.collection('channels').doc(channelId).update({ usersData: updatedUsersData })
          .then(() => {
            resolve();
            this.router.navigate(['/main', userId, { outlets: { mainOutlet: ['channel', 'SMx1f972ehFAmbt1zERC'] } }]);
            this.renderTree();
          })
          .catch(err => {
            console.error('Error leaving channel:', err);
            reject(err);
          });
      } else if (channel.channelName === 'allgemein') {
        this.errorService.showError(`Membership is required in ${channel.channelName}`,
          'Every workspace has one channel that contains all the members of this workspace – this is that channel for you.');
        reject(new Error('Cannot leave the "allgemein" channel.'));
      } else {
        reject(new Error('Channel information is not valid.'));
      }
    });
  }

  /* #allgemeinId */
  deleteChannel(channelId: string) {

    if (confirm("Are you sure you want to delete this channel? This action cannot be undone.") && this.channel.channelName !== 'allgemein') {
      let userId = this.userService.getUserId();
      this.dialog.closeAll();
      this.router.navigate(['/main', userId, { outlets: { mainOutlet: ['channel', 'SMx1f972ehFAmbt1zERC'] } }]);
      this.firestore.collection('channels').doc(channelId).delete().then(() => {
        console.log("Channel successfully deleted!");
        this.renderTree();
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



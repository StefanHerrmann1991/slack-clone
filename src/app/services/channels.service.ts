import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection } from '@angular/fire/firestore';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Channel } from 'src/models/channel.class';

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


  constructor(private firestore: AngularFirestore) { }

  getAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allChannels = changes;
      })
  }

  getChannel(channelId: string) {
    return this.firestore.collection('channels').doc(channelId).valueChanges();
  }

  getCollection(collection: string, variableToUpdate: any) {
    this.firestore
      .collection(`${collection}`)
      .valueChanges()
      .subscribe((changes: any) => {
        this[variableToUpdate] = changes;
      })
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
        this.tree.push({ name: `${channel.channelName}`, isClosedArea: channel.isClosedArea, channelId: doc.id });
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


}



import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}

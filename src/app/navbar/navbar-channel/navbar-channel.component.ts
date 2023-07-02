import { Component } from '@angular/core';
import { Channel } from 'src/models/channel.class';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { ChannelsService } from 'src/app/services/channels.service';



@Component({
  selector: 'app-navbar-channel',
  templateUrl: './navbar-channel.component.html',
  styleUrls: ['./navbar-channel.component.sass']
})
export class NavbarChannelComponent {
  changeText: boolean;
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
  

}

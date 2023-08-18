import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditChannelDialogComponent } from '../edit-channel-dialog/edit-channel-dialog.component';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-edit-channel-menu',
  templateUrl: './edit-channel-menu.component.html',
  styleUrls: ['./edit-channel-menu.component.sass']
})
export class EditChannelMenuComponent {
  constructor(
    public dialogRef: MatDialogRef<EditChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private overlayContainer: OverlayContainer
 
  ) { }


  ngOnInit() {
    if (this.data.theme === 'app-theme') {
          this.overlayContainer.getContainerElement().classList.add(this.data.theme);
        }}

  close(): void {
    this.dialogRef.close();
  }
}

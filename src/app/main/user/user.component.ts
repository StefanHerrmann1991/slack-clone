import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/app-user.class';
import { AuthService } from '../../services/auth.service';
import { EditUserComponent } from './edit-user/edit-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent {

  user: User = new User();
  userId = '';

  constructor(
    public authService: AuthService,   
    public dialog: MatDialog
  ) { }


  editProfileDialog() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '520px',
      hasBackdrop: true
    });
    dialogRef.componentInstance.user = this.user;
    dialogRef.componentInstance.userId = this.userId;
  }
}
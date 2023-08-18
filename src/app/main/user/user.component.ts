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
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) { }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user);
      })
  }

  editProfileDialog() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '520px',
      hasBackdrop: true
    });
    dialogRef.componentInstance.user = this.user;
    dialogRef.componentInstance.userId = this.userId;
  }
}
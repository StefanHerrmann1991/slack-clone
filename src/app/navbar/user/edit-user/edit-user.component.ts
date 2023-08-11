import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  loading = false;
  user!: User;
  userId!: string;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) { }

  ngOnInit(): void {
  }

  saveEditedUser() {
    this.loading = true;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update({ name: this.user.username })
      .then((result: any) => {
        this.loading = false;       
        this.dialogRef.close();
      })
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-navbar-invite-collegue-dialog',
  templateUrl: './navbar-invite-collegue-dialog.component.html',
  styleUrls: ['./navbar-invite-collegue-dialog.component.sass']
})
export class NavbarInviteCollegueDialogComponent implements OnInit {

  inviteForm: FormGroup;
  usernameControl = new FormControl();
  users: any[] = [];
  filteredOptions: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<NavbarInviteCollegueDialogComponent>,
    private afAuth: AngularFireAuth
  ) { }


  currentUser: User | null;
  invitedUsers: string[] = [];

  ngOnInit(): void {
    debugger
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser)
    });
    this.inviteForm = this.formBuilder.group({
      username: this.usernameControl,
    });
    this.getUsers();
  }

  getUsers() {
    debugger
    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.users = users.filter(user => user.username !== this.currentUser.displayName && !this.invitedUsers.includes(user.username));
      this.filteredOptions = this.usernameControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.username),
        map(username => username ? this._filter(username) : this.users.slice())
      );
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option.username.toLowerCase().includes(filterValue));
  }



}


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
  buttonText: string;
  nameFormControl: any;
  emailFormControl: FormControl<any>;
  http: any;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<NavbarInviteCollegueDialogComponent>,
    private afAuth: AngularFireAuth
  ) { }

  isLoading: boolean = false;
  currentUser: User | null;
  invitedUsers: string[] = [];

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
    this.inviteForm = this.formBuilder.group({
      username: this.usernameControl,
    });
    this.getUsers();
  }


  onSubmit(): void {
    if (this.inviteForm.valid) {
      const email = this.inviteForm.get('email').value;

      // your invite logic here
      // this could be a call to Firebase function to send an email, or you could just store this in Firestore collection
      console.log(email);

      this.dialogRef.close();
    }
  }


  inviteUser() {
    this.isLoading = true;
    this.buttonText = "Submitting...";
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(`${user.name} is registerd`)
      }

    )
  }






  getUsers() {

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


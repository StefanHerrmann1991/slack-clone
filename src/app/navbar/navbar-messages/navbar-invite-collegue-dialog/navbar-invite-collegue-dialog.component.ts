import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-navbar-invite-collegue-dialog',
  templateUrl: './navbar-invite-collegue-dialog.component.html',
  styleUrls: ['./navbar-invite-collegue-dialog.component.sass']
})
export class NavbarInviteCollegueDialogComponent implements OnInit {

  inviteForm: FormGroup;
  emailControl = new FormControl();
  users: any[] = [];
  filteredOptions: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<NavbarInviteCollegueDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.inviteForm = this.formBuilder.group({
      email: this.emailControl,
    });
    this.getUsers();
  }

  getUsers() {
    this.firestore.collection('users').valueChanges().subscribe((users: any) => {
      this.users = users;
      this.filteredOptions = this.emailControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.email),
        map(email => email ? this._filter(email) : this.users.slice())
      );
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option.email.toLowerCase().includes(filterValue));
  }


}


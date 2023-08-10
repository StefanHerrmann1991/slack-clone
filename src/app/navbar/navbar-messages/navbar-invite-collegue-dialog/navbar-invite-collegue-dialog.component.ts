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
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.inviteForm = this.formBuilder.group({
      email: this.emailFormControl
    });
    this.getUsers();
  }


  /* TODO insert right url to access slack-clone */

  /**
   * Sends a user invitation email.
   * @param {string} email - The email address of the user.
   * @param {string} invitationToken - The token for user invitation.
   * @returns {Promise<void>} A Promise that resolves when the email is sent successfully.
   */
  async sendUserInvitationEmail(formValue: any) {
    const email = formValue.email;  // Extract email from form data
    const invitationToken = this.generateRandomToken();

    // Construct the invitation URL
    const inviteUrl = window.location.origin + '/Join/main/00login-register/invitation.html?token=' + invitationToken;
    const message = `You have been invited! Click the following link to join Slack-Clone: ${inviteUrl}`;

    // Construct the FormData object
    const mailFormData = new FormData();
    mailFormData.append('email', email);
    mailFormData.append('name', 'User Invitation');  // Subject for user invitation
    mailFormData.append('message', message);

    // Send the request
    const response = await fetch('https://stefan-herrmann.developerakademie.net/send_invitation/send_mail.php', { 
      method: 'POST',
      body: mailFormData
    });
    
    // Error handling
    if (!response.ok) {
      throw new Error('Failed to send invitation email');
    }
  }

  /**
   * Generates a random token for password recovery.
   * @returns {string} The generated random token.
   */
  generateRandomToken() {
    const tokenLength = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < tokenLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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


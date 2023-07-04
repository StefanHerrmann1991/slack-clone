import { Injectable, NgZone } from '@angular/core';
import { UserInterface as User } from '../services/user.service';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  userData: any; // Save logged in user data
  currentUserId: string;


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        /**User ist eingeloggt */
        // this.userData = user;
        // localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user')!);
      } else {
        /**User ist nicht eingeloggt */
        // localStorage.setItem('user', 'null');
        // JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user);
        const userId = result.user.uid
        const email = result.user.email
        this.router.navigate([`/dashboard/${userId}`]);
        this.currentUserId = userId;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  // Sign up/ login with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password) // 3. Parameter username vorerst gelöscht, da cannot get
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
        const userId = result.user.uid
        const email = result.user.email
        const displayName = result.user.displayName
      /*   if (displayName !== "") displayName = email */
        this.saveUser(displayName, userId, email);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }


  saveUser(username: string, userId: string, email: string) {
    this.afs.collection('users').doc(userId).set({
      username: username,
      email: email,
      userId: userId
    });
  }


  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  // Returns true when user is loged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null
      // && user.emailVerified !== false
    ) ? true : false;
  }


  // Sign in/ login with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((_res: any) => {
      this.router.navigate(['dashboard']);
    });
  }


  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      password: user.password,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  // Sign out/ logout
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
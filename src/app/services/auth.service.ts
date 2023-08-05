import { Injectable, NgZone } from '@angular/core';
import { UserInterface as User } from '../services/user.service';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { getDatabase, ref, onDisconnect, set, remove } from "firebase/database";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  readonly currentUser$ = this._currentUser.asObservable();
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
      if (user) {
        this._currentUser.next({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          password: ''
        });
      } else {
        this._currentUser.next(null);
      }
    });
  }

  private updateOnUserSignedIn() {
    
    const userId = this.userData.uid;
    const database = getDatabase();
    const userStatusDatabaseRef = ref(database, '/status/' + userId);

    set(userStatusDatabaseRef, {
      state: 'online',
      last_changed: Date.now(),
    });

    onDisconnect(userStatusDatabaseRef).set({
      state: 'offline',
      last_changed: Date.now(),
    });
  }


  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const userId = result.user.uid
        this.router.navigate([`/dashboard/${userId}`]);
        this.currentUserId = userId;
        this.userData = result.user;
        this.updateOnUserSignedIn();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  async GuestLogin() {
    const guestEmail = 'sth1812@posteo.de';  // Replace with your guest account email
    const guestPassword = '111222';  // Replace with your guest account password
    const uid = 'GMHmWrI2mbVkKCyPvXJAODW7NEp1';
    const displayName = 'Guest';
    if (navigator.onLine) {  // if online, use Firebase
      try {
        await this.SignIn(guestEmail, guestPassword);
      } catch (error) {
        console.error(error);
        // handle error
      }
    } else {
      this.saveUser(displayName, uid, guestEmail);
      this.router.navigate([`/dashboard/${uid}`]);
      // Setting userData here
      this.userData = {
        uid: uid,
        email: guestEmail,
        displayName: displayName,
        password: ''
      };
      this._currentUser.next(this.userData);
    }
  }


  async SignUp(email: string, password: string, displayName: string) {
    try {
      // Create the user using email and password
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const userId = result.user.uid;
      const userEmail = result.user.email;

      // Set the display name in Firebase authentication using updateProfile
      if (!displayName || displayName === undefined || displayName === null) {
        displayName = userEmail.substring(0, userEmail.lastIndexOf("@"));
      }

      await result.user.updateProfile({ displayName: displayName });

      // Save the user data in Firestore database
      this.SetUserData(result.user);

      // Save the user data in Firestore collection
      this.saveUser(displayName, userId, userEmail);

      console.log('User created:', result.user);
    } catch (error) {
      console.error('Error signing up:', error);
      window.alert(error.message);
    }
  }



  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      password: '',
    };
    return userRef.set(userData, {
      merge: true,
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


  // Sign out/ logout
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
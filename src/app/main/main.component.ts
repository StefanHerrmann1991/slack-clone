import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/app-user.class';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { getDatabase, ref, onValue } from "firebase/database";
import { UserComponent } from './user/user.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {


  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private firestore: AngularFirestore,   
    private dialog: MatDialog,
    private userService: UserService) { }


  isOnline: boolean;
  user: User = new User();
  userId = '';
  control = new FormControl(''); 
  filteredUsers: Observable<User[]>;
  isDarkTheme: boolean = false;
  users: User[] = [];



  ngOnInit() {    
      this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');     
      this.getUser();
    })
    
    this.getAllUsers();
    
    this.filteredUsers = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.fetchOnlineStatus(this.userId);
    }

    private _filter(value: string): User[] {
      const filterValue = this._normalizeValue(value);
      return this.users.filter(user => this._normalizeValue(user.username).includes(filterValue));
    }
  
    getAllUsers() {
      
      this.firestore.collection('users').valueChanges().subscribe((usersData: any[]) => {
        this.users = usersData.map(userData => new User(userData));
      });
    }
  
    toggleTheme() {   
    }
  
    fetchOnlineStatus(userId: string) {  
      const database = getDatabase();
      const userStatusDatabaseRef = ref(database, '/status/' + userId);
  
      onValue(userStatusDatabaseRef, (snapshot) => {
        const status = snapshot.val();
        this.isOnline = status.state === 'online';
      });
    }
  
    getUser() {
      
      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe((user: any) => {
          this.user = new User(user);
        })
    }
  
    private _normalizeValue(value: string): string {
      return value.toLowerCase().replace(/\s/g, '');
    }
  
    openProfile() {
      const dialog = this.dialog.open(UserComponent);
      dialog.componentInstance.user = new User(this.user.toJSON());
      dialog.componentInstance.userId = this.userId;
    }

  }










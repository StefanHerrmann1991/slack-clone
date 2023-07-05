import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';
import { BehaviorSubject } from 'rxjs';

export interface UserInterface {
  displayName: string;
  email: string; 
  uid: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  username: string;
  email: string;
  uid: string; 
  password: string;
}

export { User };

import { Injectable } from '@angular/core';
import { User } from 'src/models/user.class';
import { BehaviorSubject } from 'rxjs';

export interface UserInterface {
  displayName: string;
  email: string;
  password: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

 
}

export { User };

import { Injectable } from '@angular/core';


export interface UserInterface {
  displayName: string;
  email: string; 
  uid: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor() { }
}

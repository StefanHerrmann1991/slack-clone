import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {

  }

  private userId: string;

  setUserId(id: string): void {
    this.userId = id;
    console.log(this.userId)
  }

  getUserId(): string {
    return this.userId;   
  }
}

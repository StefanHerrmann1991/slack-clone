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
  }

  getUserId(): string {
    return this.userId;
  }

  storeLastUrl(url: string) {
    localStorage.setItem('lastUrl', url);
  }

  getLastUrl(newUserId): any {
    if (this.userId === newUserId)
    return localStorage.getItem('lastUrl');
  }
}

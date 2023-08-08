import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _isDarkTheme = new BehaviorSubject<boolean>(true); // Default to dark theme
  isDarkTheme$ = this._isDarkTheme.asObservable();

  toggleTheme() {
    this._isDarkTheme.next(!this._isDarkTheme.value);

    if (this._isDarkTheme.value) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  get currentTheme() {
    return this._isDarkTheme.value ? 'dark' : 'light';
  }
}
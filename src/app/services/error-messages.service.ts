import { Injectable } from '@angular/core';
import { ErrorMessagesComponent } from '../error-messages/error-messages.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor(private dialog: MatDialog) {
  }

  showError(title: string, message: string): void {
    this.dialog.open(ErrorMessagesComponent, {
      width: '250px',
      data: { title, message }
    });
  }
}

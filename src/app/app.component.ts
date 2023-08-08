import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'slack-clone';
  isDarkTheme = false;

  toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      if (this.isDarkTheme) {
          document.body.classList.add('dark-theme');
          document.body.classList.remove('light-theme');
      } else {
          document.body.classList.add('light-theme');
          document.body.classList.remove('dark-theme');
      }
  }
}

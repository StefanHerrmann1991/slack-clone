import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  constructor(public authService: AuthService, private route: ActivatedRoute) {}

     
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('userId');
    });
  }
}

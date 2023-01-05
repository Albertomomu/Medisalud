import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  loginUser() {
    const inputEmail = (document.getElementById('emailLogin') as HTMLInputElement).value;
    const inputPassword= (document.getElementById('passwordLogin') as HTMLInputElement).value;
    this.userService.login(inputEmail, inputPassword)
    .then(res => {
      this.router.navigate(['/principal']);
    })
    .catch(err => console.log(err));
  }

  loginWithGoole() {
/*     this.userService.loginWithGoole()
    .then(res => {
      this.router.navigate(['./principal']);
    })
    .catch(err => console.log(err));
  } */

  this.userService.loginWithGoole().then(
    res => {
      this.user = JSON.stringify(res);
    });

  }

  loginWithGithub() {
    this.userService.loginWithGithub()
    .then(res => {
      this.router.navigate(['./principal']);
    })
    .catch(err => console.log(err));
  }

  loginWithFacebook() {
    this.userService.loginWithFacebook()
    .then(res => {
      this.router.navigate(['/principal']);
    })
    .catch(err => console.log(err));
  }

}

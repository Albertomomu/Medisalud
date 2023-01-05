import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Auth, getAuth, signInWithCustomToken } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private router: Router, private auth: Auth) { }

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

  /* this.userService.loginWithGoole().then(
    res => {
      signInWithCustomToken(this.auth, res);
      this.user = JSON.stringify(res);
      this.router.navigate(['./principal']);
    }); */
    this.userService.loginWithGoole();
    this.router.navigate(['./principal']);

  }

/*   loginWithGoole() {

    const auth = getAuth();
    signInWithCustomToken(auth, token)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });

  } */

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

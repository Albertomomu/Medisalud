import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  constructor(private userService: UserService ,private router: Router) { }

  ngOnInit() {}

  logout() {
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  onToggleColorTheme(event) {

    if(event.detail.checked) {
      document.body.setAttribute('class', 'dark');
      console.log(window.matchMedia);
    }
    else{
      document.body.removeAttribute('class');
      document.body.setAttribute('class', 'light');
    }

  }


}

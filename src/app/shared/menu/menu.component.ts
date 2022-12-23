import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    if(document.body.classList.contains('dark')){
      const darkTheme = document.getElementById('themeToggle') as HTMLInputElement;
      darkTheme.checked = true;
    }
  }

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
    }
    else{
      document.body.removeAttribute('class');
      document.body.setAttribute('class', 'light');
    }

  }

}

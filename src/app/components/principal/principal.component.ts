import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { DataServices } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  date: string;
  type: 'string';
  auth = this.userService.getAuth();
  user = this.auth.currentUser;

  constructor(
    private userService: UserService ,
    private router: Router,
    private data: DataServices,
    private alertController: AlertController) { }

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
    }
    else{
      document.body.removeAttribute('class');
      document.body.setAttribute('class', 'light');
    }

  }

  fichar(username) {
    username = username.split(' ');
    this.data.guardarRegistros(username[0]);
  }

  mostrarFichadas(username){
    username = username.split(' ');
    this.data.mostrarRegistros(username[0]);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: 'Succesfully clock in',
      message: 'You clocked in successfully',
      buttons: ['OK'],
    });

    await alert.present();
  }

}

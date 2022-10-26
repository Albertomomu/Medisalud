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
  dataFichada = '';
  fichadaArray = [];

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
    this.dataFichada = '';
    this.date = this.data.data;
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.data.guardarRegistros(user);
  }

  mostrarFichadas(username){
    this.dataFichada = '';
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.data.mostrarRegistros(user);
    this.dataFichada = JSON.stringify(this.data.dataFichada);
    this.dataFichada = this.dataFichada.substr(1, this.dataFichada.length-1);
    console.log(this.dataFichada);
    this.fichadaArray = this.dataFichada.split(',');
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: `'Succesfully clock in'`,
      message: `You clocked in successfully at ${this.date}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

}

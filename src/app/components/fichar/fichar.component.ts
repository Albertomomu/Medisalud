import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataServices } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-fichar',
  templateUrl: './fichar.component.html',
  styleUrls: ['./fichar.component.scss'],
})
export class FicharComponent implements OnInit {

  @Input() fichadaArray = [];
  date: string;
  type: 'string';
  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  dataFichada = '';

  constructor(
    private userService: UserService ,
    private data: DataServices,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  fichar(username) {
    this.dataFichada = '';
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.data.guardarRegistros(user);
    this.date = this.data.data;
  }

  mostrarFichadas(username){
    this.dataFichada = '';
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.data.mostrarRegistros(user);
    this.dataFichada = JSON.stringify(this.data.dataFichada);
    this.dataFichada = this.dataFichada.substr(1, this.dataFichada.length-1);
    this.dataFichada = this.dataFichada.slice(0, this.dataFichada.length -1);
    this.fichadaArray = this.dataFichada.split(',');
    this.fichadaArray = this.fichadaArray.reverse();
    console.log(this.fichadaArray);
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 300,
      spinner: 'circles',
    });

    loading.present();
  }

}

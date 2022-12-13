import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataServices } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { get, getDatabase, ref, child } from 'firebase/database';

@Component({
  selector: 'app-fichar',
  templateUrl: './fichar.component.html',
  styleUrls: ['./fichar.component.scss'],
})
export class FicharComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Input() fichadaArray = [];
  @Output() dataFichada = '';
  date: string;
  estado: any;
  type: 'string';
  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  userID = this.user.uid;
  isModalOpen = false;

  constructor(
    private userService: UserService ,
    private data: DataServices,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  fichar(userID) {
    this.data.guardarRegistros(userID);
    this.date = this.data.data.date;
    this.estado = this.data.data.estado;
  }

/*   mostrarFichadas(username){
    this.dataFichada = '';
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.data.mostrarRegistros(user);
    this.dataFichada = JSON.stringify(this.data.dataFichada);
    this.dataFichada = this.dataFichada.substr(1, this.dataFichada.length-1);
    this.dataFichada = this.dataFichada.slice(0, this.dataFichada.length -1);
    this.fichadaArray = this.dataFichada.split(',');
    this.fichadaArray = this.fichadaArray.reverse();
    console.log(this.dataFichada);
  } */

  mostrarFichadas(username){

  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: `'Succesfully clock in'`,
      message: `You clocked in successfully at ${JSON.stringify(this.date)} - ${JSON.stringify(this.estado)}`,
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

  //Codigo del modal
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}

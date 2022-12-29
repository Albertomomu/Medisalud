import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DataServices } from 'src/app/services/data.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { get, getDatabase, ref, child, onValue } from 'firebase/database';

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
  dataFich: any = '';

  constructor(
    private userService: UserService ,
    private data: DataServices,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    const db = getDatabase();
    const estadoRef = ref(db, (`fichar/${this.userID}`));
    onValue(estadoRef, (snapShot) => {
      snapShot.forEach(childSnapShot => {
        this.estado = childSnapShot.val().estado;
      });
    });
    if(this.estado === 'Entrada'){
      this.estado = 'Salida';
    }else {
      this.estado = 'Entrada';
    }
  }

  fichar() {
    const hour = new Date().toLocaleTimeString('es-ES');
    const date = new Date().toLocaleDateString('es-ES');
    const dataFich: any = {
      date: date + ' - ' + hour,
      estado: this.estado
    };
    this.dataFich = dataFich;
    this.data.guardarRegistros(this.userID, dataFich);
}

  mostrarFichadas(){
    this.fichadaArray = [];
    const db = getDatabase();
    const fichadasRef = ref(db, `fichar/${this.userID}`);
    onValue(fichadasRef, (snapShot) => {
      snapShot.forEach(childSnapShot => {
        console.log(childSnapShot);
        this.fichadaArray.push({
          date: childSnapShot.val().date,
          estado: childSnapShot.val().estado
        });
      });
    });
    console.log(this.fichadaArray);
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: `'Succesfully clock in'`,
      message: `You clocked in successfully at ${JSON.stringify(this.dataFich.date)} - ${JSON.stringify(this.dataFich.estado)}`,
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

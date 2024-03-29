import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { RaffleService } from 'src/app/services/raffle.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController, ModalController } from '@ionic/angular';
import { RaffleSettingsComponent } from '../raffle-settings/raffle-settings.component';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss'],
})
export class RaffleComponent implements OnInit {

  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  userID = this.user.uid;
  participating = false;
  admin = false;
  endDate: Date;
  winner = '';

  constructor(
    private raffleService: RaffleService,
    private alertController: AlertController,
    private userService: UserService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    if(this.userID === '1TFEAGKXhFVx14BykPh9pdOVTaz1'){
      this.admin = true;
    }
    this.participating = false;
    const db = getDatabase();
    const endDate = ref(db, 'raffle');
    onValue(endDate, (snapshot) => {
      this.endDate = new Date(snapshot.val().endTime);
      console.log(this.endDate);
    });

    const showParticipants = ref(db, 'raffle/participants');
    onValue(showParticipants, (snapshot) => {
        snapshot.forEach((childSnapshot) =>{
          if(childSnapshot.val().userID === this.userID){
            this.participating = true;
          }
        });
    });
    const winner = ref(db, 'raffle');
    onValue(winner, (snapshot) => {
        if(snapshot.val().winner !== ''){
          this.winner = snapshot.val().winner;
        }
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: RaffleSettingsComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }

  hasEnded() {
    return new Date() > this.endDate;
  }

  resetWinner() {
    const db = getDatabase();
    update(ref(db, 'raffle'), {
      winner: ''
    });

    const winner = ref(db, 'raffle/winner');
    onValue(winner, (snapshot) => {
      this.winner = snapshot.val();
    });

    update(ref(db, 'raffle'), {
      participants: []
    });
    this.participating = false;
    this.winner = '';
  }

  participate() {
    const db = getDatabase();
    const winner = ref(db, 'raffle/winner');
    onValue(winner, (snapshot) => {
      this.winner = snapshot.val();
    });
    if(this.participating === false){
      this.raffleService.ticket(this.userID, this.user.displayName);
      this.presentAlert();
    }else{
      this.presentAlert2();
    }
  }

  raffle(){
    this.raffleService.raffle();
    this.winner = this.raffleService.winner;
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: `'Well done ${this.user.displayName}'`,
      message: `Now you are signed up`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentAlert2() {

    const alert = await this.alertController.create({
      header: 'Info',
      subHeader: `'Signed up failed'`,
      message: `You are already signed up for this raffle`,
      buttons: ['OK'],
    });
    await alert.present();
  }

}

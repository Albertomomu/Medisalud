import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { RaffleService } from 'src/app/services/raffle.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

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
  endDate: Date = new Date(2022, 11, 10);

  constructor(
    private raffleService: RaffleService,
    private alertController: AlertController,
    private userService: UserService
  ) { }

  ngOnInit() {

    if(this.userID === '1TFEAGKXhFVx14BykPh9pdOVTaz1'){
      this.admin = true;
    }
    this.participating = false;
    const db = getDatabase();
    const showParticipants = ref(db, 'raffle/');
    onValue(showParticipants, (snapshot) => {
        snapshot.forEach((childSnapshot) =>{
          if(childSnapshot.val().userID === this.userID){
            this.participating = true;
          }
        });
    });
  }

  hasEnded() {
    return new Date() > this.endDate;
  }

  participate() {
    if(this.participating === false){
      this.raffleService.ticket(this.userID);
      this.presentAlert();
    }else{
      this.presentAlert2();
    }
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

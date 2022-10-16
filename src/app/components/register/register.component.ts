import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {}


  registrarUser() {
    const inputPass = (document.getElementById('password') as HTMLInputElement).value;
    const inputEmail = (document.getElementById('email') as HTMLInputElement).value;
    this.userService.register(inputEmail,inputPass).
    then(response => {
      this.presentAlert();
      this.router.navigate(['/login']);
    })
    .catch((err) => console.log(err));
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Felicidades',
      subHeader: 'Usuario creado',
      message: 'Tu usuario ha sido creado con exito',
      buttons: ['OK'],
    });

    await alert.present();

  }

}

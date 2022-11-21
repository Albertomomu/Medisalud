import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {UserService } from 'src/app/services/user.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { getAuth, updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  isSubmitted = false;

/*   registerForm: FormGroup = new FormGroup({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: new FormControl(''),
    password: new FormControl('')
  }); */
  registerForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
    public formBuilder: FormBuilder) { }

    get errorControl() {
      return this.registerForm.controls;
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      const inputName = this.registerForm.value.name;
      const inputEmail = this.registerForm.value.email;
      const inputPassword = this.registerForm.value.password;
      this.userService.register(inputEmail,inputPassword).
      then(response => {
        console.log(response);
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: inputName
        });
        this.presentAlert();
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        const errorCode = err.code;
        console.log(errorCode);
      });
    }
  }

  registrarUser() {
    const inputPass = (document.getElementById('password') as HTMLInputElement).value;
    const inputEmail = (document.getElementById('email') as HTMLInputElement).value;
    this.userService.register(inputEmail,inputPass).
    then(response => {
      console.log(response);
      this.presentAlert();
      this.router.navigate(['/login']);
    })
    .catch((err) => {
      const errorCode = err.code;
      if(errorCode === 'auth/email-already-in-use'){
        const mailError = 'Email is already in use';
      }
    });
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

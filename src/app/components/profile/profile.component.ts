import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { getAuth, updateProfile } from 'firebase/auth';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer } from '@angular/platform-browser';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  downloadURL = '';
  isSubmitted = false;
  updateProfileForm: FormGroup;
  errorMessage: string;
  auth = this.userService.getAuth();
  profilePic = ''  /* this.domSanitizer.bypassSecurityTrustUrl(this.auth.currentUser.photoURL) */;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private documentsService: DocumentsService,
    public domSanitizer: DomSanitizer,
    private toastController: ToastController
  ) {}

  get errorControl() {
    return this.updateProfileForm.controls;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Profile updated correctly!',
      duration: 2000,
      position: 'top'
    });

    await toast.present();
  }

  ngOnInit() {
    const storage = getStorage();
    getDownloadURL(ref(storage, `${this.auth.currentUser.photoURL}`)).then(url => {
      this.profilePic = url;
    });
    this.updateProfileForm = this.formBuilder.group({
      name: [this.auth.currentUser.displayName.split(' ')[0], Validators.required],
      // eslint-disable-next-line max-len
      surname: [this.auth.currentUser.displayName.split(' ')[1], Validators.required]
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProfile() {
    if(this.selectedFile == null || this.selectedFile === undefined ){
      const name = this.updateProfileForm.get('name').value;
      const surname = this.updateProfileForm.get('surname').value;

      updateProfile(this.auth.currentUser, {
        displayName: name + ' ' + surname
      }).then(() => {
        this.presentToast();
      }).catch((error) => {
        console.log(error);
      });
    } else{
      const name = this.updateProfileForm.get('name').value;
      const surname = this.updateProfileForm.get('surname').value;
      const picture = this.selectedFile.name;
      this.documentsService.uploadFile(this.selectedFile);

      updateProfile(this.auth.currentUser, {
        displayName: name + ' ' + surname,
        photoURL: 'gs://lowgames-e327f.appspot.com/images/' + picture
      }).then(() => {
      this.presentToast();
      }).catch((error) => {
        console.log(error);
      });
    }


  }
}

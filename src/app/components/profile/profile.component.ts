import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { getAuth, updateProfile } from 'firebase/auth';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  isSubmitted = false;
  updateProfileForm: FormGroup;
  errorMessage: string;
  auth = this.userService.getAuth();
  profilePic = this.auth.currentUser.photoURL;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private documentsService: DocumentsService
  ) {}

  get errorControl() {
    return this.updateProfileForm.controls;
  }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      name: [this.auth.currentUser.displayName.split(' ')[0], Validators.required],
      surname: [this.auth.currentUser.displayName.split(' ')[1], Validators.required],
      email:[this.auth.currentUser.email, [Validators.required, Validators.email]],
      password: '',
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProfile() {
    const name = this.updateProfileForm.get('name').value;
    const surname = this.updateProfileForm.get('surname').value;
    const email = this.updateProfileForm.get('email').value;
    const password = this.updateProfileForm.get('password').value;
    const picture = this.selectedFile.name;
    this.documentsService.uploadFile(this.selectedFile);

    updateProfile(this.auth.currentUser, {
      displayName: name + ' ' + surname,
      photoURL: 'gs://lowgames-e327f.appspot.com/images' + picture
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      console.log(error);
      // ...
    });

  }

  uploadPicture(event) {
/*     const file = event.target.files[0];
    const filePath = `pictures/${file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = fileRef.put(file);

    task.then(() => {
      fileRef.getDownloadURL().subscribe(downloadURL => {
        this.form.patchValue({ picture: downloadURL });
      });
    }); */
  }
}

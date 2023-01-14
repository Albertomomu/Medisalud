import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { getAuth, updateProfile } from 'firebase/auth';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer } from '@angular/platform-browser';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

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
    public domSanitizer: DomSanitizer
  ) {}

  get errorControl() {
    return this.updateProfileForm.controls;
  }

  ngOnInit() {
    const storage = getStorage();
    getDownloadURL(ref(storage, `${this.auth.currentUser.photoURL}`)).then(url => {
      this.profilePic = url;
    });
    this.updateProfileForm = this.formBuilder.group({
      name: [this.auth.currentUser.displayName.split(' ')[0], Validators.required],
      surname: [this.auth.currentUser.displayName.split(' ')[1], Validators.required]
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateProfile() {
    const name = this.updateProfileForm.get('name').value;
    const surname = this.updateProfileForm.get('surname').value;
    const picture = this.selectedFile.name;
    this.documentsService.uploadFile(this.selectedFile);

    updateProfile(this.auth.currentUser, {
      displayName: name + ' ' + surname,
      photoURL: 'gs://lowgames-e327f.appspot.com/images/' + picture
    }).then(() => {
      // ...
    }).catch((error) => {
      console.log(error);
      // ...
    });

  }
}

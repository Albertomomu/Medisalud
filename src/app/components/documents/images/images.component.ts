import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { DocumentsService } from '../../../services/documents.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('fileInput') fileInput: ElementRef;
  selectedFile: File;
  images: any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private documentsService: DocumentsService,
              private router: Router) { }

  ngOnInit() {
    this.images = '';
    this.documentsService.getImages();
    this.images = this.documentsService.images;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.documentsService.uploadFile(this.selectedFile);
    this.modal.dismiss('confirm');
  }

  openImage(image) {
    this.router.navigate(['/image', image.url]);
    console.log(image.url);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

}

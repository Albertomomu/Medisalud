import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../../services/documents.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {

  images: any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.getImages();
    this.images = this.documentsService.images;
  }

}

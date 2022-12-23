import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../../services/documents.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {

  images: any = [];

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.getImages();
    this.images = this.documentsService.images;
  }

}

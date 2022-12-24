import { Component, OnInit } from '@angular/core';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}

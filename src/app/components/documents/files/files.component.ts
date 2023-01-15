import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DocumentsComponent } from '../documents.component';
import { DocumentsService } from '../../../services/documents.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('fileInput') fileInput: ElementRef;
  selectedFile: File;
  docs: any = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private documentsService: DocumentsService,
              private router: Router) { }

  ngOnInit() {
    this.docs = [];
    this.documentsService.getDocs();
    this.docs = this.documentsService.docs;
    console.log(this.docs);
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openDoc(doc) {
    this.router.navigate(['/file', doc.url]);
    console.log(doc.url);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.documentsService.uploadDocs(this.selectedFile);
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }

}

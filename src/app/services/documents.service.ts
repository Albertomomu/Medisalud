import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  images: any = [];
  docs: any = [];

  constructor(private toastController: ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Image upload correctly!',
      duration: 2000,
      position: 'top'
    });

    await toast.present();
  }

  uploadFile(file) {

    const storage = getStorage();
    const imgRef = ref(storage, `images/${file.name}`);


    uploadBytes(imgRef, file).then((snapshot) => {
      this.presentToast();
    }).catch((err) => {
      console.log(err);
    });
  }

  getImages(){
    this.images = [];
    const storage = getStorage();
    const imgRef = ref(storage, `images`);

    listAll(imgRef)
    .then(async response => {
      for(const item of response.items){
        const name = item.name;
        const url = await getDownloadURL(item);
        this.images.push({name, url});
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }

  uploadDocs(file) {

    const storage = getStorage();
    const imgRef = ref(storage, `documents/${file.name}`);


    uploadBytes(imgRef, file).then((snapshot) => {
      this.presentToast();
    }).catch((err) => {
      console.log(err);
    });
  }

  getDocs(){
    this.docs = [];
    const storage = getStorage();
    const imgRef = ref(storage, `documents`);

    listAll(imgRef)
    .then(async response => {
      for(const item of response.items){
        const name = item.name;
        const url = await getDownloadURL(item);
        this.docs.push({name, url});
        console.log(this.docs);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }

}

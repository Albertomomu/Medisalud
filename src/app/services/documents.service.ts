import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  images: any = [];

  constructor() { }

  uploadFile(file) {

    const storage = getStorage();
    const imgRef = ref(storage, `images/${file.name}`);


    uploadBytes(imgRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
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
        const url = await getDownloadURL(item);
        this.images.push(url);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }

}

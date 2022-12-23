import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor() { }

  uploadFile($event: any) {

    const file = $event.target.files[0];
    console.log(file);
    const storage = getStorage();
    const imgRef = ref(storage, `images/${file.name}`);


    uploadBytes(imgRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).catch((err) => {
      console.log(err);
    });
  }

  getImages(){
    const storage = getStorage();
    const imgRef = ref(storage, `images`);

    listAll(imgRef)
    .then(async response => {

      for(const item of response.items){
        const url = await getDownloadURL(item);
        console.log(url);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  }

}

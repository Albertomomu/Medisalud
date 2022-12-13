import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, onValue, set, get, child} from 'firebase/database';

@Injectable({
    providedIn: 'root'
})
export class DataServices {

    dataFichada: any = '';
    data: any = {};
    estado: any = '';
    msj = '';

constructor(private http: HttpClient){}

    guardarRegistros( userID: string) {
            const hour = new Date().toLocaleTimeString('es-ES');
              const date = new Date().toLocaleDateString('es-ES');
              this.data = {
                  date: date + ' - ' + hour,
                  estado: 'Entrada'
              };
            this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + userID + '.json',
            JSON.stringify(this.data)).subscribe(
            response => console.log(response),
            error => console.log(error)
        );
    }
    mostrarRegistros(){

    }

}

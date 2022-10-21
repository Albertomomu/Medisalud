import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataServices {

    dataFichada: any = '';

constructor(private http: HttpClient){}

    guardarRegistros( username: string) {
        const hour = new Date().toLocaleTimeString('es-ES');
        const date = new Date().toLocaleDateString('es-ES');
        const data = date + ' - ' + hour;
        this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + username + '.json',
        JSON.stringify(data)).subscribe(
            response => console.log('Guardado'),
            error => console.log(error)
        );
    }

    mostrarRegistros( username: string) {
        this.http.get('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + username + '.json')
        .subscribe(data => {
            this.dataFichada = data;
        });
    }

}

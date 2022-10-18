import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataServices {

constructor(private http: HttpClient){}

    guardarRegistros( username: string) {
        const data = new Date();
        this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + username + '.json',
        JSON.stringify(data)).subscribe(
            response => console.log('Guardado'),
            error => console.log(error)
        );
    }

    mostrarRegistros( username: string) {
        this.http.get('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + username + '.json')
        .subscribe(data => console.log(data));
    }

}

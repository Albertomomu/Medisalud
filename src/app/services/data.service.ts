import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataServices {

    dataFichada: any = '';
    data: any = '';
    estado = false;
    msj = '';

constructor(private http: HttpClient){}

    guardarRegistros( username: string) {
        this.msj = '';
        const hour = new Date().toLocaleTimeString('es-ES');
        const date = new Date().toLocaleDateString('es-ES');
        if(this.estado === false){
            this.estado = true;
            this.msj = 'Entrada';
        }else{
            this.estado = false;
            this.msj = 'Salida';
        }
        this.data = date + ' - ' + hour + ' - Estado: ' + this.msj;
        this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + username + '.json',
        JSON.stringify(this.data)).subscribe(
            response => console.log(response),
            error => console.log(error)
        );
    }

    mostrarRegistros( username: string) {
        return this.http.get('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/fichar/' + username + '.json')
        .subscribe(data => {
            console.log(data);
            this.dataFichada = data;
        });
    }

}

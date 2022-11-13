import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    constructor(private http: HttpClient){}

    guardarMensaje(username: string, message: string){
        this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/mensajes/.json',
        JSON.stringify(message)).subscribe(
            response => console.log(response),
            error => console.log(error)
        );
    }

};

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    messages = [];

    constructor(){}

/*     guardarMensaje(username: string, message: string){
        const mess = {username, message};
        this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/mensajes/.json',
        JSON.stringify(mess)).subscribe(
            response => console.log(response),
            error => console.log(error)
        );
    } */

    guardarMensaje(id, user, content) {
        const db = getDatabase();
        if(content !== ''){
            push(ref(db, 'mensajes/'), {
                id,
                user,
                content
              });
        }
    }

};

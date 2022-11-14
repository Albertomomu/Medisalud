import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    messages = [];

    constructor(private http: HttpClient){}

/*     guardarMensaje(username: string, message: string){
        const mess = {username, message};
        this.http.post('https://lowgames-e327f-default-rtdb.europe-west1.firebasedatabase.app/mensajes/.json',
        JSON.stringify(mess)).subscribe(
            response => console.log(response),
            error => console.log(error)
        );
    } */

    mostrarMensajes(){
        const db = getDatabase();
        const showMessagesRef = ref(db, 'mensajes/');
        onValue(showMessagesRef, (snapshot) => {
            this.messages = snapshot.val();
        });
    }

    guardarMensaje(user, content) {
        const db = getDatabase();
        push(ref(db, 'mensajes/'), {
          user,
          content
        });
    }

};

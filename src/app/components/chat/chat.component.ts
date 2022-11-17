import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  name = '';
  msgVal = '';
  messages: any = [];
  messagesWriter: any = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService) { }

  ngOnInit() {

    const db = getDatabase();
    const showMessagesRef = ref(db, 'mensajes/');
    onValue(showMessagesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) =>{
          this.messages.push(childSnapshot.val().content);
          this.messagesWriter.push(childSnapshot.val().user);
          console.log(this.messagesWriter);
        });
    });
  }

  getValue(username) {
    this.messages = [];
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.chatService.guardarMensaje(user, this.name);
    this.name = '';
  }

}

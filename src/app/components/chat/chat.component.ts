import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { getDatabase, ref, onValue } from 'firebase/database';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  //@ViewChild('content') private content: any;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  id = this.user.uid;
  name = '';
  msgVal = '';
  messages: any = [];
  messagesWriter: any = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService) { }


  ionViewDidEnter() {
    this.content.scrollToBottom(0);
  }

  ngOnInit() {
    this.messages = [];
    const db = getDatabase();
    const showMessagesRef = ref(db, 'mensajes/');
    onValue(showMessagesRef, (snapshot) => {
        snapshot.forEach((childSnapshot) =>{
          const complete = {
            id: childSnapshot.val().id,
            user: childSnapshot.val().user,
            message: childSnapshot.val().content
          };
          this.messages.push(complete);
          this.messagesWriter.push(childSnapshot.val().user);
        });
    });
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(1500);
  }

  scrollToBottom(){
    this.content.scrollToBottom(1500);
  }

  getValue() {
    this.messages = [];
    this.chatService.guardarMensaje(this.id,this.user.displayName, this.name);
    this.name = '';
    //this.scrollToBottomOnInit();
    console.log(this.messages);
  }

}

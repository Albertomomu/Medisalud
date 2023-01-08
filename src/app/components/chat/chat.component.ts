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
  msgVal = '';
  photo = this.auth.currentUser.photoURL;
  msgTime = '';
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
        this.messages = [];
        snapshot.forEach((childSnapshot) =>{
          const complete = {
            id: childSnapshot.val().id,
            user: childSnapshot.val().user,
            message: childSnapshot.val().content,
            date: childSnapshot.val().msgTime,
            photo: childSnapshot.val().photo
          };
          this.messages.push(complete);
          this.messagesWriter.push(childSnapshot.val().user);
        });
        this.content.scrollToBottom(1500);
    });
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(0);
  }

  scrollToBottom(){
    this.content.scrollToBottom(1500);
  }

  getValue() {
    this.messages = [];
    this.msgTime = new Date().toISOString();
    this.chatService.guardarMensaje(this.id,this.user.displayName, this.msgVal, this.photo, this.msgTime);
    this.msgVal = '';
    //this.scrollToBottomOnInit();
    console.log(this.messages);
  }

}

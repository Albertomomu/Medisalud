import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonContent } from '@ionic/angular';
import { getDatabase, ref as ref_database, onValue } from 'firebase/database';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { getStorage, getDownloadURL, ref as ref_storage } from 'firebase/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  //@ViewChild('content') private content: any;
  @ViewChild(IonContent, {static: true}) content: IonContent;
  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  id = this.user.uid;
  msgVal = '';
  photo = this.auth.currentUser.photoURL;
  msgTime = '';
  msgDate = '';
  messages: any = [];
  messagesWriter: any = [];
  groupedByDate = {};

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    public domSanitizer: DomSanitizer) { }

  ionViewDidEnter() {
    this.content.scrollToBottom(0);
  }

  sortNull(){ };

  ngOnInit() {
    this.messages = [];
    const db = getDatabase();
    const showMessagesRef = ref_database(db, 'mensajes/');
    onValue(showMessagesRef, (snapshot) => {
        this.messages = [];
        this.groupedByDate = [];
        snapshot.forEach((childSnapshot) =>{
          const complete = {
            id: childSnapshot.val().id,
            user: childSnapshot.val().user.split(' ')[0],
            message: childSnapshot.val().content,
            date: childSnapshot.val().msgDate,
            time: childSnapshot.val().msgTime,
            photo: ''
          };
          if(childSnapshot.val().photo !== undefined){
            const storage = getStorage();
            const subTR = childSnapshot.val().photo.split('images/')[1];
              getDownloadURL(ref_storage(storage, 'images/' + subTR)).then(url => {
                complete.photo = url;
              });
          }
          if(complete.photo === ''){
            complete.photo = 'https://ionicframework.com/docs/img/demos/avatar.svg';
          }
          this.messages.push(complete);
          this.messagesWriter.push(childSnapshot.val().user);
        });
        this.messages.forEach(msg => {
          if (this.groupedByDate[msg.date]) {
            this.groupedByDate[msg.date].push(msg);
          } else {
            this.groupedByDate[msg.date] = [msg];
          }
        });
        this.content.scrollToBottom(0);
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
    this.groupedByDate = [];
    this.msgDate = new Date().toLocaleDateString('es-ES');
    this.msgTime = new Date().toLocaleTimeString('es-ES');
    this.chatService.guardarMensaje(this.id,this.user.displayName, this.msgVal, this.photo, this.msgDate, this.msgTime);
    this.msgVal = '';
  }

}

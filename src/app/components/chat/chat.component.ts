import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
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

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {



  }

  getValue(username) {
    username = username.split(' ');
    const user = username[0] + '_' + username[1];
    this.chatService.guardarMensaje(user, this.name);
    this.name = '';
  }

}

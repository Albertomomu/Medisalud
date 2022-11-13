import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  name = '';
  msgVal = '';

  constructor() { }

  ngOnInit() {



  }

  getValue() {
    console.log(this.name);
  }

}

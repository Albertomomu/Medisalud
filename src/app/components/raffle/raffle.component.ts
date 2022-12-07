import { Component, OnInit } from '@angular/core';
import { getDatabase } from 'firebase/database';
import { RaffleService } from 'src/app/services/raffle.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss'],
})
export class RaffleComponent implements OnInit {

  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  userID = this.user.uid;
  participating = false;

  constructor(
    private raffleSerrvice: RaffleService,
    private userService: UserService
  ) { }

  ngOnInit() {}

  participate(username) {
    const db = getDatabase();

  }

}
